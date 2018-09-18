import { Injectable } from '@angular/core';
import { Loading, LoadingController, AlertController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { AppVersion } from 'ionic-native';


@Injectable()
export class IonicService {

  public loading: Loading;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public translateService: TranslateService) { }

  /**
   * Displays a loading mask into the screen
   * @param {string} message Message to display
   */
  public showLoading(message: string): void {

    // Remove the loading mask in case there is something
    if (this.loading) {
      this.loading.dismiss().catch(() => { });
    }

    this.loading = this.loadingCtrl.create({
      content: message
    });
    this.loading.present();
  }

  /**
   * Remove the current loading mask from the screem
   */
  public removeLoading(): void {

    if (this.loading) {
      setTimeout(() => {
        this.loading.dismiss()
          .catch(() => { });
      });
    }
  }

  /**
   * Displays an alert message with a confirmation button
   * on the screen
   * @param {string} title Title of the alert
   * @param {string} message Message to display
   */
  public showAlert(title: string, message: string): void {

    this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [this.translateService.instant('APP.OK')]
    }).present(prompt);
  }

  /**
   * This method returns the application version
   */
  /* tslint:disable */
  public getAppVersion(): Promise<any> {
    /* tslint:enable */
    return AppVersion.getVersionNumber();
  }

}
