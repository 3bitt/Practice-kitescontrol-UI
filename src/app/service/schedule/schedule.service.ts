import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';

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
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private baseUrl = "/api/"

  private _url: string          = "/api/custom?date=";
  private _createLesson: string = "/api/lessons/create/"
  private _deleteLesson: string = "/api/lessons/id/delete/"


  private refreshSchedule = new Subject<any>();

  get refreshFunc(){
    return this.refreshSchedule;
  }

  getInstructorsLessons(date: string){
    return this.http.get(this._url + date).
    pipe(
      catchError(this.handleError)
    );
  }

  createLesson(lesson){
    return this.http.post(this._createLesson, lesson).
    pipe(
      tap( () => {this.refreshSchedule.next()}),
      catchError(this.handleError)
    );;
  }

  deleteLesson(id: number){
    return this.http.delete<any>(this._deleteLesson.replace('id', id.toString())).
    pipe(
      catchError(this.handleError)
    );
  }

  reloadSchedule(date: string){
    this.refreshSchedule.next(date);
  }



}


