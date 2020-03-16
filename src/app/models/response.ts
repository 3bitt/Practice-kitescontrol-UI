import { IStudent } from './studentModel';
import { IInstructor } from './instructorModel';

export interface IpagingResponse {
    count: Number,
    next: String,
    previous: String,
            
    results: any[],
};

export interface IgetInstructorByIdResponse{
        id: Number, 
        name: String,
        surname: String,
        birth_date: Date,
        weight: Number,
      
};


export interface IgetStudentListResponse {
    count: Number,
    next: String,
    previous: String,
            
    results: IStudent[],
};


export interface IgetStudentByIdResponse{
    id: Number, 
    name: String,
    surname: String,
    birth_date: Date,
    weight: Number,
    register_date: Date,
  
};