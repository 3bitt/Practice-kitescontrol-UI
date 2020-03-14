import { IInstructor } from './instructorModel';

export interface IpagingResponse {
    count: Number;
    next: String;
    previous: String;
            
    results: IInstructor[];
};

export interface IgetInstructorByIdResponse{
        id: Number, 
        name: String,
        surname: String,
        birth_date: Date,
        weight: Number,
      
};