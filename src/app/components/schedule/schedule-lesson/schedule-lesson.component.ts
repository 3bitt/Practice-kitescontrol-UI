import { Subscription } from 'rxjs';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ScheduleService } from 'src/app/service/schedule/schedule.service';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-schedule-lesson',
  templateUrl: './schedule-lesson.component.html',
  styleUrls: ['./schedule-lesson.component.css']
})
export class ScheduleLessonComponent implements OnInit, OnDestroy {

  constructor(
    private scheduleService: ScheduleService
  ) { }

  private subscription$: Subscription;
  @Input() instructor



  faCheck = faCheckCircle;

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.subscription$.unsubscribe();
  }

  lessonAction(lesson){
    if (lesson['clicked'] == undefined || lesson['clicked'] == false){
      lesson['clicked'] = true
    } else {
      lesson['clicked'] = false
    }
  }

  deleteLesson(id: number){
    console.log(id);

    this.subscription$ = this.scheduleService.deleteLesson(id)
    .subscribe( (data) => {console.log(data);
    }, err => {
      console.log('ERR:', err);
    });

  }

}
