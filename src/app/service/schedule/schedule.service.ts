import { Lesson } from './../../components/schedule/model/schedule-interface';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }


  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error('Error from schedule service handler', error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private baseUrl = "/api/"

  private _url:           string = "/api/custom?date=";
  private _createLesson:  string = "/api/lessons/create/";
  private _deleteLesson:  string = "/api/lessons/id/delete/";
  private _editLesson:    string = '/api/lessons/id/update/';



  public scheduleSubject = new BehaviorSubject(null);
  subject$ = this.scheduleSubject.asObservable();


  getInstructorsLessons(date: string){
    return this.http.get(this._url + date).
    pipe(
      catchError(this.handleError)
    );
  }

  createLesson(lesson){
    return this.http.post(this._createLesson, lesson).
    pipe(
      // tap( () => {this.refreshSchedule.next()}),
      catchError(this.handleError)
    );;
  }

  deleteLesson(id: number){
    return this.http.delete<any>(this._deleteLesson.replace('id', id.toString())).
    pipe(
      catchError(this.handleError)
    );
  }

  editLesson(id: number|string, lesson: Lesson){
    let url = this._editLesson.replace('id', id.toString());
    return this.http.put<any>(url, lesson);
  }

  patchLesson(id: number|string, lesson){
    let url = this._editLesson.replace('id', id.toString());
    return this.http.patch<any>(url, lesson);
  }

  reloadSchedule(date: string){
    this.scheduleSubject.next(date);
  }



}


