import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { IonicService } from '../../providers/ionic.service';
import { QuestionnaireService } from '../../providers/questionnaire.service';
import { Question } from '../../model/question';
import { MenuPage } from '../../pages/menu/menu';

@Component({
  selector: 'page-resultQuestionnaire',
  templateUrl: './resultQuestionnaire.html'
})

export class ResultQuestionnairePage {
  public myQuestions: Array<Question>;
  public userAnswers = [];
  public numTotalQuestions: number = 0;
  public numAnswerCorrect: number = 0;
  public numAnswerNoCorrect: number = 0;
  public finalNote: string;
  public mark: number = 0;
  constructor(
    public navParams: NavParams,
    public navController: NavController,
    public ionicService: IonicService,
    public questionnaireService: QuestionnaireService,
    public translateService: TranslateService) {
    this.userAnswers = this.navParams.data.answers;
    this.myQuestions = this.navParams.data.questions;
  }
  /**
   * Fires when the page appears on the screen.
   * Used to get all the data needed in page
   */
  public ionViewDidEnter(): void {
    this.ionicService.removeLoading();
    this.calculatemark();
    this.postResult();
  }

  public outQuestionnaire() {
    this.navController.setRoot(MenuPage);
  }

  public calculatemark(){
    var i=0;
    this.numTotalQuestions = this.myQuestions.length;
    for(let question of this.myQuestions){
      switch (question.type)
      {
        case "openQuestion":
        case"classic":
          if (question.correctanswer === this.userAnswers[i]){
            this.numAnswerCorrect++;
          }
          else
          {
            this.numAnswerNoCorrect++;
          }
        break;
        case "multiAnswer":
        var correct = question.correctanswer.split([','][0])
        if (this.userAnswers[i] !== undefined)
        {
        var numRights = 0;
        var length = 0;
        for (let ans of correct){
          for (let userans of this.userAnswers[i])
          {
            if (userans === ans)
            {
              numRights++;
            }
          }
        }
        for (let userans of this.userAnswers[i])
          {
            if(userans !=="")
            {
              length++;
            }
          }
        if ((numRights === correct.length) && (correct.length === length))
        {
          this.numAnswerCorrect++;
        }
        else
        {
          this.numAnswerNoCorrect++;
        }
      }
      else{
        this.numAnswerNoCorrect++;
      }
        break;
      }
      i++;
    }
    this.mark = (this.numAnswerCorrect/this.numTotalQuestions)*10;
    this.finalNote = this.mark.toFixed(2);
  }

  //TODO: Go to questionnaireService.saveResult and change the id of the user by one caught (currently static to 10000)
  public postResult(){
    this.questionnaireService.postResult(this.navParams.data.questionnaireGame,this.numAnswerCorrect,this.numAnswerNoCorrect,this.finalNote,this.userAnswers,this.numTotalQuestions).subscribe(
      (() => {
      }),
      error =>
      this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
  }

}
