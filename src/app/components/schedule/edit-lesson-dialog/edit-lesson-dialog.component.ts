import { Student, Instructor } from './../../../shared/API-response/ILessonResponse';
import { InstructorService } from 'src/app/service/instructor/instructor.service';
import { StudentService } from 'src/app/service/student/student.service';
import { Subscription } from 'rxjs';
import { IScheduleInstructor, Lesson } from './../model/schedule-interface';
import { Component, OnInit, ViewEncapsulation, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScheduleService } from 'src/app/service/schedule/schedule.service';
import { IStudentPagingResponse } from 'src/app/shared/API-response/IStudentResponse';
import { IInstructorPagingResponse } from 'src/app/shared/API-response/IInstructorResponse';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-lesson-dialog',
  templateUrl: './edit-lesson-dialog.component.html',
  styleUrls: ['./edit-lesson-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditLessonDialogComponent implements OnInit, OnDestroy {

  constructor(
    public dialogRef: MatDialogRef<EditLessonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Lesson,
    private scheduleService: ScheduleService,
    private studentService: StudentService,
    private instructorService: InstructorService
  ) { }


  students$: Subscription;
  faTimesIcon = faTimes;

  studentsSourceList: IStudentPagingResponse;
  instructorsSourceList: IInstructorPagingResponse;

  studentsDropdownList = []
  selectedStudent = '';
  studentIdsList: number[] = [];

  instructorsDropdownList = [];
  selectedInstructor = '';
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
// Populate lists used to display and submit form from dialog data
    this.data.student.forEach(
       (student) => {
        this.studentDisplayList.push(
        {
          id: student.id,
          name: student.name.concat(' ', student.surname)
        }),
        this.studentIdsList.push(student.id)
      });

      this.data.instructor.forEach(
        (instructor) => {
         this.instructorDisplayList.push(
         {
           id: instructor.id,
           name: instructor.name.concat(' ', instructor.surname)
         }),
         this.instructorIdsList.push(instructor.id)
       });

    this.students$ = this.studentService.getStudents().
      subscribe((data) => this.studentsSourceList = data);

    this.students$ = this.instructorService.getInstructors().
      subscribe( data => this.instructorsSourceList = data);
  }

  editLesson(lessonId, lesson){
    // override API payload becouse of data binding and to avoid displaying
    // text in instr/stud template input fields - TODO:switch to better solution ex. Dropdown
    lesson.student = this.studentIdsList;
    lesson.instructor = this.instructorIdsList;

    this.students$ = this.scheduleService.editLesson(lessonId, lesson).
    subscribe(
      data => (console.log('Success: ', data),
              this.dialogRef.close()),
      (error: HttpErrorResponse) => (console.log('Error: ', error)),
      () => this.scheduleService.scheduleSubject.next(null),
    );
  }
  exitDialog(){
    this.dialogRef.close();
  }
  ngOnDestroy(): void {
    this.students$.unsubscribe();
  }
}
