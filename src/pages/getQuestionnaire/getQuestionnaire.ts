import { Component } from '@angular/core';
import {NavController, NavParams,AlertController} from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { IonicService } from '../../providers/ionic.service';
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
import {resultQuestionnaire} from '../../model/resultQuestionnaire';
import {Group} from "../../model/group";

@Component({
  selector: 'page-getQuestionnaire',
  templateUrl: './getQuestionnaire.html'
})
export class GetQuestionnairePage {
  public credentials: Credentials = new Credentials();
  public title:string;
  public groups: Array<Group>;
  public questGamesStudent: Array<QuestionnaireGame> = new Array<QuestionnaireGame>();
  public activeQuestionnairesGame: Array<QuestionnaireGame>;
  public deadQuestionnairesGame: Array<QuestionnaireGame>;
  public programmedQuestionnairesGame: Array<QuestionnaireGame>;
  public answeredQuestionnairesGame: Array<QuestionnaireGame>;
  public myRole: Role;
  public role = Role;
  constructor(
    public navController: NavController,
    public questionnaireService: QuestionnaireService,
    public ionicService: IonicService,
    public utilsService: UtilsService,
    public translateService: TranslateService,
    public navParms: NavParams,
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
      title: this.translateService.instant('ALERTS.FILPCARDSTITLE'),
      message: this.translateService.instant('ALERTS.FLIPCARDSMESSAGE'),
      buttons: ['OK'],
      cssClass: "alertDanger",
    });

    await alert.present();
  }
  async doneAlert(name:string) {
    const alert = await this.alertController.create({
      title: this.translateService.instant('ALERTS.FILPCARDSTITLE'),
      message: this.translateService.instant('ALERTS.PROGRAMMEDMESSAGE') + name + this.translateService.instant('ALERTS.DONEMESSAGE'),
      buttons: ['OK'],
      cssClass: "alertDanger",
    });

    await alert.present();
  }

  async ProgrammedAlert(name:string,date:string) {
    const alert = await this.alertController.create({
      title:this.translateService.instant('ALERTS.FILPCARDSTITLE'),
      message: this.translateService.instant('ALERTS.PROGRAMMEDMESSAGE') +'" '+ name+' "'+ this.translateService.instant('ALERTS.PROGRAMMEDMESSAGE2') + date,
      buttons: ['OK'],
      cssClass: "alertDanger",
    });

    await alert.present();
  }

  async FinishAlert(name:string,date:string) {
    const alert = await this.alertController.create({
      title:this.translateService.instant('ALERTS.FINISHALERTITLE'),
      message: this.translateService.instant('ALERTS.FINISHMESSAGE') + name+this.translateService.instant('ALERTS.FINISHMESSAGE2') + date,
      buttons: ['OK'],
      cssClass: "alertDanger",
    });

    await alert.present();
  }

  public getQuestionnairesGameStudents(): void {
    this.questionnaireService.getQuestionnairesGame().subscribe(
      ((quest: Array<QuestionnaireGame>) => {
      for (let questionnaireGame of quest)
      { //TODO: COMPARE WITH THE ID OF THE USER GROUP, NOT THE "1" THAT I ASSUME
        if (questionnaireGame.groupId =="1"){
          this.questGamesStudent.push(questionnaireGame);
        }
      }
      this.getActiveQuestionnaireGames();
      this.getNonAnswerQuestionnaireGames();
          }),
        error =>
          this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
  }

/**
   * Fires when the page appears on the screen.
   * Used to get all the data needed in page
   */
  public ionViewDidEnter(): void {
    this.getQuestionnairesGameStudents();
  }

  public getActiveQuestionnaireGames() {
    const date = new Date();
    this.activeQuestionnairesGame = [];
    this.deadQuestionnairesGame = [];
    this.programmedQuestionnairesGame = [];
    for (let QuestionarioGame of this.questGamesStudent) {
      var diff = new Date(QuestionarioGame.finish_date).getTime() - date.getTime();
      var diff2 = new Date(QuestionarioGame.start_date).getTime() - date.getTime();
      // tslint:disable-next-line: max-line-length
      QuestionarioGame['str_date'] = new Date(QuestionarioGame.start_date).getDate() + '/' + (new Date(QuestionarioGame.start_date).getMonth() + 1) + '/' + new Date(QuestionarioGame.start_date).getFullYear();
      QuestionarioGame['fnsh_date'] = new Date(QuestionarioGame.finish_date).getDate() + '/' + (new Date(QuestionarioGame.finish_date).getMonth() + 1) + '/' + new Date(QuestionarioGame.finish_date).getFullYear();
      if (diff >= 0) {
        if (diff2 >= 0) {
          this.programmedQuestionnairesGame.push(QuestionarioGame);
        }
        else {
          this.activeQuestionnairesGame.push(QuestionarioGame);
        }
      }
      else {
        this.deadQuestionnairesGame.push(QuestionarioGame);
      }
    }
  }

  public getNonAnswerQuestionnaireGames(){
    this.answeredQuestionnairesGame = [];
    var activestmp: Array<QuestionnaireGame> =  this.activeQuestionnairesGame;
    console.log(activestmp);
    var findquestionnaire =false;
    this.activeQuestionnairesGame = [];
    this.questionnaireService.getResults().subscribe(
      ((resultQuestionnaire: resultQuestionnaire[]) => {
        if (resultQuestionnaire.length > 0) {
          for (const activeQuestionnaire of activestmp) {
              for (const result of resultQuestionnaire) {
              if((activeQuestionnaire.name === result.questionnaireGame.name) && (!findquestionnaire))
                if (result.studentId == String(this.utilsService.currentUser.userId)) {
                this.answeredQuestionnairesGame.push(activeQuestionnaire);
                findquestionnaire = true;
              }
                else
                {
                  this.activeQuestionnairesGame.push(activeQuestionnaire)
                }
            }
            if (!findquestionnaire) //DOSN'T FOUND ANY RESULT OF THIS QUESTIONNAIRE
            {
              this.activeQuestionnairesGame.push(activeQuestionnaire)
            }
            findquestionnaire=false;
          }
        }
        else
        {
          this.activeQuestionnairesGame = activestmp;
        }
      }),
      error =>
        this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
  }

  public getQuestionnaire(id: string, gameMode:string,index:number): void {
    this.questionnaireService.getQuestionnaire(id).subscribe(
      ((value: Questionnaire) => {
        this.title = value.name;
    this.questionnaireService.getQuestionsofQuestionnaire(id).subscribe(
      ((value: Array<Question>) => {
        switch (gameMode)
            {
              case 'QuizPip':
                  this.navController.setRoot(QuizPipPage,{
                    question: value,
                    title: this.title,
                    questionnaireGame:this.activeQuestionnairesGame[index],
                    questiontime: this.activeQuestionnairesGame[index].question_time,
                    questionnairetime: this.activeQuestionnairesGame[index].questionnaire_time
                  });
              break;
              case '1by1':
                  this.navController.setRoot(quest1by1Page,{
                    question: value,
                    title: this.title,
                    questionnaireGame:this.activeQuestionnairesGame[index],
                    questiontime: this.activeQuestionnairesGame[index].question_time,
                    questionnairetime: this.activeQuestionnairesGame[index].questionnaire_time,
                    actualQuestion: value[0],
                    i:0
                  });
              break;
              case 'FlipCardsPip':
                  this.FlipCardsPipAlert();
                  this.navController.setRoot(questflipcardspipPage,{
                    question: value,
                    title: this.title,
                    questionnaireGame:this.activeQuestionnairesGame[index]
                  });
              break;
            }
        }),
        error =>
          this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
        }),
        error =>
          this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
    }
}
