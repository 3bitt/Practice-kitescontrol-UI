import { IInstructor } from './../../../models/instructorModel';
import { NgForm, NgModel, FormControl } from '@angular/forms';
import { Lesson, ISchedule, IScheduleInstructor, LessonInstructor } from './../model/schedule-interface';
import { IStudent } from './../../../models/studentModel';
import { InstructorService } from 'src/app/service/instructor/instructor.service';
import { IInstructorPagingResponse } from 'src/app/shared/API-response/IInstructorResponse';
import { IStudentPagingResponse } from './../../../shared/API-response/IStudentResponse';
import { StudentService } from 'src/app/service/student/student.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, Inject, OnDestroy, Pipe, ElementRef, ViewEncapsulation, Input, ViewChild, AfterViewInit, AfterViewChecked, ChangeDetectorRef, AfterContentChecked, AfterContentInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { ScheduleService } from 'src/app/service/schedule/schedule.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatInput } from '@angular/material/input';
import { formatDate } from '@angular/common';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-create-lesson-dialog',
  templateUrl: './create-lesson-dialog.component.html',
  styleUrls: ['./create-lesson-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateLessonDialogComponent implements OnInit, OnDestroy {

  constructor(
    public dialogRef: MatDialogRef<CreateLessonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private scheduleService: ScheduleService,
    private studentService: StudentService,
    private instructorService: InstructorService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }


  public subscription$: Subscription;

  private students$;
  faTimesIcon = faTimes;

  studentsSourceList: IStudentPagingResponse;
  instructorsSourceList: IInstructorPagingResponse;
// Select student/instructor dropdown variables
  studentsDropdownList = []
  selectedStudent = ' ';
  studentIdsList: number[] = [];
  instructorsDropdownList = [];
  selectedInstructor = ' ';
  instructorIdsList: number[] = [];
  toggleList = false;
  studentDisplayList = [];
  instructorDisplayList= [];

  // Used to set below fields status to valid when stud/instr is choosed
  @ViewChild('lessonInstructor') instructorInput: NgModel;
  @ViewChild('lessonStudent') studentInput: NgModel;

  // Used to set today's date on init
  @ViewChild('lessonDate') lessonDate: NgModel;
  @ViewChild('lessonTime') lessonTime: NgModel;
  @ViewChild('lessonForm') lessonForm: NgForm;

  // Used to show/hide div with lesson conflict error
  lessonTimeConflict = false;

  // Not used for now
  // Variables for displaying error of conflicting lesson time
  // Value if set in checkExistingLessons function
  lessonStartTimeError;
  lessonDurationError;

  lessonDefaultDate = formatDate(new Date().toLocaleDateString().slice(0,10), 'yyyy-MM-dd', 'pl_PL')
  lessonDefaultTime: string = '';


  // Functions used in dialog
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
              name: row.name.concat(' ', row.surname),
              iko_level: row.iko_level
            });
            this.studentInput.control.setErrors(null);

        }
      });

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
            this.instructorInput.control.setErrors(null);
        }
      })

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
  createLesson(lesson){

    try {
      lesson.value.date = formatDate(lesson.value.date, 'dd-MM-yyyy', 'en_US');
    } catch (error) {

    }

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
  updateLessonTime(hour, minutes){
    let time = hour + ':' + minutes;
    this.lessonDefaultTime = time.length === 5 ? time : ''
    this.lessonTime.control.setValue(this.lessonDefaultTime)
    this.checkExistingLessons(this.lessonForm.value)
  }
  updateLessonDate(date){
    this.lessonDefaultDate = date
    this.lessonDate.control.setValue(date)
    this.checkExistingLessons(this.lessonForm.value)
  }
  checkExistingLessons(lessonToBeAdded: Lesson){

    let newStartTime: number = +lessonToBeAdded.time.replace(':', '');
    let newEndTime: number = newStartTime + (+lessonToBeAdded.duration * 100)
    let newLessonInstructor = lessonToBeAdded.instructor[0]

    let existingInstructor = this.dialogData.instructors.filter(
      i => i.id === +newLessonInstructor)

    // Check for clashing time for each existing lesson
    // First IF to avoid error when checking instructor without lesson
    // This can happen becouse validation is triggered on blur event in HTML
    if (existingInstructor.length > 0){
      for (let lesson of existingInstructor[0].lessons){
      let oldStartTime: number = +lesson.time.slice(0,5).replace(':', '')
      let oldEndTime: number = oldStartTime + (lesson.duration * 100)

      if (  (newStartTime >= oldStartTime && oldEndTime > newStartTime) ||
            (newEndTime > oldStartTime && newEndTime <= oldEndTime)     ||
            (newStartTime < oldStartTime && newEndTime > oldEndTime)
          ) {
            // Not used for now
            this.lessonStartTimeError = lesson.time.slice(0,5)
            this.lessonDurationError = lesson.duration

            this.lessonTimeConflict = true;
            console.log(this.lessonTimeConflict);
            break;
            }
            else {
              this.lessonTimeConflict = false;
              console.log(this.lessonTimeConflict);
            };
      };
    } else {
      console.log('elo');

      this.lessonTimeConflict = false;
    }
  }
  // End of functions used in dialog
  exitDialog(){
    this.dialogRef.close();
  }


  ngOnInit(): void {
    this.students$ = this.studentService.getStudents().
      subscribe((data) => this.studentsSourceList = data);

    this.students$ = this.instructorService.getActiveInstructors().
      subscribe( data => this.instructorsSourceList = data);
  }

  ngOnDestroy(){
    if (this.subscription$){
      this.subscription$.unsubscribe();
    }
    this.students$ ? this.students$.unsubscribe() : null;
  }

}
