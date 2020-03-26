import { LessonService } from './../../../service/lesson/lesson.service';
import { Lesson } from './../model/lesson';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-lesson-add',
  templateUrl: './lesson-add.component.html',
  styleUrls: ['./lesson-add.component.css']
})
export class LessonAddComponent implements OnInit {

  constructor(
    private _lessonService: LessonService
  ) { }

  public formReady = false
  public formSubmitted = false
  newLesson: Lesson;
  public postSuccess = false;

  makeForm(form: NgForm){

    this.newLesson = new Lesson (
      form.value.duration,
      form.value.paid as boolean,
      new Array(form.value.student),
      new Array(form.value.instructor)
    );
      console.log(this.newLesson);
    }

  onSubmit(){
    this._lessonService.postLesson(this.newLesson).
    subscribe(
      data => (console.log('Success: ', data),
              this.formReady = false,
              this.formSubmitted = false,
              this.postSuccess = true),

      (error: HttpErrorResponse) => (console.log('Error: ', error),
                this.postSuccess=false
                ),
    )
  }

  ngOnInit(): void {
  }

}
