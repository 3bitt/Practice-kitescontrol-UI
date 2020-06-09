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


  private _getStudentURL: string = this.baseUrl + "students/?orderBy=register_date";
  private _getStudents: string = this.baseUrl + "students/";
  private _postStudent: string = this.baseUrl + "students/create/";
  private _putStudent: string = this.baseUrl + "students/id/update/";
  // private _deleteStudentURL: string = this.baseUrl + "students"

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getStudents(): Observable<IStudentPagingResponse | any>{
    return this.http.get<any>(this._getStudentURL)
      .pipe(
        catchError(this.handleError('getStudents', []))
      );
  };

  getStudentsPostMethod(payload): Observable<any>{
    return this.http.post<any>(this._getStudents, payload).
    pipe(
      catchError(this.handleError('getStudentsPostMethod', []))
    )
  }


  getStudentById(id: number | string): Observable<IStudentDetailResponse>{
    let studentId = `${this._getStudents}${id}/`
    return this.http.get<any>(studentId)
      .pipe(
        catchError(this.handleError('getStudentById', []))
      );
  };

  postStudent(student: Student){
    return this.http.post<any>(this._postStudent, student);
  }

  deleteStudent(id: number){
    let studentId = `${this._getStudents}${id}/delete/`
    return this.http.delete<any>(studentId)
  }


  putStudent(id: number|string, student: Student){
    let url = this._putStudent.replace('id', id.toString());
    return this.http.put<any>(url, student);
  }

  patchStudent(id: number|string, student: Student){
    let url = this._putStudent.replace('id', id.toString());
    return this.http.patch<any>(url, student);
  }
}
