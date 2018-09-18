import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { HockeyAppService } from '../providers/hockeyapp.service';
import { RoleSelectPage } from '../pages/role-select/role-select';
import { AppConfig } from './app.config';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage = RoleSelectPage;

  constructor(
    public platform: Platform,
    public translateService: TranslateService,
    public hockeyAppService: HockeyAppService) {

    platform.ready().then(() => {

      // i18n configuration
      translateService.setDefaultLang(AppConfig.LANG);
      translateService.use(AppConfig.LANG);

      // hockeyapp check for updates
      hockeyAppService.checkHockeyAppUpdates(AppConfig.HA_ANDROID, AppConfig.HA_IOS);

      // App initialization
      if (platform.is('cordova')) {
        StatusBar.styleDefault();
        Splashscreen.hide();
      }
    });
  }
}
