import { Subscription } from 'rxjs';
import { Component, OnInit, Input, OnDestroy, ElementRef } from '@angular/core';
import { ScheduleService } from 'src/app/service/schedule/schedule.service';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { ISchedule, IScheduleInstructor } from '../model/schedule-interface';


@Component({
  selector: 'app-schedule-lesson',
  templateUrl: './schedule-lesson.component.html',
  styleUrls: ['./schedule-lesson.component.css']
})
export class ScheduleLessonComponent implements OnInit, OnDestroy {

  constructor(
    private scheduleService: ScheduleService
  ) { }

  public subscription$: Subscription;
  @Input() instructor: IScheduleInstructor;



  faCheck = faCheckCircle;

  ngOnInit(): void {
  }


  showLessonActionsMenu(elementRef: HTMLElement){
    if (elementRef.classList.contains('clicked')){
      elementRef.style['visibility']='hidden';
      elementRef.classList.remove('clicked');
      elementRef.parentElement.style.backgroundColor = 'transparent';
    } else {
      elementRef.style['visibility']='visible';
      elementRef.classList.add('clicked');
      elementRef.parentElement.style.backgroundColor = '#baa8fa';
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

  ngOnDestroy(){
    if (this.subscription$){
      this.subscription$.unsubscribe();
    }
  }

}
