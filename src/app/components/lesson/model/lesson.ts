import { Instructor } from './../../instructor/model/instructor';
import { Student } from './../../student/model/student';
export class Lesson {

  constructor(
      public duration: string,
      public paid: boolean,
      public student: Student[],
      public instructor: Instructor[],
   ) { }
}
