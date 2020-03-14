import { IpagingResponse } from '../../models/response';
import { IInstructor } from '../../models/instructorModel';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  private baseUrl = "/api/"

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }



  private _getInstructorURL: string = this.baseUrl + "instructors/"

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  getInstructors(): Observable<any[]>{
    return this.http.get<any[]>(this._getInstructorURL)
      .pipe(
        catchError(this.handleError('getInstructors', []))
      );
  };

  getInstructorById(id: Number): Observable<any>{
    let instructorId = `${this._getInstructorURL}${id}`
    return this.http.get<any>(instructorId)
      .pipe(
        catchError(this.handleError('getInstructorById', []))
      );
  };
}

