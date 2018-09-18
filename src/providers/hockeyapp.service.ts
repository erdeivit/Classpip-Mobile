import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

@Injectable()
export class HockeyAppService {

  constructor(
    public platform: Platform) {}

  /**
   * Method for checking Hockeyapp updates
   * @param {string} idAndroid Android application identifier for hockeyapp
   * @param {idiOS} idAndroid Android application identifier for hockeyapp
   */
  public checkHockeyAppUpdates(idAndroid: string, idiOS: string): void {
    if (window['hockeyapp']) {
      if (this.platform.is('android')) {
        window['hockeyapp'].start(function () {
          window['hockeyapp'].checkForUpdate();
        }, function () {
          console.error('There is a problem starting HockeyApp for android');
        }, idAndroid);
      } else {
        window['hockeyapp'].start(function () {
          window['hockeyapp'].checkForUpdate();
        }, function () {
          console.error('There is a problem starting HockeyApp for iOS');
        }, idiOS);
      }
    }

  }
}
