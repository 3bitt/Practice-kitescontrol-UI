import { switchMap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IDetailResponse } from './../../../models/response';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { StudentService } from 'src/app/service/student/student.service';
import { Student } from '../model/student';
import { IIStudent } from '../model/student-interface';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit, OnDestroy {

  public student;
  private student$: Subscription;

  constructor(private _studentService: StudentService,
              private route: ActivatedRoute,
              private router: Router) { }


    ngOnInit(){
      this.student$ = this.route.paramMap.pipe(
        switchMap((params: ParamMap) =>
        this.student = this._studentService.getStudentById(+params.get('id')))
      ).subscribe(data => this.student = data);
    }


    ngOnDestroy(){
      this.student$.unsubscribe();
    }

  // ngOnInit() {
  //   // Get id from URL
  //   this.route.paramMap.subscribe((params: ParamMap) => {
  //     let id = parseInt(params.get('id'));
  //     this.studentId = id;
  //   })
  //   // Call API
  //   this._studentService.getStudentById(this.studentId)
  //   .subscribe((data: any) => { this.student = data
  //   }, err => {
  //     console.log(err);
  //   });
  // }

}
