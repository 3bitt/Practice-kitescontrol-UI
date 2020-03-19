import { StudentService } from 'src/app/service/student/student.service';
import { Student } from './../model/student';
import { IStudent } from './../../../models/studentModel';
import { Component, OnInit } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { NgClass, formatDate, getLocaleDateFormat } from '@angular/common';
import { format } from 'util';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {

  constructor(private _studentService: StudentService) {  }

  public formReady = false
  public formSubmitted = false
  newStudent: Student;

  public postError = false;

  makeForm(form: NgForm){

    this.newStudent = new Student (
      form.value.firstName,
      form.value.lastName,
      form.value.birthDate,
      form.value.weight
    );
      console.log(this.newStudent);
    }

    onSubmit(student: Student){
      this._studentService.postStudent(this.newStudent).
      subscribe(
        data => (console.log('Success: ', data),
                this.postError=false),
        (error: HttpErrorResponse) => (console.log('Error: ', error),
                  this.postError=true
                  ),
      )
    } 
    
  
  ngOnInit() {
  }
}
