import { Lesson } from './../../components/lesson/model/lesson';
import { IpagingResponse } from 'src/app/models/response';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ILessonPagingResponse } from 'src/app/shared/API-response/ILessonResponse';




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


  lessons$ = this.http.get<ILessonPagingResponse>(this._getLessonURL)
    .pipe(
      catchError(this.handleError)
      );

  getLessons(): Observable<ILessonPagingResponse>{
    return this.http.get<any>(this._getLessonURL + '?orderBy=date')
      .pipe(
        catchError(this.handleError('getLessons', []))
      );
  };

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

  // TODO: To be implemented

  // putInstructor(id: number|string, student: Instructor){
  //   let url = this._putInstructor.replace('id', id.toString());
  //   return this.http.put<any>(url, student);
  // }

  // patchInstructor(id: number|string, student: Instructor){
  //   let url = this._putInstructor.replace('id', id.toString());
  //   return this.http.patch<any>(url, student);
  // }
}
