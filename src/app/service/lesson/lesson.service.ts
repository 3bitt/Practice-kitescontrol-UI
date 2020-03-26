import { Lesson } from './../../components/lesson/model/lesson';
import { IpagingResponse } from 'src/app/models/response';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private baseUrl = "/api/"

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  private _getLessonURL: string = this.baseUrl + "lessons/"
  private _postLessonURL: string = this.baseUrl + "lessons/create/"
  // public lessons$

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  lessons$ = this.http.get<IpagingResponse>(this._getLessonURL)
    .pipe(
      catchError(this.handleError)
      );


  // getLessons(){
  //   return this.http.get<any>(this._getLessonURL)
  //     .pipe(
  //       catchError(this.handleError('getLessons', []))
  //     );
  // };

  getLessonById(id: Number): Observable<any>{
    let lessonId = `${this._getLessonURL}${id}/`
    return this.http.get<any>(lessonId)
      .pipe(
        catchError(this.handleError('getLessonById', []))
      );
  };


  postLesson(lesson: Lesson){
    return this.http.post<any>(this._postLessonURL, lesson);
  }
}
