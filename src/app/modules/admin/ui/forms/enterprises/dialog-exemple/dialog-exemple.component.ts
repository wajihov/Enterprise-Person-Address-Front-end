import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetEnterpriseComponent } from '../get-enterprise/get-enterprise.component';

@Component({
  selector: 'app-dialog-exemple',
  templateUrl: './dialog-exemple.component.html',
  styleUrls: ['./dialog-exemple.component.scss']
})
export class DialogExempleComponent implements OnInit {

  title: string;
  message: string;
  
  constructor(public dialogRef: MatDialogRef<GetEnterpriseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title;
    this.message = data.message;
  }

  ngOnInit(): void {
  }
  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }

}


export class ConfirmDialogModel {
  constructor(public title: string, public message: string) {
  }
}
