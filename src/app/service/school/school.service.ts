import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

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


  private instructorHours = '/api/instructors/hours?startDate=P1&endDate=P2';



  getInstructorHours(startDate, endDate){
    let url = this.instructorHours.replace('P1',startDate)
    url = url.replace('P2',endDate)
    return this.http.get(url).
    pipe(
      // tap( () => {this.refreshSchedule.next()}),
      catchError(this.handleError)
    );;

  }

}
