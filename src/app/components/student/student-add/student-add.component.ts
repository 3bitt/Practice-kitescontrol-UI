import { StudentService } from 'src/app/service/student/student.service';
import { Student } from './../model/student';
import { IStudent } from './../../../models/studentModel';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { NgClass, formatDate, getLocaleDateFormat } from '@angular/common';
import { format } from 'util';
import { Observable, Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit, OnDestroy {

  constructor(private _studentService: StudentService) {  }

  public formReady = false
  public formSubmitted = false
  newStudent: Student;
  newStudent$: Subscription;

  public postSuccess = false;

  makeForm(form: NgForm){

    this.newStudent = new Student (
      form.value.firstName,
      form.value.lastName,
      form.value.birthDate,
      form.value.weight
    );
      console.log(this.newStudent);
    }

    onSubmit(){
      this.newStudent$ = this._studentService.postStudent(this.newStudent).
      subscribe(
        data => (console.log('Success: ', data),
                this.formReady = false,
                this.formSubmitted = false,
                this.postSuccess = true),

        (error: HttpErrorResponse) => (console.log('Error: ', error),
                  this.postSuccess=false
                  ),
      );
    }


  ngOnInit() {
  }

  ngOnDestroy(){
    if (this.newStudent$){
      this.newStudent$.unsubscribe();
    }

  }
}
