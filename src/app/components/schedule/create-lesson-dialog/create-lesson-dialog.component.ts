import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScheduleService } from 'src/app/service/schedule/schedule.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-lesson-dialog',
  templateUrl: './create-lesson-dialog.component.html',
  styleUrls: ['./create-lesson-dialog.component.css']
})
export class CreateLessonDialogComponent implements OnInit {

  // currentDate = new Date().toISOString().slice(0, 10);

  constructor(
    public dialogRef: MatDialogRef<CreateLessonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private scheduleService: ScheduleService
  ) { }


  private sub;
  ngOnInit(): void {

  }

  onClickDialog(lessonForm){
    console.log(lessonForm.value);

  }

  createLesson(lesson){
    this.sub = this.scheduleService.createLesson(lesson.value).
    subscribe(
      data => (console.log('CREATED:', data),

      (error: HttpErrorResponse) => (console.log('Error: ', error)
      ))
    );
    setTimeout(() => this.sub.unsubscribe(), 3000);
  };

}
