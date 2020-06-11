import { Component, OnInit, Optional, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-confirm-delete-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrls: ['./confirm-delete-dialog.component.css']
})
export class ConfirmDeleteDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any
    ) { }


  public context: string = '';


  confirmDelete(){
    this.dialogRef.close(
      {
      event:"Delete",
      data: this.dialogData.obj.id
      }
    );
  }

  cancelDelete(){
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.context = this.dialogData.context
  }

}
