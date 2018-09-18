import { Component } from '@angular/core';
import { MenuController, Refresher, Platform, NavController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { IonicService } from '../../providers/ionic.service';
import { UserService } from '../../providers/user.service';
import { AvatarService } from '../../providers/avatar.service';
import { TermsPage } from '../../pages/profile/terms/terms';
import { HelpPage } from '../../pages/profile/help/help';
import { Profile } from '../../model/profile';
import { Avatar } from '../../model/avatar';

@Component({
  selector: 'page-profile',
  templateUrl: './profile.html'
})
export class ProfilePage {

  public profile: Profile;
  public appVersion: string;

  constructor(
    public ionicService: IonicService,
    public userService: UserService,
    public avatarService: AvatarService,
    public platform: Platform,
    public navController: NavController,
    public translateService: TranslateService,
    public menuController: MenuController) {
  }

  /**
   * Fires when the page appears on the screen.
   * Used to get all the data needed in page
   */
  public ionViewDidEnter(): void {

    this.menuController.enable(true);
    this.ionicService.showLoading(this.translateService.instant('APP.WAIT'));

    this.getProfileInfo();

    this.platform.ready().then(() => {

      // Get the application version
      if (this.platform.is('cordova')) {
        this.ionicService.getAppVersion()
          .then((response) => this.appVersion = response)
          .catch((error) => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
      } else {
        this.appVersion = 'x.x.x';
      }
    });
  }

  /**
   * This method returns the school information from the
   * backend. This call is called on the constructor or the
   * refresh event
   * @param {Refresher} Refresher element
   */
  private getProfileInfo(refresher?: Refresher): void {

    this.userService.getMyProfile().finally(() => {
      refresher ? refresher.complete() : null;
      this.ionicService.removeLoading();
    }).subscribe(
      ((value: Profile) => this.profile = value),
      error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
  }

  /**
   * This function navigates to help page
   */
  public help(): void {
    this.navController.push(HelpPage);
  }

  /**
   * This function navigates to terms page
   */
  public terms(): void {
    this.navController.push(TermsPage);
  }
}
