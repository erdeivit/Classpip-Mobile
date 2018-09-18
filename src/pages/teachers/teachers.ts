import { Component } from '@angular/core';
import { Refresher, Platform, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { IonicService } from '../../providers/ionic.service';
import { SchoolService } from '../../providers/school.service';
import { Teacher } from '../../model/teacher';
import { TeacherPage } from './teacher/teacher';

@Component({
  selector: 'page-teachers',
  templateUrl: './teachers.html'
})
export class TeachersPage {

  public teachers: Array<Teacher>;

  constructor(
    public navParams: NavParams,
    public navController: NavController,
    public ionicService: IonicService,
    public schoolService: SchoolService,
    public translateService: TranslateService) {

    this.teachers = this.navParams.data.teachers;
  }

  /**
   * Fires when the page appears on the screen.
   * Used to get all the data needed in page
   */
  public ionViewDidEnter(): void {

    this.ionicService.removeLoading();
  }

  /**
   * This method returns the teachers list of the
   * current school
   * @param {Refresher} Refresher element
   */
  private getTeachers(refresher?: Refresher): void {

    this.schoolService.getMySchoolTeachers().finally(() => {
      refresher ? refresher.complete() : null;
    }).subscribe(
      ((value: Array<Teacher>) => this.teachers = value),
      error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
  }

  /**
   * Method called from the home page to open the list of the
   * teachers of the school of the current user
   */
  public goToTeacherDetail(teacher: Teacher): void {
    this.navController.push(TeacherPage, { teacher: teacher })
  }
}
