import { throttleTime, debounceTime } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { ISchedule } from './../model/schedule-interface';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import {faPlus, faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import { ScheduleService } from 'src/app/service/schedule/schedule.service';
import { CreateLessonDialogComponent } from '../create-lesson-dialog/create-lesson-dialog.component';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent implements OnInit {

  constructor(private scheduleService: ScheduleService,
    private dialog: MatDialog,
    ) { }

  service$: Subscription;
  // dialogCloseEvent$: Subscription;
  schedUpdate$: Subscription;
  public instructorsWithLessons: ISchedule;

  currDateAsString: string;
  currDateAsDate: Date;

  faPlus = faPlus;
  faCalendar = faCalendarAlt;

  ngOnInit() {
    console.log('Schedule init');

    this.currDateAsString = formatDate(new Date().toLocaleDateString().slice(0,10), 'yyyy-MM-dd', 'pl_PL')
    this.currDateAsDate = new Date();

    // Get lessons for given date (default: today)
      // this.getTodaysLessons(this.currDateAsString);

    // Subscribe to refresh view requests
    this.schedUpdate$ = this.scheduleService.subject$.subscribe(
      (date) => this.service$ = this.scheduleService.getInstructorsLessons(date ? date: this.currDateAsString).
      subscribe((data: ISchedule) => this.instructorsWithLessons = data)
    )

  }

  getTodaysLessons(date: string){
    this.service$ = this.scheduleService.getInstructorsLessons(date)
        .subscribe((data: ISchedule) => this.instructorsWithLessons = data);
  }


  openDialog(): void{
    // open dialog - pass in instructors with lessons for further validation when adding new lesson
    let dialogRef = this.dialog.open(
      CreateLessonDialogComponent,
      {
        panelClass: 'dialog',
        data: {
          instructors: this.instructorsWithLessons.instructors.filter(item => item.lessons.length > 0),
          scheduleCurrentDate: this.currDateAsString
        }
      });
  }


  showScheduleByDate(date){
    this.service$ = this.scheduleService.getInstructorsLessons(date)
        .subscribe((data: ISchedule) => this.instructorsWithLessons = data);

    this.currDateAsDate = new Date(date);
    this.currDateAsString = formatDate(new Date(date).toLocaleDateString().slice(0,10), 'yyyy-MM-dd', 'pl_PL');
    console.log(this.currDateAsString);
  }

  switcherUpdateDate(date){
    this.currDateAsDate = new Date(date);
    this.currDateAsString = formatDate(new Date(date).toLocaleDateString().slice(0,10), 'yyyy-MM-dd', 'pl_PL');
  }

  ngOnDestroy(): void {
    this.service$ ? this.service$.unsubscribe() : null
    // this.dialogCloseEvent$.unsubscribe();
    this.schedUpdate$ ? this.schedUpdate$.unsubscribe() : null
    console.log('Schedule OnDestroy');

  }

}
