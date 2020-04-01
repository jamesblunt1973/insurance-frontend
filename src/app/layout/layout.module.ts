import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { AuthGuard } from '../core/auth.guard';
import { ContainerComponent } from './container/container.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [
  {
    path: '', component: ContainerComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(mod => mod.HomeModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'wip',
        loadChildren: () => import('../wip/wip.module').then(mod => mod.WipModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'archive',
        loadChildren: () => import('../archive/archive.module').then(mod => mod.ArchiveModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'pharmacies',
        loadChildren: () => import('../pharmacies/pharmacies.module').then(mod => mod.PharmaciesModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'categories',
        loadChildren: () => import('../categories/categories.module').then(mod => mod.CategoriesModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'employees',
        loadChildren: () => import('../employees/employees.module').then(mod => mod.EmployeesModule),
        canLoad: [AuthGuard]
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home'
      }
    ]
  }
];

@NgModule({
  declarations: [
    ContainerComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class LayoutModule { }
