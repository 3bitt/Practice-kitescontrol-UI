import { EditLessonDialogComponent } from './../edit-lesson-dialog/edit-lesson-dialog.component';
import { Subscription } from 'rxjs';
import { Component, OnInit, Input, OnDestroy, ElementRef } from '@angular/core';
import { ScheduleService } from 'src/app/service/schedule/schedule.service';
import { faCheckCircle, faPlayCircle, faDollarSign, faQuestionCircle, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { ISchedule, IScheduleInstructor, Lesson } from '../model/schedule-interface';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-schedule-lesson',
  templateUrl: './schedule-lesson.component.html',
  styleUrls: ['./schedule-lesson.component.css']
})
export class ScheduleLessonComponent implements OnInit, OnDestroy {

  constructor(
    private scheduleService: ScheduleService,
    private dialog: MatDialog,
  ) { }

  public subscription$: Subscription;
  @Input() instructor: IScheduleInstructor;



  faCheck = faCheckCircle;
  faStart = faPlayCircle;
  faDollar = faDollarSign;
  faQuestion = faQuestionCircle;
  faQuestion2 = faQuestion;

  ngOnInit(): void {
  }

  showLessonActionsMenu(elementRef: HTMLElement){
    if (elementRef.classList.contains('clicked')){
      elementRef.style['visibility']='hidden';
      elementRef.classList.remove('clicked');
      elementRef.parentElement.style.backgroundColor = 'transparent';
    } else {
      elementRef.style['visibility']='visible';
      elementRef.classList.add('clicked');
      elementRef.parentElement.style.backgroundColor = '#267dff';
    }
  }

  startLesson(lessonId, inProgressBool){
    inProgressBool = {'in_progress': !inProgressBool}
    this.subscription$ = this.scheduleService.patchLesson(lessonId, inProgressBool).
    subscribe(
      data => console.log('Started lesson:', data.status),
      error =>   { console.log('ERR:', error) },
      () => this.scheduleService.scheduleSubject.next(null),
    )
  }

  payLesson(lessonId, paidBool){
    paidBool = {'paid': !paidBool}
    this.subscription$ = this.scheduleService.patchLesson(lessonId, paidBool).
    subscribe(
      data => console.log('Started lesson:', data),
      error =>   { console.log('ERR:', error) },
      () => this.scheduleService.scheduleSubject.next(null),
    )
  }

  editLesson(lessonObj: IScheduleInstructor): void{
    let dialogRef = this.dialog.open(
      EditLessonDialogComponent,
      {
        data: lessonObj
      }
    );
  }

  deleteLesson(id: number){
    this.subscription$ = this.scheduleService.deleteLesson(id)
    .subscribe(
      (data) => { console.log(data) },
       err =>   { console.log('ERR:', err) },
       () => { this.scheduleService.scheduleSubject.next(null) }
    );

  }

  ngOnDestroy(){
    if (this.subscription$){
      this.subscription$.unsubscribe();
    }
  }

}
