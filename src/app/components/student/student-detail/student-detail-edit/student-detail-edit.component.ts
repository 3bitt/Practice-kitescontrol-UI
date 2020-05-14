import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Form, NgForm } from '@angular/forms';

@Component({
  selector: 'app-student-detail-edit',
  templateUrl: './student-detail-edit.component.html',
  styleUrls: ['./student-detail-edit.component.css']
})
export class StudentDetailEditComponent implements OnInit {

  constructor() { }

  @Input() student;
  @Output() editStudentEmitter = new EventEmitter<NgForm>();
  @Output() cancelEditEmitter = new EventEmitter<boolean>();

  print(editForm){
    console.log(editForm.value);

  }

  submitEditForm(editForm: NgForm){
    this.editStudentEmitter.emit(editForm);
    this.editStudentEmitter.unsubscribe();
  }

  cancelEdit(){
    this.cancelEditEmitter.emit(false)

  }

  ngOnInit(): void {
  }

}
