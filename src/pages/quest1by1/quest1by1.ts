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

  public timeInSeconds: number;
  public timer: PTimer;

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
    console.log(this.actualQuestion);
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
       this.actualQuestion = this.questions[this.i];
       console.log(this.actualQuestion);
       if (!this.questions[this.i+1])
       {
        this.navController.setRoot(ResultQuestionnairePage, {questions: this.questions, answers: this.dataAnswers, myCredentials: this.myCredentials });
       }
       else
       {
        this.i++;
        this.actualQuestion = this.questions[this.i];
       }

    /*this.navController.setRoot(ResultQuestionnairePage, {questions: this.questions, answers: this.dataAnswers, myCredentials: this.myCredentials });

      event.preventDefault();

      */
    }


  /**
   * This method manages the call to the service for performing a doSubmitEmptyAnswer
   */
    public doSubmitEmptyAnswer() {

    this.dataAnswers.push('empty');
    this.indexNum += 1;

    if((this.indexNum) < this.numTotalQuestions){
        this.navController.setRoot(quest1by1Page, { myQuestionnaire: this.myQuestionnaire, myCredentials: this.myCredentials, questions: this.questions, indexNum: this.indexNum, numAnswerCorrect: this.numAnswerCorrect, numAnswerNoCorrect: this.numAnswerNoCorrect, dataAnswers: this.dataAnswers });
    }
    /*else{
      //this.finalNote = this.numAnswerCorrect - this.numAnswerNoCorrect;

    this.questionnaireService.getMyStudent(this.utilsService.currentUser.userId).subscribe(
      ((value: Student) => this.navController.setRoot(CompletedQuestionnairePage, { student: value, myQuestionnaire: this.myQuestionnaire, numTotalQuestions: this.numTotalQuestions, numAnswerCorrect: this.numAnswerCorrect, numAnswerNoCorrect: this.numAnswerNoCorrect, finalNote: this.finalNote, dataAnswers: this.dataAnswers, myQuestions: this.questions, myCredentials: this.myCredentials })),
      error =>
        this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
      }
      */
    }





  /**
   *  TIMER START
   */
  ngOnInit() {
    //this.initTimer();
  }

  hasFinished() {
    return this.timer.hasFinished;
  }

  pauseTimer() {
    this.timer.runTimer = false;
  }
  resumeTimer() {
    this.startTimer();
  }

  initTimer() {
    /*if (!this.timeInSeconds){
      this.timeInSeconds = this.questionsSend.time;
    }*/

    this.timer = <PTimer>{
      time: this.timeInSeconds,
      runTimer: false,
      hasStarted: false,
      hasFinished: false,
      timeRemaining: this.timeInSeconds
    };
    this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.timeRemaining);
    this.startTimer();
  }

  getSecondsAsDigitalClock(inputSeconds: number) {
    var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
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

  startTimer() {
    this.timer.hasStarted = true;
    this.timer.runTimer = true;
    this.timerTick();
  }

  timerTick() {
    setTimeout(() => {

      if (!this.timer.runTimer){
        return;
      }
      this.timer.timeRemaining--;
      this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.timeRemaining);
      if (this.timer.timeRemaining > 0) {
        this.timerTick();
      }
      else {
        this.timer.hasFinished = true;
        if (this.timer.timeRemaining === 0) {
          this.doSubmitEmptyAnswer();
        }
      }
    }, 1000);
  }

  //this.ionicService.showLoading(this.timer.timeInSeconds.toLocaleString());

  /**
   *  TIMER STOP
  */

}


