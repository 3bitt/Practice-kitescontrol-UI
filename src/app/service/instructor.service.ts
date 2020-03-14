import { IgetResponse } from './../models/response';
import { IInstructor } from './../models/instructorModel';
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

  private _url: string = this.baseUrl + "instructors/"

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

// Extract HttpClient into seperate file



  // getInstructors(): Observable<IgetResponse>{
  //   return this.http.get<IgetResponse>(this._url)
  // };

  getInstructors(): Observable<any[]>{
    return this.http.get<any[]>(this._url)
      .pipe(
        tap(instr => console.log('pipe call - tap - instr...')),
        catchError(this.handleError('getInstructors', []))
      );
  };
}

