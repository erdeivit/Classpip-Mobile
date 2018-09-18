import { Component } from '@angular/core';
import { Refresher, Platform, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { IonicService } from '../../providers/ionic.service';
import { GroupService } from '../../providers/group.service';
import { Group } from '../../model/group';
import { Student } from '../../model/student';
import { StudentPage } from '../students/student/student';

@Component({
  selector: 'page-group',
  templateUrl: './group.html'
})
export class GroupPage {

  public group: Group;
  public grid: Array<Array<Student>>; //array of arrays
  private students: Array<Student>;
  private elements: number = 3;

  constructor(
    public navParams: NavParams,
    public navController: NavController,
    public ionicService: IonicService,
    public groupService: GroupService,
    public translateService: TranslateService) {

    this.students = this.navParams.data.students;
    this.group = this.navParams.data.group;
    this.grid = Array(Math.ceil(this.students.length / this.elements));
  }

  /**
   * Fires when the page appears on the screen.
   * Used to get all the data needed in page
   */
  public ionViewDidEnter(): void {

    this.prepareGrid();
    this.ionicService.removeLoading();
  }

  /**
   * This method returns the students list of the
   * current school
   * @param {Refresher} Refresher element
   */
  private getStudents(refresher?: Refresher): void {

    this.groupService.getMyGroupStudents(this.group.id).finally(() => {
      refresher ? refresher.complete() : null;
    }).subscribe(
      ((value: Array<Student>) => this.prepareGrid()),
      error => this.ionicService.showAlert(this.translateService.instant('APP.ERROR'), error));
  }

  /**
   * This method converts an array of students into a
   * col-row matrix for being displayed into a grid
   */
  private prepareGrid(): void {
    let rowNum = 0;
    for (let i = 0; i < this.students.length; i += this.elements) {
      this.grid[rowNum] = Array(this.elements);
      for (let y = 0; y < this.elements; y++) {
        if (this.students[i + y]) {
          this.grid[rowNum][y] = this.students[i + y];
        }
      }
      rowNum++;
    }
  }

  /**
   * Method called from the home page to open the list of the
   * students of the school of the current user
   */
  public goToStudentDetail(student: Student): void {
    this.navController.push(StudentPage, { student: student })
  }
}
