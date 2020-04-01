import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { EmployeeComponent } from './employee/employee.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: ':id', component: EmployeeComponent }
];

@NgModule({
  declarations: [ListComponent, EmployeeComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class EmployeesModule { }
