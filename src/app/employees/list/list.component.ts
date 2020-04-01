import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DataService } from '../../core/data.service';
import { UiService } from '../../core/ui.service';
import { AutoUnsubscribe } from '../../shared/auto-unsubscribe';
import { AlertDialogComponent } from '../../shared/components/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { IEmployee } from '../../shared/models/employee.model';

@AutoUnsubscribe
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  subscriptions: Subscription[] = [];
  employees: IEmployee[] = [];
  loading = false;

  constructor(private dataService: DataService, private uiService: UiService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loading = true;
    let sub = this.dataService.getEmployees().subscribe(res => {
      this.loading = false;
      this.employees = res;
      this.dataService.employees = this.employees; // store local cahce for later access in employee component
    });
    this.subscriptions.push(sub);
  }

  remove(employee: IEmployee) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        title: 'حذف کارمند',
        message: 'کارمند مورد نظر حذف شود؟',
        okText: 'بله',
        cancelText: 'خیر'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let sub = this.dataService.deleteEmployee(employee.id).subscribe(res => {
          this.uiService.showSuccessSnack('کارمند مورد نظر با موفقیت حذف شد');
        }, error => {
          console.log(error);
          this.dialog.open(AlertDialogComponent, {
            width: '300px',
            maxWidth: '600px',
            data: {
              icon: 'errorIcon',
              message: 'شرح کامل خطا در کنسول ثبت شده است.',
              title: 'خطا به هنگام حذف کارمند',
              iconColor: '#c00'
            }
          });
        });
        this.subscriptions.push(sub);
      }
    });
  }

}
