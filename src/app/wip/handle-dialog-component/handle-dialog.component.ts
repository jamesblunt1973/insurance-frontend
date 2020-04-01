import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IHandlePrescriptionDialogData } from '../../shared/models/handle-prescription-dialog-data.model';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './handle-dialog.component.html',
  styleUrls: ['./handle-dialog.component.scss']
})
export class HandleDialogComponent {

  constructor(public dialogRef: MatDialogRef<HandleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IHandlePrescriptionDialogData) { }

  model = {
    list: [],
    description: ''
  };

  ngOnInit() {
    console.log(this.data);
  }

}
