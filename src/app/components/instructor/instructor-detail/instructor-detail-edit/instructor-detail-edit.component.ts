import { IInstructorDetailResponse } from './../../../../shared/API-response/IInstructorResponse';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-instructor-detail-edit',
  templateUrl: './instructor-detail-edit.component.html',
  styleUrls: ['./instructor-detail-edit.component.css']
})
export class InstructorDetailEditComponent implements OnInit {

  constructor() { }

  @Input() instructor: IInstructorDetailResponse;
  @Output() editInstructorEmitter = new EventEmitter<NgForm>();
  @Output() cancelEditEmitter = new EventEmitter<boolean>();

  print(editForm){
    console.log(editForm.value);

  }

  submitEditForm(editForm: NgForm){
    this.editInstructorEmitter.emit(editForm);
    this.editInstructorEmitter.unsubscribe();
  }

  cancelEdit(){
    this.cancelEditEmitter.emit(false);
    this.cancelEditEmitter.unsubscribe();

  }

  ngOnInit(): void {
  }

}

