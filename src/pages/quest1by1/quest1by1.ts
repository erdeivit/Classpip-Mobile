import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { IonicService } from '../../providers/ionic.service';
import { Question } from '../../model/question';
import { ResultQuestionnairePage } from '../resultQuestionnaire/resultQuestionnaire'

@Component({
  selector: 'page-quest1by1',
  templateUrl: './quest1by1.html'
})

/* tslint:disable */
export class quest1by1Page {
  public questions: Array<Question>;
  public actualQuestion: Question;
  public userAnswer  = [];
  public userMultiAnswer  = [];
  public title: string;
  public comprobacion:number=7;
  public i: number;
  public questionTime:number;
  public questionnaireTime:number;
  public displayTime: string;
  public timer;
  public time: number=0;
  public findFinish = false;
  constructor(
    public navParams: NavParams,
    public navController: NavController,
    public ionicService: IonicService,
    public translateService: TranslateService) {
    this.questions = this.navParams.data.question;
    this.actualQuestion = this.navParams.data.actualQuestion;
    this.questionTime = this.navParams.data.questiontime;
    this.questionnaireTime = this.navParams.data.questionnairetime;
    this.i = this.navParams.data.i;
    if(this.navParams.data.dataAnswers){
      this.userAnswer = this.navParams.data.dataAnswers;
    }
  }

  public saveAnswer(answer:string){
    this.userAnswer[this.i] = answer;
  }

  public saveMultipleAnswer(answer:string,indexUserAnswer:number,indexMultipleAnswer:number){
    if (this.comprobacion === indexMultipleAnswer)
    {
      this.userMultiAnswer.splice(indexMultipleAnswer,1);
      this.userAnswer[indexUserAnswer] = this.userMultiAnswer;
      this.comprobacion=7;
    }
    else
    {
      this.userMultiAnswer[indexMultipleAnswer] = answer;
      this.userAnswer[indexUserAnswer] = this.userMultiAnswer;
      this.comprobacion=indexMultipleAnswer;
    }
  }

  /**
   * Fires when the page appears on the screen.
   * Used to get all the data needed in page
   */
  public ionViewDidEnter(): void {
    this.ionicService.removeLoading()
  }

  public doSubmitAnswer() {
    this.actualQuestion = this.questions[this.i];
    if ((!this.questions[this.i+1]) || (this.findFinish))
    {
      clearTimeout(this.timer);
      this.navController.setRoot(ResultQuestionnairePage,
        {questions: this.questions,
          answers: this.userAnswer,
          questionnaireGame: this.navParams.data.questionnaireGame
        });
        return;
    }
    else
    {
      this.i++;
      clearTimeout(this.timer);
      this.navController.setRoot(quest1by1Page,
        {
          question: this.questions,
          dataAnswers: this.userAnswer,
          title: this.navParams.data.title,
          questionnaireGame: this.navParams.data.questionnaireGame,
          actualQuestion: this.questions[this.i],
          questiontime: this.questionTime,
          questionnairetime: this.time,
          i:this.i
        });
    }
  }

  /**
   *  TIMER START
   */
  ngOnInit() {
    this.initTimer();
  }

  initTimer() {
    if (this.questionTime){
      this.time = this.questionTime;
      this.questionnaireTime=undefined;
    }
    else if (this.questionnaireTime)
    {
      this.time = this.questionnaireTime;
    }
    else {
      return;
    };
    this.displayTime = this.getSecondsAsDigitalClock(this.time);
    this.timerTick();
  }

  getSecondsAsDigitalClock(inputSeconds: number) {
    var sec_num = parseInt(inputSeconds.toString(), 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var hoursString = hoursString = (hours < 10) ? "0" + hours : hours.toString();
    var minutesString = minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
    var secondsString = secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
    return hoursString + ':' + minutesString + ':' + secondsString;
  }

  timerTick() {
    this.timer = setTimeout(() => {
      this.time--;
      this.displayTime = this.getSecondsAsDigitalClock(this.time);
      if (this.time > 0) {
        this.timerTick();
      }
      else {
        if(this.questionnaireTime){
          this.findFinish = true;
          }
          this.doSubmitAnswer();
      }
    }, 1000);
  }
}


