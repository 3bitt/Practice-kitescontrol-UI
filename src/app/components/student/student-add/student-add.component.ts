import { Student } from './../model/student';
import { IStudent } from './../../../models/studentModel';
import { Component, OnInit } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { NgClass, formatDate, getLocaleDateFormat } from '@angular/common';
import { format } from 'util';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {


  // abc = new Date().toISOString().split('T')[0];

 student = new Student('Alicja','Dobrzynska', '25-09-1990', 68);
  


  submitted = false

  onSubmit(form: NgForm){ this.submitted = true; console.log('New Student--- \n', form.value);}

  newStudent(){
    console.log('New Student--- \n', this.student); 
  }

  constructor() { }

  ngOnInit() {
  }

}
