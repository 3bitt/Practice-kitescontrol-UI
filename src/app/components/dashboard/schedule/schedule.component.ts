import { ILessonPagingResponse } from './../../../shared/API-response/ILessonResponse';
import { Subscription, of, Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScheduleService } from 'src/app/service/schedule/schedule.service';
import { LessonService } from 'src/app/service/lesson/lesson.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit, OnDestroy {

  constructor(
    private _scheduleService: ScheduleService,
    private _lessonsService: LessonService
  ) { }


  public errorMessage;
  public lessons$: Observable<ILessonPagingResponse>;
  // public lessons: ILessonPagingResponse;

  ngOnInit(): void {

    this.lessons$ = this._lessonsService.lessons$
    .pipe(catchError(error => {
      this.errorMessage = error;
      return of(null);
      })
    );
  }

  ngOnDestroy(): void {


  }


}
