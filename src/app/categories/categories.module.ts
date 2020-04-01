import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CategoryComponent } from './category/category.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: ':id', component: CategoryComponent }
];

@NgModule({
  declarations: [ListComponent, CategoryComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class CategoriesModule { }
