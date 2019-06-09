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

  public postResult(questionnaireGame:QuestionnaireGame,numAnswerCorrect:number,numAnswerNoCorrect:number,finalNote:string,userAnswers:Array<string>,numofquestions:number): Observable<resultQuestionnaire> {
    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });
    if(userAnswers.length===0)
    {
      userAnswers[0]=null;
    }
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

  public getQuestionsofQuestionnaire(idQuestionnaire:string): Observable<Array<Question>> {
    var ret: Array<Question> = new Array<Question>();
    return Observable.create(observer => {
      this.getQuestionnaire(idQuestionnaire).subscribe(
        questionnaire => {
          questionnaire.question.forEach(idQuestion => {
            this.getQuestion(idQuestion).subscribe(
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

  public getQuestionnaire(idQuestionnaire:string): Observable<Questionnaire> {
    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });

    var url: string = AppConfig.QUESTIONNAIRE_URL + '/'+idQuestionnaire;

    return this.http.get(url, options)
      .map((response: Response, index: number) => {
        let questionnaire: Questionnaire = Questionnaire.toObject(response.json())
        this.utilsService.currentQuestionnaire = questionnaire;
        return questionnaire;
      })
      .catch((error: Response) => this.utilsService.handleAPIError(error));

  }

  public getQuestion(idQuestion: Question): Observable<Question> {

    let options: RequestOptions = new RequestOptions({
      headers: this.utilsService.setAuthorizationHeader(new Headers(), this.utilsService.currentUser.id)
    });
    var url: string = AppConfig.QUESTION_URL + '/' + idQuestion;
    return this.http.get(url, options)
    .map((response: Response, index: number) => {
      let question: Question = Question.toObject(response.json())
      return question;
    })
    .catch((error: Response) => this.utilsService.handleAPIError(error));
  }

}
