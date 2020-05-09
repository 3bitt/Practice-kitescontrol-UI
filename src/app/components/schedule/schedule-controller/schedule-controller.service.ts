import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScheduleControllerService {

  constructor() { }


  observer = new Subject();


  onLessonAdd(){
    this.observer.next('triggered');
  }

}
