import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../../../environments/environment';
import { IPrescription } from '../../models/prescription.model';
import { GetStateTitle } from '../../models/status.enum';
import { PictureDialogComponent } from '../picture-dialog/picture-dialog.component';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss']
})
export class PrescriptionComponent implements OnInit {

  @Input() prescription: IPrescription;
  @Input() commands: boolean = false;
  @Input() busy: boolean = false;
  @Output() confirm = new EventEmitter();
  @Output() reject = new EventEmitter();
  @Output() completion = new EventEmitter();
  @Output() expand = new EventEmitter();

  imagePath = environment.apiUrl + 'prescription/img/';

  constructor(private dialog: MatDialog) { }

  getStateTitle = state => GetStateTitle(state);

  ngOnInit() {
  }

  showImage(src) {
    this.dialog.open(PictureDialogComponent, {
      data: src
    });
  }

  getMedicines(json) {
    return JSON.parse(json).map(a => a.drugName);
  }

}
