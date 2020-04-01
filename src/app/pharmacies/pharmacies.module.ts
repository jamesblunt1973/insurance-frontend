import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path: '', component: ListComponent }
];

@NgModule({
  declarations: [ListComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class PharmaciesModule { }
