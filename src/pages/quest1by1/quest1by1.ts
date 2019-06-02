import { Component } from '@angular/core';
import { Refresher, Platform, NavController, NavParams} from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Credentials } from '../../model/credentials';
import { IonicService } from '../../providers/ionic.service';
import { QuestionnaireService } from '../../providers/questionnaire.service';
import { Question } from '../../model/question';
import { Questionnaire } from '../../model/questionnaire';
import { UtilsService } from '../../providers/utils.service';
import { ResultQuestionnairePage } from '../resultQuestionnaire/resultQuestionnaire'

import {
  FormGroup,
  FormControl
} from '@angular/forms';

export interface PTimer {
  time: number;
  timeRemaining: number;
  runTimer: boolean;
  hasStarted: boolean;
  hasFinished: boolean;
  displayTime: string;
}

@Component({
  selector: 'page-quest1by1',
  templateUrl: './quest1by1.html'
})
export class quest1by1Page {

  public myQuestionnaire: Questionnaire;
  public questions: Array<Question>;
  public questionsAnswers: Array<Question>
  public myCredentials: Credentials;
  public indexNum: number;
  public numTotalQuestions: number;
  public numQuestions: number;
  public numAnswerCorrect: number;
  public numAnswerNoCorrect: number;
  public finalNote: number = 0;
  public actualQuestion: Question;
  public dataAnswers  = [];
  public dataAnswers2  = [];
  public answercorrects = [];
  public title: string;
  public comprobacion:number=7;
  public i: number=0;


  questionForm;

  public questionTime:number;
  public questionnaireTime:number;
  public timeInSeconds: number;
  public displayTime: string;
  public timer;
  public finish:boolean;


  constructor(
    public navParams: NavParams,
    public navController: NavController,
    public utilsService: UtilsService,
    public ionicService: IonicService,
    public questionnaireService: QuestionnaireService,
    public translateService: TranslateService) {

    //this.myQuestionnaire = this.navParams.data.myQuestionnaire;
    this.questions = this.navParams.data.question;
    this.actualQuestion = this.questions[0];
    this.questionTime = this.navParams.data.questiontime;
    this.questionnaireTime = this.navParams.data.questionnairetime;
    this.finish=false;
    //this.title = this.navParams.data.title;
    //this.indexNum = this.navParams.data.indexNum;
    //this.numTotalQuestions = this.questions.length;
    //this.questionsSend = this.questions[this.indexNum];

    //this.numAnswerCorrect = this.navParams.data.numAnswerCorrect;
    //this.numAnswerNoCorrect = this.navParams.data.numAnswerNoCorrect;
    //this.dataAnswers = this.navParams.data.dataAnswers;
    //this.myCredentials = this.navParams.data.myCredentials;

  }

  public saveanswer(data:string,indice:number){
    this.dataAnswers[indice] = data;
    console.log(this.dataAnswers);
  }

  public saveanswer2(data:string,indice:number,indice2:number){
    console.log("COMPROBACION" + this.comprobacion);
    console.log("INDICE"+indice2)
    if (this.comprobacion === indice2)
    {
      this.dataAnswers2.splice(indice2,1);
      this.dataAnswers[indice] = this.dataAnswers2;
      this.comprobacion=7;
    }
    else
    {
      this.dataAnswers2[indice2] = data;
      this.dataAnswers[indice] = this.dataAnswers2;
      this.comprobacion=indice2;
    }
    console.log(this.dataAnswers);
  }

  public saveanswer3(data:string,res,indice:number)
  {
    this.dataAnswers[indice] = res;
    console.log(this.dataAnswers);
  }

  public textarea(data:string,indice:number)
  {
    this.dataAnswers[indice] = data;
    console.log(this.dataAnswers);

  }

  /**
   * Fires when the page appears on the screen.
   * Used to get all the data needed in page
   */
  public ionViewDidEnter(): void {
    console.log("quest1by1")

    this.ionicService.removeLoading()
  }


 /**
   * This method manages the call to the service for performing a doSubmitAnswer
   * against the public services
   */
  public doSubmitAnswer() {
    console.log("doSubmitAnswer");
       this.actualQuestion = this.questions[this.i];
       console.log(this.actualQuestion);
       console.log(this.questions[this.i+1]);
       if ((!this.questions[this.i+1]) || (this.finish))
       {
        clearTimeout(this.timer);
        this.navController.setRoot(ResultQuestionnairePage,
          {questions: this.questions,
            answers: this.dataAnswers,
            myCredentials: this.myCredentials,
            questionnaireGame: this.navParams.data.questionnaireGame
          });
          return;
       }
       else
       {
        this.i++;
        this.actualQuestion = this.questions[this.i];
        if (this.questionTime){
          clearTimeout(this.timer);
          this.initTimer();
          }
       }

    /*this.navController.setRoot(ResultQuestionnairePage, {questions: this.questions, answers: this.dataAnswers, myCredentials: this.myCredentials });

      event.preventDefault();

      */
    }


  /**
   *  TIMER START
   */
  ngOnInit() {
    this.initTimer();
  }

  initTimer() {
    var time = 0;
    if (this.questionTime){
        time = this.questionTime;
    }
    else if (this.questionnaireTime)
    {
      time = this.questionnaireTime;
    }
    else {
      return;
    }
    console.log(time);
    this.displayTime = this.getSecondsAsDigitalClock(time);
    this.timerTick(time);
  }

  getSecondsAsDigitalClock(inputSeconds: number) {
    var sec_num = parseInt(inputSeconds.toString(), 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var hoursString = '';
    var minutesString = '';
    var secondsString = '';
    hoursString = (hours < 10) ? "0" + hours : hours.toString();
    minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
    secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
    return hoursString + ':' + minutesString + ':' + secondsString;
  }

  timerTick(time:number) {
    this.timer = setTimeout(() => {
      time--;
      this.displayTime = this.getSecondsAsDigitalClock(time);
      if (time > 0) {
        this.timerTick(time);
      }
      else {
        if(this.questionnaireTime){
          this.finish = true;
          console.log(this.finish);
          }
          this.doSubmitAnswer();
      }
    }, 1000);
  }

  //this.ionicService.showLoading(this.timer.timeInSeconds.toLocaleString());

  /**
   *  TIMER STOP
  */

}


