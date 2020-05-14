import { NgForm } from '@angular/forms';
import { Lesson } from './../model/schedule-interface';
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
import { faTimes } from '@fortawesome/free-solid-svg-icons';

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
    @Inject(MAT_DIALOG_DATA) public data: Lesson,
    private scheduleService: ScheduleService,
    private studentService: StudentService,
    private instructorService: InstructorService,
  ) { }

  public subscription$: Subscription;

  private students$;
  faTimesIcon = faTimes;

  studentsSourceList: IStudentPagingResponse;
  instructorsSourceList: IInstructorPagingResponse;

  studentsDropdownList = []
  selectedStudent = ' ';
  studentIdsList: number[] = [];

  instructorsDropdownList = [];
  selectedInstructor = ' ';
  instructorIdsList: number[] = [];

  toggleList = false;

  studentDisplayList = [];
  instructorDisplayList= [];



  hideList(){
    this.studentsDropdownList = [];
    this.instructorsDropdownList = [];
    this.toggleList = false;
  }

  getNameValue(row, inputFieldRef){
    if (inputFieldRef.name == 'student'){
      this.studentsSourceList.results.forEach(item=>{
        if(item.name === row.name && !this.studentIdsList.includes(item.id) ){
          this.studentIdsList.push(row.id);
          this.selectedStudent = '';
          this.studentDisplayList.push(
            {
              id: row.id,
              name: row.name.concat(' ', row.surname)
            });
        }
      });
      console.log(this.studentIdsList);

      this.studentsDropdownList = [];

    } else if (inputFieldRef.name == 'instructor'){

      this.instructorsSourceList.results.forEach(item=>{
        if(item.name === row.name && !this.instructorIdsList.includes(item.id) &&
        // ONE INSTRUCTOR ONLY
        (this.instructorIdsList.length < 1)
        ){
          this.instructorIdsList.push(row.id);
          this.selectedInstructor = '';
          this.instructorDisplayList.push(
            {
              id: row.id,
              name: row.name.concat(' ', row.surname)
            });
        }
      })
      console.log(this.instructorIdsList);

      this.instructorsDropdownList = [];
    }
  }

  search(inputField: string | any){
    let regexp = new RegExp(inputField.value, 'gi')

    if (inputField.name == 'student'){
      if (!inputField.value.trim()){
        // this.studentsDropdownList=[]
        this.studentsDropdownList = this.studentsSourceList.results;
      } else {
        this.studentsDropdownList = this.studentsSourceList.results
          .filter(e => e.surname.match(regexp) || e.name.match(regexp));
      }

    } else if (inputField.name == 'instructor'){

      if (!inputField.value.trim()){
        // this.studentsDropdownList=[]
        this.instructorsDropdownList = this.instructorsSourceList.results;
      } else {
        this.instructorsDropdownList = this.instructorsSourceList.results
          .filter(e => e.surname.match(regexp) || e.name.match(regexp));
      }
    }
  }

  removeStudent(studentId: string){
    this.studentDisplayList = this.studentDisplayList.filter(item => item.id != studentId)
    this.studentIdsList = this.studentIdsList.filter(item => item != +studentId)
  }
  removeInstructor(instructorId: string){
    this.instructorDisplayList = this.instructorDisplayList.filter(item => item.id != instructorId)
    this.instructorIdsList = this.instructorIdsList.filter(item => item != +instructorId)
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

  exitDialog(){
    this.dialogRef.close();

  }

}
