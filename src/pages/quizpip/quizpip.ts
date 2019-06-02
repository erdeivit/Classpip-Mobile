import { Component } from '@angular/core';
import { Refresher, Platform, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Credentials } from '../../model/credentials';
import { IonicService } from '../../providers/ionic.service';
import { QuestionnaireService } from '../../providers/questionnaire.service';
import { Question } from '../../model/question';
import { Questionnaire } from '../../model/questionnaire';
import { UtilsService } from '../../providers/utils.service';
import { ResultQuestionnairePage } from '../../pages/resultQuestionnaire/resultQuestionnaire'

import {
  FormGroup,
  FormControl
} from '@angular/forms';


@Component({
  selector: 'page-quizpippage',
  templateUrl: './quizpip.html'
})
export class QuizPipPage {

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
  public questionsSend: Question;
  public dataAnswers  = [];
  public dataAnswers2  = [];
  public answercorrects = [];
  public comprobacion:number;

  questionForm;

  public questionTime:number;
  public questionnaireTime:number;
  public timeInSeconds: number;
  public displayTime: string;


  constructor(
    public navParams: NavParams,
    public navController: NavController,
    public utilsService: UtilsService,
    public ionicService: IonicService,
    public questionnaireService: QuestionnaireService,
    public translateService: TranslateService) {

    //this.myQuestionnaire = this.navParams.data.myQuestionnaire;
    this.questions = this.navParams.data.question;
    this.questionTime = this.navParams.data.questiontime;
    this.questionnaireTime = this.navParams.data.questionnairetime;

    console.log(this.questionTime);
    console.log(this.questionnaireTime);

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

  //ERROR AL COMPROBAR SI ES MULTIRESPUESTA CON 6 RESPUESTAS!!!!
  // NO FUNCIONA FLIPCARD
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
    console.log(this.navParams.data.questionnaireGame);
    this.ionicService.removeLoading();
  }


 /**
   * This method manages the call to the service for performing a doSubmitAnswer
   * against the public services
   */
  public doSubmitAnswer() {
    console.log("SUBMITANSWER")

    this.navController.setRoot(ResultQuestionnairePage,
      {questions: this.questions,
        answers: this.dataAnswers,
        myCredentials: this.myCredentials,
        questionnaireGame: this.navParams.data.questionnaireGame });

    }


  /**
   * This method manages the call to the service for performing a doSubmitEmptyAnswer
   */

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
    setTimeout(() => {
      time--;
      this.displayTime = this.getSecondsAsDigitalClock(time);
      if (time > 0) {
        this.timerTick(time);
      }
      else {
          this.doSubmitAnswer();
      }
    }, 1000);
  }

  //this.ionicService.showLoading(this.timer.timeInSeconds.toLocaleString());

  /**
   *  TIMER STOP
  */

}


