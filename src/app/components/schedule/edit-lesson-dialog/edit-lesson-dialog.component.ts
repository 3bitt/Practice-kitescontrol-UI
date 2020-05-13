import { InstructorService } from 'src/app/service/instructor/instructor.service';
import { StudentService } from 'src/app/service/student/student.service';
import { Subscription } from 'rxjs';
import { IScheduleInstructor, Lesson } from './../model/schedule-interface';
import { Component, OnInit, ViewEncapsulation, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScheduleService } from 'src/app/service/schedule/schedule.service';
import { IStudentPagingResponse } from 'src/app/shared/API-response/IStudentResponse';
import { IInstructorPagingResponse } from 'src/app/shared/API-response/IInstructorResponse';

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

  editLesson(lesson){


  }

  ngOnDestroy(): void {
    this.students$.unsubscribe();
  }
}
