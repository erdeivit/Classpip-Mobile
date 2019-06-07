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
  public numQuestions: number;
  public actualQuestion: Question;
  public dataAnswers  = [];
  public dataAnswers2  = [];
  public title: string;
  public comprobacion:number=7;
  public i: number;
  public questionTime:number;
  public questionnaireTime:number;
  public displayTime: string;
  public timer;
  public finish = false;
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
      this.dataAnswers = this.navParams.data.dataAnswers;
    }
  }

  public saveanswer(data:string){
    this.dataAnswers[this.i] = data;
  }

  public saveanswer2(data:string,indice:number,indice2:number){
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
  }

  public saveanswer3(res,indice:number)
  {
    this.dataAnswers[indice] = res;
  }

  /**
   * Fires when the page appears on the screen.
   * Used to get all the data needed in page
   */
  public ionViewDidEnter(): void {
    this.ionicService.removeLoading()
  }

 /**
   * This method manages the call to the service for performing a doSubmitAnswer
   * against the public services
   */
  public doSubmitAnswer() {
    this.actualQuestion = this.questions[this.i];
    if ((!this.questions[this.i+1]) || (this.finish))
    {
      clearTimeout(this.timer);
      this.navController.setRoot(ResultQuestionnairePage,
        {questions: this.questions,
          answers: this.dataAnswers,
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
          dataAnswers: this.dataAnswers,
          title: this.navParams.data.title,
          questionnaireGame: this.navParams.data.questionnaireGame,
          actualQuestion: this.questions[this.i],
          questiontime: this.questionTime,
          questionnairetime: this.questionnaireTime,
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
    };
    this.displayTime = this.getSecondsAsDigitalClock(time);
    this.timerTick(time);
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
          }
          this.doSubmitAnswer();
      }
    }, 1000);
  }
}


