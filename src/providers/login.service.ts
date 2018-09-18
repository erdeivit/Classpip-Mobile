import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UtilsService } from '../providers/utils.service';
import { AppConfig } from '../app/app.config';
import { Credentials } from '../model/credentials';
import { Role } from '../model/role';
import { Login } from '../model/login';

@Injectable()
export class LoginService {

  constructor(
    public http: Http,
    public utilsService: UtilsService) { }

  /**
   * This method calls the REST API for performing a login against
   * the common services for the application
   * @param {Login} login Object with login credentials
   * @return {Observable<LoginResponse>} observable object with the login response
   */
  public login(credentials: Credentials): Observable<Response> {

    var url: string;
    switch (this.utilsService.role) {
      case Role.STUDENT:
        url = AppConfig.STUDENT_URL + AppConfig.LOGIN_URL;
        break;
      case Role.TEACHER:
        url = AppConfig.TEACHER_URL + AppConfig.LOGIN_URL;
        break;
      case Role.SCHOOLADMIN:
        url = AppConfig.SCHOOLADMIN_URL + AppConfig.LOGIN_URL;
        break;
      default:
        break;
    }

    return this.http.post(url, credentials)
      .map(response => {
        this.utilsService.currentUser = Login.toObject(response.json());
        return response;
      })
      .catch((error: Response) => this.utilsService.handleAPIError(error));

    //.catch(this.utilsService.handleAPIError);
  }

  /**
   * This method executes a logout into the application, removes
   * the current logged user
   * @return {Observable<Boolean>} returns an observable with the result
   * of the operation
   */
  public logout(): Observable<Response> {

    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

    var url: string;
    switch (this.utilsService.role) {
      case Role.STUDENT:
        url = AppConfig.STUDENT_URL + AppConfig.LOGOUT_URL;
        break;
      case Role.TEACHER:
        url = AppConfig.TEACHER_URL + AppConfig.LOGOUT_URL;
        break;
      case Role.SCHOOLADMIN:
        url = AppConfig.SCHOOLADMIN_URL + AppConfig.LOGOUT_URL;
        break;
      default:
        break;
    }

    return this.http.post(url, {}, options)
      .map(response => {
        this.utilsService.currentUser = null;
        return true;
      })
      .catch((error: Response) => this.utilsService.handleAPIError(error));
  }

}
