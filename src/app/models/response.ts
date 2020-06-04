import { IStudent } from './studentModel';
import { IInstructor } from './instructorModel';

export interface IpagingResponse extends Array<any> {
  count: number,
  next: string,
  previous: String,

  results: any[],
};

export interface IDetailResponse {
  id: number,
  name: string,
  surname: string,
  birth_date: string,
  weight: number,
  register_date?: Date
}

// export interface IgetInstructorByIdResponse{
//         id: number,
//         name: string,
//         surname: string,
//         birth_date: Date,
//         weight: number,

// };


// export interface IgetStudentListResponse {
//     count: Number,
//     next: String,
//     previous: String,

//     results: IStudent[],
// };


// export interface IgetStudentByIdResponse{
//     id: Number,
//     name: String,
//     surname: String,
//     birth_date: Date,
//     weight: Number,
//     register_date: Date,

// };
