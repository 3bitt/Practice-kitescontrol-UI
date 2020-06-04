import { IStudentDetailResponse } from './../../../shared/API-response/IStudentResponse';
import { StudentService } from 'src/app/service/student/student.service';
import { Student } from './../model/student';
import { IStudent } from './../../../models/studentModel';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { NgClass, formatDate, getLocaleDateFormat } from '@angular/common';
import { format } from 'util';
import { Observable, Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NONE_TYPE } from '@angular/compiler';

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

  stud: IStudentDetailResponse;

  public postSuccess = false;

  makeForm(form: NgForm){

    // Order of fields matters
    this.newStudent = new Student (
      form.value.firstName,
      form.value.lastName,
      form.value.emailAddress ? form.value.emailAddress : null,
      form.value.mobile,
      form.value.birthDate,
      form.value.weight ? form.value.weight : null,
      form.value.wetsuitSize ? form.value.wetsuitSize : null,
      form.value.harnessSize ? form.value.harnessSize : null,
      form.value.stayLocation ? form.value.stayLocation : null,
      form.value.iko_id ? form.value.iko_id : null,
      form.value.ikoLevel ? form.value.ikoLevel : '1A',
      form.value.arrivalDate ? form.value.arrival_date : null,
      form.value.leaveDate ? form.value.leave_date : null,
      form.value.comment ? form.value.comment : null
    );
    console.log(form.value);

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
