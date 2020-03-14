import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl = "/api/"

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }


  private _getStudentURL: string = this.baseUrl + "students/"

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  getStudents(): Observable<any[]>{
    return this.http.get<any[]>(this._getStudentURL)
      .pipe(
        catchError(this.handleError('getStudents', []))
      );
  };

  getStudentById(id: Number): Observable<any>{
    let studentId = `${this._getStudentURL}${id}`
    return this.http.get<any>(studentId)
      .pipe(
        catchError(this.handleError('getStudentById', []))
      );
  };
}