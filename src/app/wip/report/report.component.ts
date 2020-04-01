import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { DataService } from '../../core/data.service';
import { AutoUnsubscribe } from '../../shared/auto-unsubscribe';
import { AlertDialogComponent } from "../../shared/components/alert-dialog/alert-dialog.component";
import { ConfirmDialogComponent } from "../../shared/components/confirm-dialog/confirm-dialog.component";
import { ICategory } from '../../shared/models/category.model';
import { IHandlePrescriptionDialogData } from '../../shared/models/handle-prescription-dialog-data.model';
import { IPrescriptionFilter } from '../../shared/models/prescription-filter.model';
import { IPrescription } from '../../shared/models/prescription.model';
import { PrescriptionState } from '../../shared/models/status.enum';
import { HandleDialogComponent } from '../handle-dialog-component/handle-dialog.component';
import { IRejectPrescriptionData } from '../../shared/models/reject-prescription-data.model';
import { ICompletePrescriptionData } from '../../shared/models/complete-prescription-data.model';

@AutoUnsubscribe
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit, OnDestroy {

  loading: boolean = false;
  actionLoading: boolean = false;

  prescriptions: IPrescription[] = [];
  categories: ICategory[] = [];
  subscriptions: Subscription[] = [];

  counts: number[] = [10];
  totalCount: number = 0;
  countPerPage: number = this.counts[0];
  currentPage: number = 1;
  startIndex: number = 0;
  endIndex: number = this.countPerPage;

  constructor(private dataService: DataService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getCategories();
    this.getData();
  }

  ngOnDestroy() {

  }

  getData() {
    let filterModel: IPrescriptionFilter = {
      pharmacyId: null,
      endDate: null,
      startDate: null,
      stateList: [PrescriptionState.InProgress, PrescriptionState.UserCompleted],
      page: 1,
      trackCode: ''
    };
    this.loading = true;
    this.prescriptions = [];
    this.totalCount = 0;

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

  getCategories() {
    let sub = this.dataService.getCategories().subscribe(res => {
      this.categories = res;
    });
    this.subscriptions.push(sub);
  }

  checkLTR(ch: number) {
    if ((ch >= 65 && ch <= 90) || (ch >= 97 && ch <= 122))
      return 'latin-text';
    return '';
  }

  changePage(e: number) {
    this.currentPage = e;
    this.calculateBoundaries();
  }

  changeCount(e: number) {
    this.countPerPage = e;
    this.currentPage = 1;
    this.calculateBoundaries();
  }

  calculateBoundaries() {
    this.startIndex = (this.currentPage - 1) * this.countPerPage;
    this.endIndex = this.currentPage * this.countPerPage;
  }

  expandPanel(p: IPrescription) {
    var expand = p.expand;
    this.prescriptions.map(a => {
      a.expand = false;
    });
    if (!expand)
      p.expand = true;
  }

  confirmPrescription(prescription: IPrescription) {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        title: '',
        message: 'نسخه مورد نظر تایید شود؟',
        okText: 'بله',
        cancelText: 'خیر'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.actionLoading = true;
        let sub = this.dataService.confirmPrescription(prescription).subscribe(res => {
          var index = this.prescriptions.findIndex(a => a.id === prescription.id);
          this.prescriptions.splice(index, 1);
          this.actionLoading = false;
        }, error => {
          this.actionLoading = false;
          this.dialog.open(AlertDialogComponent, {
            width: '300px',
            maxWidth: '600px',
            data: {
              icon: 'errorIcon',
              message: JSON.stringify(error.errors),
              title: 'خطا به هنگام تایید نسخه',
              iconColor: '#c00'
            }
          })
        });
        this.subscriptions.push(sub);
      }
    });
  }

  rejectPrescription(prescription: IPrescription) {
    let reasons: string[] = [];

    if (prescription.categoryId) {
      let category = this.categories.find(a => a.id === prescription.categoryId);
      if (category)
        reasons = category.RejectItems;
    }

    let data: IHandlePrescriptionDialogData = {
      title: 'رد نسخه',
      list: reasons
    }

    const dialogRef = this.dialog.open(HandleDialogComponent, {
      minWidth: '300px',
      data: data
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let model: IRejectPrescriptionData = {
          description: result.description,
          rejectItems: result.list
        };
        this.actionLoading = true;
        let sub = this.dataService.denyPrescription(prescription, model).subscribe(res => {
          var index = this.prescriptions.findIndex(a => a.id === prescription.id);
          this.prescriptions.splice(index, 1);
          this.actionLoading = false;
        }, error => {
          this.actionLoading = false;
          this.dialog.open(AlertDialogComponent, {
            width: '300px',
            maxWidth: '600px',
            data: {
              icon: 'errorIcon',
              message: JSON.stringify(error.errors),
              title: 'خطا به هنگام رد نسخه',
              iconColor: '#c00'
            }
          })
        });
        this.subscriptions.push(sub);
      }
    });
  }

  completionRequest(prescription: IPrescription) {
    let reasons: string[] = [];

    if (prescription.categoryId) {
      let category = this.categories.find(a => a.id === prescription.categoryId);
      if (category)
        reasons = category.ReasonItems;
    }

    let data: IHandlePrescriptionDialogData = {
      title: 'اعلام کسری مدارک',
      list: reasons
    }

    const dialogRef = this.dialog.open(HandleDialogComponent, {
      minWidth: '300px',
      data: data
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let model: ICompletePrescriptionData = {
          description: result.description,
          reasonItems: result.list
        };
        this.actionLoading = true;
        let sub = this.dataService.completePrescription(prescription, model).subscribe(res => {
          var index = this.prescriptions.findIndex(a => a.id === prescription.id);
          this.prescriptions.splice(index, 1);
          this.actionLoading = false;
        }, error => {
          this.actionLoading = false;
          this.dialog.open(AlertDialogComponent, {
            width: '300px',
            maxWidth: '600px',
            data: {
              icon: 'errorIcon',
              message: JSON.stringify(error.errors),
              title: 'خطا به هنگام ثبت کسری مدارک',
              iconColor: '#c00'
            }
          })
        });
        this.subscriptions.push(sub);
      }
    });
  }
}
