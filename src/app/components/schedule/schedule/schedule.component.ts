import { ScheduleControllerService } from './../schedule-controller/schedule-controller.service';
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
    private scheduleNotif: ScheduleControllerService
    ) { }

  service$: Subscription;


  public instructorsWithLessons: ISchedule;


  faPlus = faPlus;
  faCalendar = faCalendarAlt;


  ngOnInit() {
    this.getTodaysLessons();

    this.service$ = this.scheduleService.refreshFunc.
      subscribe( () => { this.getTodaysLessons();
      });
  }

  private getTodaysLessons(){
    this.service$ = this.scheduleService.getInstructorsLessons()
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
