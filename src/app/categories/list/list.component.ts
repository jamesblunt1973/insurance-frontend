import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DataService } from '../../core/data.service';
import { UiService } from '../../core/ui.service';
import { AlertDialogComponent } from '../../shared/components/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { ICategory } from '../../shared/models/category.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  categories: ICategory[] = [];
  subscriptions: Subscription[] = [];
  path = environment.apiUrl + 'category/indexes/';
  loading = false;
  canAdd = true;

  constructor(private dataService: DataService, private dialog: MatDialog, private uiService: UiService) { }

  ngOnInit() {
    this.loading = true;
    let sub = this.dataService.getCategories().subscribe(res => {
      this.loading = false;
      this.categories = res.filter(a => a.ReasonItems.length > 0);
      this.canAdd = res.length > this.categories.length;
    });
    this.subscriptions.push(sub);
  }

  remove(category: ICategory) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        title: 'حذف دسته',
        message: 'دسته مورد نظر حذف شود؟',
        okText: 'بله',
        cancelText: 'خیر'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.deleteCategory(category).subscribe(res => {

          let index = this.categories.findIndex(a => a.id == category.id);
          this.categories.splice(index, 1);
          this.canAdd = true;

          this.uiService.showSuccessSnack('دسته‌ی مورد نظر با موفقیت حذف شد');
        }, error => {
          console.log(error);
          this.dialog.open(AlertDialogComponent, {
            width: '300px',
            maxWidth: '600px',
            data: {
              icon: 'errorIcon',
              message: 'شرح کامل خطا در کنسول ثبت شده است.',
              title: 'خطا به هنگام حذف دسته',
              iconColor: '#c00'
            }
          });
        });
      }
    });
  }

}
