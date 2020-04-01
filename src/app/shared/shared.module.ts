import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialComponentsModule } from './material.module';

import { CounterComponent } from './components/counter/counter.component';
import { DigitComponent } from './components/counter/digit/digit.component';
import { PagerComponent } from './components/pager/pager.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { MomentJalaaliPipe } from './moment-jalaali.pipe';
import { PictureDialogComponent } from './components/picture-dialog/picture-dialog.component';
import { PrescriptionComponent } from './components/prescription/prescription.component';

@NgModule({
  declarations: [CounterComponent,
    DigitComponent,
    PagerComponent,
    ConfirmDialogComponent,
    AlertDialogComponent,
    PictureDialogComponent,
    MomentJalaaliPipe,
    PrescriptionComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MaterialComponentsModule
  ],
  providers: [],
  exports: [
    CommonModule,
    MaterialComponentsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    CounterComponent,
    PagerComponent,
    ConfirmDialogComponent,
    AlertDialogComponent,
    PictureDialogComponent,
    MomentJalaaliPipe,
    PrescriptionComponent],
  entryComponents: [
    ConfirmDialogComponent,
    AlertDialogComponent,
    PictureDialogComponent
  ]
})
export class SharedModule { }
