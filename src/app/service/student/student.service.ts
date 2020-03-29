import { Student } from './../../components/student/model/student';
import { IStudent } from './../../models/studentModel';
import { IpagingResponse, IDetailResponse } from './../../models/response';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IStudentPagingResponse, IStudentDetailResponse } from 'src/app/shared/API-response/IStudentResponse';

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


  private _getStudentURL: string = this.baseUrl + "students/?orderBy=register_date"
  private _getStudentByIdURL: string = this.baseUrl + "students/"
  private _postStudent: string = this.baseUrl + "students/create/"
  // private _deleteStudentURL: string = this.baseUrl + "students"

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getStudents(): Observable<IStudentPagingResponse>{
    return this.http.get<any>(this._getStudentURL)
      .pipe(
        catchError(this.handleError('getStudents', []))
      );
  };


  getStudentById(id: number | string): Observable<IStudentDetailResponse>{
    let studentId = `${this._getStudentByIdURL}${id}/`
    return this.http.get<any>(studentId)
      .pipe(
        catchError(this.handleError('getStudentById', []))
      );
  };

  postStudent(student: Student){
    return this.http.post<any>(this._postStudent, student);
  }

  deleteStudent(id: number){
    let studentId = `${this._getStudentByIdURL}${id}/delete/`
    return this.http.delete<any>(studentId)
  }
}
