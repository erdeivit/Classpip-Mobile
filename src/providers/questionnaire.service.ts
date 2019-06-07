import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UtilsService } from '../providers/utils.service';
import { AppConfig } from '../app/app.config';
import { Role } from '../model/role';
import { Question } from '../model/question';
import { Questionnaire } from '../model/questionnaire';
import { QuestionnaireGame } from '../model/questionnaireGame';
import { resultQuestionnaire } from '../model/resultQuestionnaire';
import { Student } from '../model/student';
import { IonicService } from '../providers/ionic.service';
import { TranslateService } from 'ng2-translate/ng2-translate';

@Injectable()
export class QuestionnaireService {
  constructor(
    public http: Http,
    public ionicService: IonicService,
    public translateService: TranslateService,
    public utilsService: UtilsService) {
    }

  /**
   * This method returns all questionnaires.
   * @return {Observable<Array<QuestionnaireGame>>} returns an observable with the result
   * of the operation
   */
  public getQuestionnairesGame(): Observable<Array<QuestionnaireGame>> {

    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

    var url: string = AppConfig.QUESTIONNAIREGAME_URL;

    return this.http.get(url, options)
      .map((response: Response, index: number) => {
        return QuestionnaireGame.toObjectArray(response.json())
      })
      .catch((error: Response) => this.utilsService.handleAPIError(error));
  }
  public saveResult(questionnaireGame:QuestionnaireGame,numAnswerCorrect:number,numAnswerNoCorrect:number,finalNote:string,userAnswers=[],numofquestions:number): Observable<resultQuestionnaire> {
    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

    let url: string;
    url = AppConfig.RESULTQUESTIONNAIRE_URL;
    questionnaireGame['']
    const postParams = {
      questionnaireGame: {
        id:questionnaireGame['id'],
        name:questionnaireGame['name'],
        start_date:questionnaireGame['start_date'],
        finish_date:questionnaireGame['finish_date'],
        question_time:questionnaireGame['question_time'],
        questionnaire_time:questionnaireGame['questionnaire_time'],
        gameMode:questionnaireGame['gameMode'],
        teamMode:questionnaireGame['teamMode'],
        teacherId:questionnaireGame['teacherId'],
        groupId:questionnaireGame['groupId'],
        questionnaireId:questionnaireGame['questionnaireId']
      },
      numTotalOfQuestions:numofquestions,
      numAnswerCorrect:numAnswerCorrect,
      numAnswerNoCorrect:numAnswerNoCorrect,
      finalNote:finalNote,
      questionnaireGameId:questionnaireGame.id,
      studentId:"10000",
      userAnswers:userAnswers
    }
    return this.http.post(url, postParams, options)
    .map((response: Response, index: number) => resultQuestionnaire.toObject(response.json()))
  }

  public SaveStudentResult(answers=[]): Observable<QuestionnaireGame> {

    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

    var url: string = AppConfig.QUESTIONNAIREGAME_URL;

    let postParams = {
      results: answers,
    }

    return this.http.post(url, postParams, options)
      .map((response: Response, index: number) => QuestionnaireGame.toObject(response.json()))

  }

  /**
   * This method returns all questionnaires.
   * @return {Observable<Array<Questionnaire>>} returns an observable with the result
   * of the operation
   */
  public getTeacherQuestionnaires(): Observable<Array<Questionnaire>> {

    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

    var url: string = AppConfig.TEACHER_URL + "/" +this.utilsService.currentUser.userId  + AppConfig.QUESTIONNAIRE_URL;

    return this.http.get(url, options)
      .map((response: Response, index: number) => {
        return Questionnaire.toObjectArray(response.json())
      })
      .catch((error: Response) => this.utilsService.handleAPIError(error));
  }

  /**
   * This method returns the current questionnaire of the logged
   * in user.
   * @return {Observable<Questionnaire>} returns an observable with the result
   * of the operation
   */
  public getQuestionsofQuestionnaireGame(id:string): Observable<Array<Question>> {
    var ret: Array<Question> = new Array<Question>();
    return Observable.create(observer => {
      this.getQuestionnaire(id).subscribe(
        questionnaire => {
          questionnaire.question.forEach(id => {
            this.getQuestion(id).subscribe(
              question => {
                      ret.push(question);
                      observer.next(ret);
                      observer.complete();
              }, error => observer.error(error))
          });
        }, error => observer.error(error)
      )
    });
  }

  public getQuestionnaire(id:string): Observable<Questionnaire> {
    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

    var url: string = AppConfig.QUESTIONNAIRE_URL + '/'+id;

    return this.http.get(url, options)
      .map((response: Response, index: number) => {
        let questionnaire: Questionnaire = Questionnaire.toObject(response.json())
        this.utilsService.currentQuestionnaire = questionnaire;
        return questionnaire;
      })
      .catch((error: Response) => this.utilsService.handleAPIError(error));

  }

  /**
   * Returns the list of questions by a questionnaire id.
   * @return Observable{Array<Question>} returns the list of questions
   * that include the four possible answers and the correct answer

  public getMyQuestionnaireQuestions(credentials: Credentials): Observable<Array<Question>> {

    var ret: Array<Question> = new Array<Question>();

    return Observable.create(observer => {
      this.getQuestionnaireQuestions(credentials).subscribe(
        questions => {
          questions.forEach(question => {
            this.getQuestionAnswers(question.id).subscribe(
              answers => {
                //question.answer1 = answers;
                 // this.getQuestionCorrectAnswers(question.id).subscribe(
                   // correctAnswer => {
                     // question.correctAnswer = correctAnswer;
                      ret.push(question);
                      if (ret.length === questions.length) {
                        observer.next(ret);
                        observer.complete();
                      }
                   // }, error => observer.error(error))
              }, error => observer.error(error))
          });
        }, error => observer.error(error)
      )
    });
  }
 */
  /**
   * Returns the list of questions by a questionnaire id.
   * @return Observable{Array<Question>} returns the list of questions
   */
  public getQuestion(id: Question): Observable<Question> {

    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });
    var url: string = AppConfig.QUESTION_URL + '/' + id;
    return this.http.get(url, options)
    .map((response: Response, index: number) => {
      let question: Question = Question.toObject(response.json())
      return question;
    })
    .catch((error: Response) => this.utilsService.handleAPIError(error));
  }
  /**
   * Returns the list of answers by a questionnaire id.
   * @return Observable{Array<Answer>} returns the list of answers
   */
  public patchQuestionnaire(id: string, name?: string, date?: string, points?: number[], badges?: string[], groupid?: string, active?: boolean): Observable<Questionnaire> {

    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

    var url: string = AppConfig.QUESTIONNAIRE_URL + '/' + id;

    let postParams = {
      id: id,
      name: name,
      date: date,
      points: points,
      badges: badges,
      groupid: groupid,
      active: active
    };

    return this.http.patch(url, postParams, options)
      .map((response: Response, index: number) => Questionnaire.toObject(response.json()))
  }

  /**
   * Returns the list of correct answers by a questionnaire id.
   * @return Observable{Array<CorrectAnswer>} returns the list of correct answers
   */
  /**
   * Returns the student by a id.
   * @return {Stuent} returns the student
   */
  public getMyStudent(id: number): Observable<Student> {

    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

    //var count: number = 0;
    var url: string = AppConfig.STUDENT_URL + '/' + id;

    return this.http.get(url, options)
      .map((response: Response, index: number) => Student.toObject(response.json()))

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
