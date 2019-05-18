import { Component } from '@angular/core';
import {NavController, MenuController, ToastController, NavParams} from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { IonicService } from '../../providers/ionic.service';
import { LoginService } from '../../providers/login.service';
import { UtilsService } from '../../providers/utils.service';
import { QuizPipPage } from '../../pages/quizpip/quizpip';
import {quest1by1Page} from '../../pages/quest1by1/quest1by1';
import {questflipcardspipPage} from '../../pages/questFlipCardsPip/questflipcardspip'
import { Role } from '../../model/role';
import { Credentials } from '../../model/credentials';
import { QuestionnaireService } from '../../providers/questionnaire.service';
import { Questionnaire } from '../../model/questionnaire';
import { Question } from '../../model/question';
import { QuestionnaireGame } from '../../model/questionnaireGame';
import { Answer } from '../../model/answer';
import {Group} from "../../model/group";
import { timeout } from 'rxjs/operator/timeout';
//import { TimerComponent } from '../../components/timer/timer';

@Component({
  selector: 'page-getQuestionnaire',
  templateUrl: './getQuestionnaire.html'
})
export class GetQuestionnairePage {

  public credentials: Credentials = new Credentials();
  public questions: Array<Question>;
  public answers: Array<Answer>;
  public myQuestionnaire: Questionnaire;
  public numAnswerCorrect: number = 0;
  public numAnswerNoCorrect: number = 0;
  public indexNum: number = 0;
  public userAnswers  = [];
  public groups: Array<Group>;
  public found: Boolean;
  public enableGetQuest: Boolean = false;

  listQuest:string;
  public questGameStudent: Array<QuestionnaireGame> = new Array<QuestionnaireGame>();
  public questionnairesArrayDone: Array<Questionnaire> = new Array<Questionnaire>();
  public questionnairesArrayNOTDone: Array<Questionnaire> = new Array<Questionnaire>();

  public myRole: Role;
  public role = Role;

  public QuestId: Array <Question>;
  public Questions : Array <Question> = new Array<Question>();
  public Answers: Array <String> = new Array<String>();

  constructor(
    public navController: NavController,
    public questionnaireService: QuestionnaireService,
    public ionicService: IonicService,
    public utilsService: UtilsService,
    public translateService: TranslateService,
    public toastCtrl: ToastController,
    public navParms: NavParams,
    //private timer: TimerComponent,
    public menuController: MenuController) {
    // TODO: remove this
    switch (utilsService.role) {

      case Role.STUDENT:
        this.credentials.username = "student-1";
        this.credentials.id = this.credentials.id;
        this.getQuestionnairesGameStudents();
        break;
      case Role.TEACHER:
        this.credentials.id = this.credentials.id;
        //this.getQuestionnaireTeacher();
        break;
      case Role.SCHOOLADMIN:
        this.credentials.username = 'school-admin-1';
        this.credentials.id = this.credentials.id;
        break;
      default:
        break;
    }
    this.myRole = this.utilsService.role;
    this.groups = this.navParms.data.groups;
  }

  public getQuestionnairesGameTeacher():void {
    this.questionnaireService.getTeacherQuestionnaires().subscribe(
      ((quest: Array<Questionnaire>) => {
        this.questionnairesArrayDone = quest;
      }),
      error =>
        this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
  }

  public getQuestionnairesGameStudents(): void {
    this.questionnaireService.getQuestionnairesGame().subscribe(
      ((quest: Array<QuestionnaireGame>) => {
      //console.log(quest);
      //console.log(this.utilsService.currentUser);
      for (let questionnaireGame of quest)
      {
        //TODO: COMPARAR CON EL ID DEL GRUPO DEL  USUARIO, no con el "1" que asumo
        if (questionnaireGame.groupId =="1"){

          this.questGameStudent.push(questionnaireGame); //CONSEGUIMOS SOLO LOS CUESTIONARIOS DE NUESTRO USUARIO
          console.log(this.questGameStudent);
        }

      }
          }),
        error =>
          this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
      /*}),
      error =>
        this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));*/
  }

    /**
   * Fires when the page appears on the screen.
   * Used to get all the data needed in page
   */
  public ionViewDidEnter(): void {
    this.menuController.enable(true);
  }

  //TODO: REMOVE IT
  private getEnableGetQuest(): void{
    this.enableGetQuest? this.enableGetQuest = false: this.enableGetQuest = true;
  }

  /**
   * Enable and disable the header of the questionaire

  private changeActive(quest: Questionnaire): void{
    quest.active? quest.active = false: quest.active = true;
    //this.ionicService.showAlert("", "HOLA");
    this.questionnaireService.patchQuestionnaire(quest.id, quest.name, quest.date, quest.points, quest.badges, quest.groupid, quest.active ).subscribe(
      response => {
        //this.ionicService.showAlert("",response.active.toString());
      },
      error => {
        this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error);
      });
  }
*/
  /**
   * This method manages the call to the service for performing a getQuestionnaire
   * against the public services
   */
  public getQuestionnaire(id: string, gameMode:string,name:string): void {
    console.log("GET QUESTIONNAIRE");
    this.questionnaireService.getQuestionsofQuestionnaire(id).subscribe(
      ((value: Array<Question>) => {
        console.log(gameMode);
        console.log("THIS.QUESTIONS")
        console.log(value);
        switch (gameMode)
            {
              case 'QuizPip':
                console.log('QUIZPIP');
                  this.navController.setRoot(QuizPipPage,{
                    question: value,
                    title:name
                  });
              break;
              case '1by1':
                  console.log('1by1');
                  this.navController.setRoot(quest1by1Page,{
                    question: value,
                    title:name
                  });
              break;
              case 'FlipcardsPip':
                  console.log('FlipcardsPip');
                  this.navController.setRoot(questflipcardspipPage,{
                    question: value,
                    title:name
                  });
              break;
            }
              /*switch (value[0].type) {
                case 'test':
                  this.navController.setRoot(QuestionnairePage, {
                    questions: value,
                    myCredentials: this.credentials,
                    myQuestionnaire: this.myQuestionnaire,
                    indexNum: this.indexNum,
                    numAnswerCorrect: this.numAnswerCorrect,
                    numAnswerNoCorrect: this.numAnswerNoCorrect,
                    dataAnswers: this.dataAnswers
                  });
                  //this.timer.setTimeQuestion(30);
                  break;
                case 'textArea':
                  this.navController.setRoot(QuestionnaireTextAreaPage, {
                    questions: value,
                    myCredentials: this.credentials,
                    myQuestionnaire: this.myQuestionnaire,
                    indexNum: this.indexNum,
                    numAnswerCorrect: this.numAnswerCorrect,
                    numAnswerNoCorrect: this.numAnswerNoCorrect,
                    dataAnswers: this.dataAnswers
                  });
                  break;
                case 'image':
                  this.navController.setRoot(QuestionnaireImagePage, {
                    questions: value,
                    myCredentials: this.credentials,
                    myQuestionnaire: this.myQuestionnaire,
                    indexNum: this.indexNum,
                    numAnswerCorrect: this.numAnswerCorrect,
                    numAnswerNoCorrect: this.numAnswerNoCorrect,
                    dataAnswers: this.dataAnswers
                  });
                  break;
                default:
                  break;

              }
              */
          //this.ionicService.showAlert("", this.translateService.instant('QUESTIONNAIRE.CLOSED'));
        }),
        error =>
          this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
    }
}
