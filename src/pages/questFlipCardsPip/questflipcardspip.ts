import { Component } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { IonicService } from '../../providers/ionic.service';
import { Question } from '../../model/question';
import { MenuPage } from '../menu/menu';
@Component({
  selector: 'page-questflipcardspip',
  templateUrl: './questflipcardspip.html'
})
export class questflipcardspipPage {
  public questions: Array<Question>;
  public questionsAnswers: Array<Question>
  public actualQuestion: Question;
  public title: string;
  public i:number=0;
  constructor(
    public navParams: NavParams,
    public navController: NavController,
    public ionicService: IonicService,
    public translateService: TranslateService,
    public alertController: AlertController) {
    this.questions = this.navParams.data.question;
    this.actualQuestion = this.questions[0];
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      title:"Final",
      message: 'Hasta aquí el repaso con el cuestionario: ' +this.navParams.data.title,
      buttons: ['OK'],
      cssClass: "alertDanger",
    });
    await alert.present();
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

  public nextQuestion() {
       if (!this.questions[this.i+1])
       {
        this.presentAlert();
        this.navController.setRoot(MenuPage);
       }
       else
       {
        this.i++;
        this.actualQuestion = this.questions[this.i];
       }
  }
}
