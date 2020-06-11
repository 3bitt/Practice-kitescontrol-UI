import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScheduleService } from 'src/app/service/schedule/schedule.service';
import { StudentService } from 'src/app/service/student/student.service';

@Component({
  selector: 'app-finish-lesson-dialog',
  templateUrl: './finish-lesson-dialog.component.html',
  styleUrls: ['./finish-lesson-dialog.component.css']
})
export class FinishLessonDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FinishLessonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private scheduleService: ScheduleService,
    private studentService: StudentService,) { }

  showTimeChange: boolean = false;

  studentUpdateList = [ ];
  lessonNewDuration = {
    duration: undefined,
    status: this.dialogData.lesson.status.concat('F')
   };

  ngOnInit(): void {
    for(let student of this.dialogData.lesson.student){
      this.studentUpdateList.push(
        {
          id: student.id,
          new_level: {'iko_level': student.iko_level}
      });
    };
  }

  cancel(){
    this.dialogRef.close()
  }
  changeLevel(event, student){
      for(let s of this.studentUpdateList){
        if(s.id === student.id ){
          s.new_level = {'iko_level': event.target.value}
        }
      }
  }

  changeTime(event){
    this.lessonNewDuration.duration = event.target.value
    console.log(this.lessonNewDuration);
  }

  submit(){
    this.dialogRef.close(
      {
        studentList: this.studentUpdateList,
        lessonUpdatePayload: this.lessonNewDuration
      }
    );
  }


}
