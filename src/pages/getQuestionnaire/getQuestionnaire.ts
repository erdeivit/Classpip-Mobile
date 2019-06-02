import { Component } from '@angular/core';
import {NavController, MenuController, ToastController, NavParams,AlertController} from 'ionic-angular';
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
  public title:string;
  public numAnswerNoCorrect: number = 0;
  public indexNum: number = 0;
  public userAnswers  = [];
  public groups: Array<Group>;
  public found: Boolean;
  public enableGetQuest: Boolean = false;


  listQuest:string;
  public questGameStudent: Array<QuestionnaireGame> = new Array<QuestionnaireGame>();
  public activeQuestionnaireGame: Array<QuestionnaireGame>;
  public deadQuestionnaireGame: Array<QuestionnaireGame>;
  public programmedQuestionnaireGame: Array<QuestionnaireGame>;

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
    public menuController: MenuController,
    public alertController: AlertController) {
    // TODO: remove this
    switch (utilsService.role) {

      case Role.STUDENT:
        this.credentials.username = "student-1";
        this.credentials.id = this.credentials.id;
        break;
      default:
        break;
    }
    this.myRole = this.utilsService.role;
    this.groups = this.navParms.data.groups;
  }

  async FlipCardsPipAlert() {
    const alert = await this.alertController.create({
      title:"Información",
      message: 'Para ver las respuestas, solo tienes que pasar el mouse sobre el enunciado.',
      buttons: ['OK'],
      cssClass: "alertDanger",
    });

    await alert.present();
  }
  async ProgrammedAlert(name:string,date:string) {
    const alert = await this.alertController.create({
      title:"Llegastes pronto",
      message: 'El cuestionario: "' + name+'" empezará el: ' + date,
      buttons: ['OK'],
      cssClass: "alertDanger",
    });

    await alert.present();
  }
  async FinishAlert(name:string,date:string) {
    const alert = await this.alertController.create({
      title:"Llegastes tarde",
      message: 'El cuestionario: "' + name+'" finalizó el: ' + date,
      buttons: ['OK'],
      cssClass: "alertDanger",
    });

    await alert.present();
  }

  public getQuestionnairesGameStudents(): void {
    this.questionnaireService.getQuestionnairesGame().subscribe(
      ((quest: Array<QuestionnaireGame>) => {
      for (let questionnaireGame of quest)
      {
        //TODO: COMPARAR CON EL ID DEL GRUPO DEL  USUARIO, no con el "1" que asumo
        if (questionnaireGame.groupId =="1"){
          this.questGameStudent.push(questionnaireGame); //CONSEGUIMOS SOLO LOS CUESTIONARIOS DE NUESTRO USUARIO

        }

      }
      this.getActivos();
          }),
        error =>
          this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
  }

    /**
   * Fires when the page appears on the screen.
   * Used to get all the data needed in page
   */
  public ionViewDidEnter(): void {
    this.menuController.enable(true);
    this.activeQuestionnaireGame = [];
    this.programmedQuestionnaireGame = [];
    this.deadQuestionnaireGame = [];
    this.getQuestionnairesGameStudents();
  }

  public getActivos() {
    console.log(this.questGameStudent);
    const date = new Date();
    this.activeQuestionnaireGame = [];
    this.deadQuestionnaireGame = [];
    this.programmedQuestionnaireGame = [];
    for (let QuestionarioGame of this.questGameStudent) {
      var diff = new Date(QuestionarioGame.finish_date).getTime() - date.getTime();
      var diff2 = new Date(QuestionarioGame.start_date).getTime() - date.getTime();
      // tslint:disable-next-line: max-line-length
      QuestionarioGame['str_date'] = new Date(QuestionarioGame.start_date).getDate() + '/' + (new Date(QuestionarioGame.start_date).getMonth() + 1) + '/' + new Date(QuestionarioGame.start_date).getFullYear();
      QuestionarioGame['fnsh_date'] = new Date(QuestionarioGame.finish_date).getDate() + '/' + (new Date(QuestionarioGame.finish_date).getMonth() + 1) + '/' + new Date(QuestionarioGame.finish_date).getFullYear();
      if (diff >= 0) {
        if (diff2 >= 0) {
          this.programmedQuestionnaireGame.push(QuestionarioGame);
        }
        else {
          this.activeQuestionnaireGame.push(QuestionarioGame);
        }
      }
      else {
        this.deadQuestionnaireGame.push(QuestionarioGame);
      }
    }
    console.log(this.activeQuestionnaireGame);
  }

  /**
   * This method manages the call to the service for performing a getQuestionnaire
   * against the public services
   */
  public getQuestionnaire(id: string, gameMode:string,name:string,index:number): void {
    console.log("GET QUESTIONNAIRE");
    this.questionnaireService.getQuestionnaire(id).subscribe(
      ((value: Questionnaire) => {
        this.title = value.name;
    this.questionnaireService.getQuestionsofQuestionnaireGame(id).subscribe(
      ((value: Array<Question>) => {
        console.log("THIS.QUESTIONS")
        console.log(value);
        switch (gameMode)
            {
              case 'QuizPip':
                console.log('QUIZPIP');
                  this.navController.setRoot(QuizPipPage,{
                    question: value,
                    title: this.title,
                    questionnaireGame:this.activeQuestionnaireGame[index],
                    questiontime: this.activeQuestionnaireGame[index].question_time,
                    questionnairetime: this.activeQuestionnaireGame[index].questionnaire_time
                  });
              break;
              case '1by1':
                  console.log('1by1');
                  this.navController.setRoot(quest1by1Page,{
                    question: value,
                    title: this.title,
                    questionnaireGame:this.activeQuestionnaireGame[index],
                    questiontime: this.activeQuestionnaireGame[index].question_time,
                    questionnairetime: this.activeQuestionnaireGame[index].questionnaire_time
                  });
              break;
              case 'FlipCardsPip':
                  console.log('FlipcardsPip');
                  this.FlipCardsPipAlert();
                  this.navController.setRoot(questflipcardspipPage,{
                    question: value,
                    title: this.title,
                    questionnaireGame:this.activeQuestionnaireGame[index]
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
        }),
        error =>
          this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
    }
}
