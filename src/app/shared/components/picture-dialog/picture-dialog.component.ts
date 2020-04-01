import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-picture-dialog',
  templateUrl: './picture-dialog.component.html',
  styleUrls: ['./picture-dialog.component.scss']
})
export class PictureDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PictureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
  }

}
