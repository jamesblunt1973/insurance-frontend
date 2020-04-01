import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DataService } from '../../core/data.service';
import { AutoUnsubscribe } from '../../shared/auto-unsubscribe';
import { IPharmacy } from '../../shared/models/pharmacy.model';
import { IPrescriptionFilter } from '../../shared/models/prescription-filter.model';
import { IPrescription } from '../../shared/models/prescription.model';
import * as State from '../../shared/models/status.enum';
import { startWith, map } from 'rxjs/operators';
import { PictureDialogComponent } from 'src/app/shared/components/picture-dialog/picture-dialog.component';

@AutoUnsubscribe
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  loading: boolean = false;

  prescriptions: Array<IPrescription> = [];
  subscriptions: Subscription[] = [];

  counts: number[] = [10];
  totalCount: number = 0;
  countPerPage: number = this.counts[0];
  currentPage: number = 1;

  stateTitles = State.GetStateTitle;
  filterForm = new FormGroup({
    pharmacy: new FormControl(),
    state: new FormControl(),
    dateFrom: new FormControl(),
    dateTo: new FormControl(),
    code: new FormControl()
  });

  pharmacies: Array<IPharmacy> = [];
  filteredPharmacies: Observable<IPharmacy[]>;

  constructor(private dataService: DataService, private dialog: MatDialog) { }

  ngOnInit() {

    this.loading = true;
    let sub = this.dataService.getPharmacies().subscribe(res => {
      this.loading = false;
      this.pharmacies = res.filter(a => a.active);
    });
    this.subscriptions.push(sub);

    this.filteredPharmacies = this.filterForm.get('pharmacy').valueChanges
      .pipe(
        startWith(''),
        map(value => {
          return this.pharmacies.filter(a => a.name.includes(value))
        })
      );

    // this.getReport(1);
  }

  getPharmacyName(pharmacy?: IPharmacy): string | undefined {
    return pharmacy ? pharmacy.name : undefined;
  }

  checkLTR(ch: number) {
    if ((ch >= 65 && ch <= 90) || (ch >= 97 && ch <= 122))
      return 'latin-text';
    return '';
  }

  expandPanel(p: IPrescription) {
    var expand = p.expand;
    this.prescriptions.map(a => {
      a.expand = false;
    });
    if (!expand)
      p.expand = true;
  }

  getReport(pageNum: number) {
    let formValue = this.filterForm.value;
    let dateFrom: Date = null, dateTo: Date = null;

    // we should send date as GMT, but date picker format is UTC
    if (formValue.dateFrom) { // UTC to GMT
      const d = new Date(formValue.dateFrom);
      const t = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
      dateFrom = new Date(t);
    }

    if (formValue.dateTo) { // UTC to GMT
      const d = new Date(formValue.dateTo);
      const t = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
      dateTo = new Date(t);
    }

    let filterModel: IPrescriptionFilter = {
      pharmacyId: formValue.pharmacy ? +formValue.pharmacy.id : null,
      endDate: dateTo,
      startDate: dateFrom,
      stateList: formValue.state ? [+formValue.state] : [],
      page: pageNum,
      trackCode: formValue.code ? formValue.code : ''
    };
    this.loading = true;
    this.prescriptions = [];

    let sub = this.dataService.getPrescriptions(filterModel).subscribe(data => {
      this.loading = false;
      this.prescriptions = data;
      if (this.prescriptions.length > 0)
        this.totalCount = this.prescriptions[0].totalCount;
      else
        this.totalCount = 0;
    });
    this.subscriptions.push(sub);
  }

}
