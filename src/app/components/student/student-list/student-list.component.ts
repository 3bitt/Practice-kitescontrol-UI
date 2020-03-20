import { JsonPipe } from '@angular/common';
import { IStudent } from './../../../models/studentModel';
import { IpagingResponse, IgetStudentListResponse } from './../../../models/response';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/service/student/student.service';
import { Subject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, toArray } from 'rxjs/operators';
import { SelectorMatcher } from '@angular/compiler';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})

export class StudentListComponent implements OnInit {

  public students;
  public searchList = [];
  public searchValue = '';

  constructor(private _studentService: StudentService,
              private router: Router,
              private route: ActivatedRoute,
              ) { }
    

  public search(term: string){
    let regexp = new RegExp(term, 'gi')
    if (!term.trim()){
      this.searchList=[]
    } else {
    this.searchList = this.students.results
      .filter(e => e.surname.match(regexp) || e.name.match(regexp));
    }
  }


  ngOnInit() {
    this._studentService.getStudents()
    .subscribe((data) => { this.students = data
    }, err => {
      console.log('ERR:', err);
      });
    }


  }



  // Function used in template - place instructor.id in relative path /instructors/{id}
  // getInstructorDetails(student){
  //   this.router.navigate([student.id], {relativeTo: this.route})
  // }
