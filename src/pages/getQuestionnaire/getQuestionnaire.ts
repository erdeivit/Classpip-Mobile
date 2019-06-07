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
import {Group} from "../../model/group";

@Component({
  selector: 'page-getQuestionnaire',
  templateUrl: './getQuestionnaire.html'
})
export class GetQuestionnairePage {
  public credentials: Credentials = new Credentials();
  public title:string;
  public groups: Array<Group>;
  public questGameStudent: Array<QuestionnaireGame> = new Array<QuestionnaireGame>();
  public activeQuestionnaireGame: Array<QuestionnaireGame> =[];
  public deadQuestionnaireGame: Array<QuestionnaireGame> = [];
  public programmedQuestionnaireGame: Array<QuestionnaireGame> = [];
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
      { //TODO: COMPARE WITH THE ID OF THE USER GROUP, NOT THE "1" THAT I ASSUME
        if (questionnaireGame.groupId =="1"){
          this.questGameStudent.push(questionnaireGame);
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
    this.getQuestionnairesGameStudents();
  }

  public getActivos() {
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
  }
  /**
   * This method manages the call to the service for performing a getQuestionnaire
   * against the public services
   */
  public getQuestionnaire(id: string, gameMode:string,name:string,index:number): void {
    this.questionnaireService.getQuestionnaire(id).subscribe(
      ((value: Questionnaire) => {
        this.title = value.name;
    this.questionnaireService.getQuestionsofQuestionnaireGame(id).subscribe(
      ((value: Array<Question>) => {
        switch (gameMode)
            {
              case 'QuizPip':
                  this.navController.setRoot(QuizPipPage,{
                    question: value,
                    title: this.title,
                    questionnaireGame:this.activeQuestionnaireGame[index],
                    questiontime: this.activeQuestionnaireGame[index].question_time,
                    questionnairetime: this.activeQuestionnaireGame[index].questionnaire_time
                  });
              break;
              case '1by1':
                  this.navController.setRoot(quest1by1Page,{
                    question: value,
                    title: this.title,
                    questionnaireGame:this.activeQuestionnaireGame[index],
                    questiontime: this.activeQuestionnaireGame[index].question_time,
                    questionnairetime: this.activeQuestionnaireGame[index].questionnaire_time,
                    actualQuestion: value[0],
                    i:0
                  });
              break;
              case 'FlipCardsPip':
                  this.FlipCardsPipAlert();
                  this.navController.setRoot(questflipcardspipPage,{
                    question: value,
                    title: this.title,
                    questionnaireGame:this.activeQuestionnaireGame[index]
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
