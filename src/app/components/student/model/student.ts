import { IStudentDetailResponse } from './../../../shared/API-response/IStudentResponse';
export class Student implements IStudentDetailResponse {

    constructor(
        public name:          string,
        public surname:       string,
        public email_address: string,
        public mobile_number: string,
        public birth_date:    string,
        public weight:        number,
        public wetsuit_size:  string,
        public harness_size:  string,
        public stay_location: string,
        public iko_id:        number,
        public iko_level:     string,
        public arrival_date:  string,
        public leave_date:    string,
        public comment:       string,
     ) { }
}
