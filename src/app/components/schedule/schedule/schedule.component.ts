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
  public instructorsWithLessons: ISchedule;

  currDateAsString: string;
  currDateAsDate: Date;

  faPlus = faPlus;
  faCalendar = faCalendarAlt;

  ngOnInit() {

    this.currDateAsString = new Date().toISOString().slice(0,10);

    // Get lessons for given date (default: today)
    this.getTodaysLessons(this.currDateAsString);

    // Subscribe to refresh view requests
    this.service$ = this.scheduleService.refreshFunc.
      subscribe( (receivedDate) => { this.getTodaysLessons(receivedDate ? receivedDate: this.currDateAsString);
      });
  }

  getTodaysLessons(date: string){
    this.service$ = this.scheduleService.getInstructorsLessons(date)
        .subscribe((data: ISchedule) => this.instructorsWithLessons = data);
  }

  openDialog(): void{
    let dialogRef = this.dialog.open(
      CreateLessonDialogComponent,
      {
        panelClass: 'dialog'
    } );
  }

  showScheduleByDate(date){
    this.service$ = this.scheduleService.getInstructorsLessons(date)
        .subscribe((data: ISchedule) => this.instructorsWithLessons = data);

    this.currDateAsDate = new Date(date);
  }

  ngOnDestroy(): void {
    this.service$.unsubscribe();
  }
}
