import { IStudentDetailResponse } from './../../../shared/API-response/IStudentResponse';
import { switchMap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IDetailResponse } from './../../../models/response';
import { Component, OnInit, OnDestroy, OnChanges, DoCheck } from '@angular/core';
import { StudentService } from 'src/app/service/student/student.service';
import { Student } from '../model/student';
import { IIStudent } from '../model/student-interface';
import { Form, NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit, OnDestroy, DoCheck {

  public student: IStudentDetailResponse;
  private student$: Subscription;

  editMode = false;
  editSuccess = false;

  constructor(private _studentService: StudentService,
              private route: ActivatedRoute,
              private router: Router) { }


    ngOnInit(){
      this.student$ = this.route.paramMap.pipe(
        switchMap((params: ParamMap) =>
        this._studentService.getStudentById(+params.get('id')))
      ).subscribe(data => this.student = data);
    }

    showEdit(){
      this.editMode = true;
    }

    onReceiveEditForm(event: NgForm, studentId?: number){
      this.student$ = this._studentService.putStudent(this.student.id, event.value).
      subscribe(
        data => (console.log('Success: ', data),
                this.editMode = false,
                this.editSuccess = true),

        (error: HttpErrorResponse) => (console.log('Error: ', error),
                  this.editSuccess=false
                  ),
      );
    }

    ngDoCheck(){
      if (this.editSuccess){
        this.student$ = this._studentService.getStudentById(this.student.id).
        subscribe(data => this.student = data);

        this.editSuccess = false;
      }

    }

    ngOnDestroy(){
      this.student$.unsubscribe();
    }


}
