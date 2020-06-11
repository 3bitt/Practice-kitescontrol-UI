import { map, catchError } from 'rxjs/operators';
import { Observable, Subscription, of } from 'rxjs';
import { IpagingResponse } from 'src/app/models/response';
import { LessonService } from './../../../service/lesson/lesson.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ILessonPagingResponse } from 'src/app/shared/API-response/ILessonResponse';

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.css']
})
export class LessonListComponent implements OnInit, OnDestroy {

  constructor(
    private _lessonService: LessonService
  ) { }

  public lessons: ILessonPagingResponse;
  public lessons$: Subscription;

  public errorMessage;

  ngOnInit() {
    this.lessons$ = this._lessonService.getLessons()
    .subscribe((data) => { this.lessons = data;
    },
    err => { console.log('ERR', err) });
  }


// // Using async in template
//   ngOnInit(){
//     this.lessons$ = this._lessonService.lessons$
//     .pipe(
//       catchError(error => {
//         this.errorMessage = error;
//         return of(null);
//       })
//     );

//   }


  ngOnDestroy(){
    this.lessons$.unsubscribe();
  }
}
