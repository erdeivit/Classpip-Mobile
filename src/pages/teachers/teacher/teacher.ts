import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { Teacher } from '../../../model/teacher';

@Component({
  selector: 'page-teacher',
  templateUrl: './teacher.html'
})
export class TeacherPage {

  public teacher: Teacher;

  constructor(
    public navParams: NavParams) {

    this.teacher = this.navParams.data.teacher;
  }

  /**
   * Fires when the page appears on the screen.
   * Used to get all the data needed in page
   */
  public ionViewDidEnter(): void {
  }
}
