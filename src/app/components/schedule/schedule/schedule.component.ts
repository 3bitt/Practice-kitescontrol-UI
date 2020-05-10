import { ISchedule } from './../model/schedule-interface';
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
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
  currentDate: string;
  public instructorsWithLessons: ISchedule;


  faPlus = faPlus;
  faCalendar = faCalendarAlt;


  ngOnInit() {

    this.currentDate = new Date().toISOString().slice(0,10);

    this.getTodaysLessons(this.currentDate);

    this.service$ = this.scheduleService.refreshFunc.
      subscribe( (receivedDate) => { this.getTodaysLessons(receivedDate ? receivedDate: this.currentDate);
      });
      console.log(this.instructorsWithLessons);

  }

  getTodaysLessons(date: string){
    this.service$ = this.scheduleService.getInstructorsLessons(date)
        .subscribe((data: ISchedule) => this.instructorsWithLessons = data);
  }

  openDialog(): void{
    let dialogRef = this.dialog.open(
      CreateLessonDialogComponent,
      {
        height: "auto",
        width: "350px"
    } );
  }

  ngOnDestroy(): void {
    this.service$.unsubscribe();
  }
}
