import { StudentService } from './../../../service/student/student.service';
import { FinishLessonDialogComponent } from './../finish-lesson-dialog/finish-lesson-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { EditLessonDialogComponent } from './../edit-lesson-dialog/edit-lesson-dialog.component';
import { Subscription } from 'rxjs';
import { Component, OnInit, Input, OnDestroy, ElementRef } from '@angular/core';
import { ScheduleService } from 'src/app/service/schedule/schedule.service';
import { faCheckCircle,  faPlayCircle,
  faDollarSign, faQuestionCircle, faQuestion, faTrashAlt,
faEdit } from '@fortawesome/free-solid-svg-icons';
import { ISchedule, IScheduleInstructor, Lesson } from '../model/schedule-interface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from 'src/app/shared/confirm-delete-dialog/confirm-delete-dialog.component';
import { ILessonDetailResponse } from 'src/app/shared/API-response/ILessonResponse';


@Component({
  selector: 'app-schedule-lesson',
  templateUrl: './schedule-lesson.component.html',
  styleUrls: ['./schedule-lesson.component.css']
})
export class ScheduleLessonComponent implements OnInit, OnDestroy {

  constructor(
    private scheduleService: ScheduleService,
    private studentService: StudentService,
    private dialog: MatDialog,
  ) { }

  public subscription$: Subscription;
  @Input() instructor: IScheduleInstructor;



  faCheck = faCheckCircle;
  faStart = faPlayCircle;
  faDollar = faDollarSign;
  faEdit = faEdit;
  faTrash = faTrashAlt;
  faQuestion = faQuestionCircle;
  faQuestion2 = faQuestion;

  ngOnInit(): void {
  }

  showLessonActionsMenu(elementRef: HTMLElement){
    if (elementRef.classList.contains('clicked')){
      elementRef.style['visibility']='hidden';
      elementRef.classList.remove('clicked');
      elementRef.parentElement.style.backgroundColor = 'transparent';
      elementRef.parentElement.parentElement.parentElement.style.border ='none'
    } else {
      elementRef.parentElement.parentElement.parentElement.style.border ='3px solid #1266bf'
      elementRef.style['visibility']='visible';
      elementRef.classList.add('clicked');
      elementRef.parentElement.style.backgroundColor = '#267dff';
    }
  }
  // = {'status': 'Niepotwierdzona'}
  confirmLesson(lessonId, lessonStatus: string){
    if (!lessonStatus.includes('NC')){
      lessonStatus = lessonStatus.replace('C', 'NC')
    } else if (lessonStatus.includes('NC')){
      lessonStatus = lessonStatus.replace('NC', 'C')
    } else {
      return console.log('Nieznany status lekcji: ', lessonId, lessonStatus);
    }
    let payload = {status: lessonStatus}


    this.subscription$ = this.scheduleService.patchLesson(lessonId, payload).
    subscribe(
      data => {},
      error =>   { console.log('ERR:', error) },
      () => this.scheduleService.scheduleSubject.next(null),
    )
  }

  startLesson(lessonId, inProgressBool){
    inProgressBool = {'in_progress': !inProgressBool}
    this.subscription$ = this.scheduleService.patchLesson(lessonId, inProgressBool).
    subscribe(
      data => {},
      error =>   { console.log('ERR:', error) },
      () => this.scheduleService.scheduleSubject.next(null),
    )
  }

  finishLesson(lesson: ILessonDetailResponse){

    // If lesson is already finished then don't display dialog, instead remove finished status
    if (lesson.status.includes('F')){
      let payload = {
        'status': lesson.status.includes('F') ? lesson.status.replace('F', '') : lesson.status.concat('F'),
        'in_progress': lesson.in_progress ? false : false
        }
      this.subscription$ = this.scheduleService.patchLesson(lesson.id, payload).
      subscribe(
        data => {console.log(data);
        },
        error =>   { console.log('ERR:', error) },
        () => this.scheduleService.scheduleSubject.next(null),
      )

    } else {

      let dialogRef = this.dialog.open(FinishLessonDialogComponent,
        {
          data: { lesson: lesson }
        });

      dialogRef.afterClosed().subscribe(
        data => {
          if(data){
            this.subscription$ = this.scheduleService.patchLesson(lesson.id, data.lessonUpdatePayload).subscribe();
            for(let studentPayload of data.studentList){
              this.subscription$ = this.studentService.patchStudent(studentPayload.id, studentPayload.new_level).subscribe();
              setTimeout(() => {}, 500)
            };
            this.scheduleService.scheduleSubject.next(null)
          };
        }
      )
    }
  }

  editLesson(lessonObj: IScheduleInstructor): void{
    let dialogRef = this.dialog.open(EditLessonDialogComponent,
      {
        data: lessonObj
      }
    );
  }

  confirmDelete(lessonObj){
    let dialogRef = this.dialog.open(ConfirmDeleteDialogComponent,
      {
        panelClass: 'dialog',
        data: {
          obj: lessonObj,
          context: "lesson"
        }
      });

      dialogRef.afterClosed().subscribe(
        (result: any | undefined) => {
          if (result === undefined){
            return
          }
          else if (result.event === 'Delete'){
            this.deleteLesson(result.data)
          };
        }
      );
  }

  deleteLesson(id: number){
    this.subscription$ = this.scheduleService.deleteLesson(id)
    .subscribe(
      (data) => { },
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
