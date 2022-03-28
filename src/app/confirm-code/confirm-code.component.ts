import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-code',
  templateUrl: './confirm-code.component.html',
  styleUrls: ['./confirm-code.component.scss'],
})
export class ConfirmCodeComponent implements OnInit {
  code: any;
  email: any;
  constructor(public dialogRef: MatDialogRef<ConfirmCodeComponent>,) {}

  ngOnInit(): void {}

  confirm(){
    this.dialogRef.close({event:'Cancel',data:{code:this.code,email:this.email}});
  }

  onNoClick(): void {
    this.dialogRef.close({event:'Cancel'});
  }

}
