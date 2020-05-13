import { IStudent } from './../../../models/studentModel';
import { InstructorService } from 'src/app/service/instructor/instructor.service';
import { IInstructorPagingResponse } from 'src/app/shared/API-response/IInstructorResponse';
import { IStudentPagingResponse } from './../../../shared/API-response/IStudentResponse';
import { StudentService } from 'src/app/service/student/student.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, Inject, OnDestroy, Pipe, ElementRef, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScheduleService } from 'src/app/service/schedule/schedule.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatInput } from '@angular/material/input';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-create-lesson-dialog',
  templateUrl: './create-lesson-dialog.component.html',
  styleUrls: ['./create-lesson-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateLessonDialogComponent implements OnInit, OnDestroy {

  // currentDate = new Date().toISOString().slice(0, 10);

  constructor(
    public dialogRef: MatDialogRef<CreateLessonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private scheduleService: ScheduleService,
    private studentService: StudentService,
    private instructorService: InstructorService,
  ) { }

  public subscription$: Subscription;

  private students$;

  studentsSourceList: IStudentPagingResponse;
  instructorsSourceList: IInstructorPagingResponse;

  studentsDisplayList = []
  selectedStudent = '';
  studentId: number[] = [];

  instructorDisplayList = [];
  selectedInstructor = '';
  instructorId: number[] = [];

  toggleList = false;


  hideList(){
    this.studentsDisplayList = [];
    this.instructorDisplayList = [];
    this.toggleList = false;
  }

  getNameValue(row, inputFieldRef){
    if (inputFieldRef.name == 'student'){
      this.studentsSourceList.results.forEach(item=>{
        if(item.name === row.name){

          this.studentId.push(row.id);
          this.selectedStudent = row.name + ' ' + row.surname;

        }
      })
      this.studentsDisplayList = [];

    } else if (inputFieldRef.name == 'instructor'){

      this.instructorsSourceList.results.forEach(item=>{
        if(item.name === row.name){
          this.instructorId.push(row.id);
          this.selectedInstructor = row.name + ' ' + row.surname;
        }
      })
      this.instructorDisplayList = [];
    }
  }

  public search(inputField: string | any){
    let regexp = new RegExp(inputField.value, 'gi')

    if (inputField.name == 'student'){
      if (!inputField.value.trim()){
        // this.studentsDisplayList=[]
        this.studentsDisplayList = this.studentsSourceList.results;
      } else {
        this.studentsDisplayList = this.studentsSourceList.results
          .filter(e => e.surname.match(regexp) || e.name.match(regexp));
      }

    } else if (inputField.name == 'instructor'){

      if (!inputField.value.trim()){
        // this.studentsDisplayList=[]
        this.instructorDisplayList = this.instructorsSourceList.results;
      } else {
        this.instructorDisplayList = this.instructorsSourceList.results
          .filter(e => e.surname.match(regexp) || e.name.match(regexp));
      }
    }
  }

  ngOnInit(): void {
    this.students$ = this.studentService.getStudents().
      subscribe((data) => this.studentsSourceList = data);

    this.students$ = this.instructorService.getInstructors().
      subscribe( data => this.instructorsSourceList = data);
  }

  ngOnDestroy(){
    if (this.subscription$){
      this.subscription$.unsubscribe();
    }
    this.students$.unsubscribe();
  }

  onClickDialog(lessonForm){
    console.log(lessonForm.value);
    console.log(this.studentId);
  }

  createLesson(lesson){
    lesson.value.date = formatDate(lesson.value.date, 'dd-MM-yyyy', 'en_US')

    this.subscription$ = this.scheduleService.createLesson(lesson.value).
    subscribe(
      (data) => (console.log('CREATED:', data)),
      (error: HttpErrorResponse) => (console.log('Error: ', error)),
      // Broadcast to refresh schedule
      () => (
        this.scheduleService.scheduleSubject.next(null),
        this.dialogRef.close()
        )
    );
  }

}
