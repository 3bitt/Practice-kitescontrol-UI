import { IpagingResponse, IDetailResponse } from './../../../models/response';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Instructor } from '../model/instructor';


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
  private _postInstructor: string = this.baseUrl + "instructors/create/"


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };


  getInstructors() {
    return this.http.get<IpagingResponse>(this._getInstructorURL)
      .pipe(
        catchError(this.handleError)
      );
  };

  getInstructorById(id: number | string): Observable<any>{
    let instructorId = `${this._getInstructorURL}${id}/`
    return this.http.get<IDetailResponse>(instructorId)
      .pipe(
        catchError(this.handleError)
      );
  };

  postInstructor(instructor: Instructor): Observable<Instructor>{
    return this.http.post<Instructor>(this._postInstructor, instructor)
    .pipe(catchError(this.handleError))
  };
}

