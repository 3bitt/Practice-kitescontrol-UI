import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Instructor } from '../model/instructor';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { InstructorService } from 'src/app/service/instructor/instructor.service';


@Component({
  selector: 'app-instructor-add',
  templateUrl: './instructor-add.component.html',
  styleUrls: ['./instructor-add.component.css']
})
export class InstructorAddComponent implements OnDestroy {

  constructor(private _instructorService: InstructorService,
              private route: ActivatedRoute,
              private router: Router) { }

  public formReady = false
  public formSubmitted = false
  newInstructor: Instructor;
  newInstructor$: Subscription;

  public postSuccess = false;

  makeForm(form: NgForm){

    this.newInstructor = new Instructor (
      form.value.firstName,
      form.value.lastName,
      form.value.birthDate,
      form.value.weight
    );
      console.log(this.newInstructor);
    }

  onSubmit(){
    this.newInstructor$ = this._instructorService.postInstructor(this.newInstructor)
    .subscribe(
      data => (console.log('Success: ', data),
              this.postSuccess = true,
              this.formReady = false,
              this.formSubmitted = false),

      (error: HttpErrorResponse) => (console.log('Error: ', error),
                this.postSuccess=false
                ),
    );
  }

  ngOnDestroy(){
    if (this.newInstructor$){
      this.newInstructor$.unsubscribe();
    }
  }

}
