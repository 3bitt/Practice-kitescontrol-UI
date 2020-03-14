import { IInstructor } from './instructorModel';

export interface IgetResponse {
    count: Number;
    next: String;
    previous: String;
            
    results: IInstructor[];
}