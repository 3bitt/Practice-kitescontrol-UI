import { IpagingResponse } from './../../../models/response';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/service/student/student.service';
import { IStudentPagingResponse } from 'src/app/shared/API-response/IStudentResponse';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})

export class StudentListComponent implements OnInit, OnDestroy {

  public students: IStudentPagingResponse;
  public students$;
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
    this.students$ = this._studentService.getStudents()
    .subscribe((data) => { this.students = data,
      console.log(this.students$)
    }, err => {
      console.log('ERR:', err);
      });
    }

  deleteStudent(id: number){
    this.students$ = this._studentService.deleteStudent(id)
    .subscribe( (data) => { this.students.results = data;
      console.log(data);

    }, err => {
      console.log('ERR:', err);
    });

  }

    ngOnDestroy(){
      this.students$.unsubscribe();
    }

  }



  // Function used in template - place instructor.id in relative path /instructors/{id}
  // getInstructorDetails(student){
  //   this.router.navigate([student.id], {relativeTo: this.route})
  // }
