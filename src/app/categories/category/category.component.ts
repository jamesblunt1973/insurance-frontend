import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../core/data.service';
import { UiService } from '../../core/ui.service';
import { AlertDialogComponent } from '../../shared/components/alert-dialog/alert-dialog.component';
import { ICategory } from '../../shared/models/category.model';
import { debug } from 'util';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dataService: DataService,
    private uiService: UiService,
    private dialog: MatDialog
  ) { }

  frmGroup = this.fb.group({
    categoryId: [null, Validators.required],
    allowed: [null, [Validators.required, Validators.min(1)]],
    reasons: ['', Validators.required],
    rejects: ['', Validators.required]
  });
  files: File[] = [];

  path = 'https://insurance.davajoo.org/files/';
  categories: ICategory[] = [];
  category: ICategory = null;

  ngOnInit() {
    this.dataService.getCategories().subscribe(res => {
      this.route.paramMap.subscribe(params => {
        let id = +params.get('id');
        if (id) {
          this.categories = res;
          this.category = res.find(a => a.id === id);
          this.frmGroup.setValue({
            categoryId: id,
            allowed: this.category.maxIndexLimit,
            reasons: this.category.ReasonItems.join('\n'),
            rejects: this.category.RejectItems.join('\n')
          });
          this.frmGroup.get('categoryId').disable();
        }
        else
          this.categories = res.filter(a => a.ReasonItems.length === 0);
      });
    });
  }

  onFileChange(event) {
    this.files = event.target.files;
    //let reader = new FileReader();

    //if (event.target.files && event.target.files.length) {
    //  const [file] = event.target.files;
    //  reader.readAsDataURL(file);

    //  reader.onload = () => {
    //    this.frmGroup.patchValue({
    //      attachment: reader.result
    //    });

    //    // need to run CD since file load runs outside of zone
    //    this.cd.markForCheck();
    //  };
    //}
  }

  addCategory() {
    if (this.frmGroup.valid) {

      let formValue = this.frmGroup.value;

      let formData = new FormData();
      formData.append('maxIndexLimit', formValue.allowed);
      formData.append('reasonItems', formValue.reasons.split('\n'));
      formData.append('rejectItems', formValue.rejects.split('\n'));
      for (var i in this.files)
        formData.append('files', this.files[i]);

      if (!this.category) {
        this.dataService.newCategory(formData, formValue.categoryId).subscribe(res => {

          this.uiService.showSuccessSnack('دسته‌ی جدید با موفقیت اضافه شد');

          this.frmGroup.reset();

          let index = this.categories.findIndex(a => a.id === formValue.categoryId);
          this.categories.splice(index, 1);
        }, error => {
          console.log(error);
          this.dialog.open(AlertDialogComponent, {
            width: '300px',
            maxWidth: '600px',
            data: {
              icon: 'errorIcon',
              message: 'شرح کامل خطا در کنسول ثبت شده است.',
              title: 'خطا به هنگام ثبت دسته جدید',
              iconColor: '#c00'
            }
          });
        });
      }
      else {
        this.dataService.editCategory(formData, this.category.id).subscribe(res => {
          // this.frmGroup.reset();
          this.uiService.showSuccessSnack('دسته‌ی ' + this.category.name + ' با موفقیت ویرایش شد.');
        }, error => {
          console.log(error);
          this.dialog.open(AlertDialogComponent, {
            width: '300px',
            maxWidth: '600px',
            data: {
              icon: 'errorIcon',
              message: 'شرح کامل خطا در کنسول ثبت شده است.',
              title: 'خطا به هنگام ویرایش دسته',
              iconColor: '#c00'
            }
          });
        });
      }
    }
  }

  resetForm() {
    this.frmGroup.setValue({
      categoryId: this.category ? this.category.id : null,
      allowed: null,
      reasons: '',
      rejects: ''
    });
  }
}
