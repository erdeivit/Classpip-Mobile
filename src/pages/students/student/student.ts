import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { Student } from '../../../model/student'

@Component({
  selector: 'page-student',
  templateUrl: './student.html'
})
export class StudentPage {

  public student: Student;

  constructor(
    public navParams: NavParams) {

    this.student = this.navParams.data.student;
  }

  /**
   * Fires when the page appears on the screen.
   * Used to get all the data needed in page
   */
  public ionViewDidEnter(): void {
  }
}
