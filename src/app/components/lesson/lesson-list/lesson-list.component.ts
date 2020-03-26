import { map, catchError } from 'rxjs/operators';
import { Observable, Subscription, of } from 'rxjs';
import { IpagingResponse } from 'src/app/models/response';
import { LessonService } from './../../../service/lesson/lesson.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.css']
})
export class LessonListComponent implements OnInit, OnDestroy {

  constructor(
    private _lessonService: LessonService
  ) { }

  public lessons: IpagingResponse;
  public lessons$: Observable<IpagingResponse>;

  public errorMessage;

  // ngOnInit() {
  //   this.lessons$ = this._lessonService.getLessons()
  //   .subscribe((data) => { this.lessons = data; console.log(this.lessons);
  //   },
  //   err => { console.log('ERR', err) });
  // }


// Using async in template
  ngOnInit(){
    this.lessons$ = this._lessonService.lessons$
    .pipe(
      catchError(error => {
        this.errorMessage = error;
        return of(null);
      })
    )

  }


  ngOnDestroy(){
    // this.lessons$.unsubscribe();
  }
}
