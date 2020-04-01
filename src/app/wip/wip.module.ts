import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReportComponent } from './report/report.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../../environments/environment';
import { HandleDialogComponent } from './handle-dialog-component/handle-dialog.component';

const config: SocketIoConfig = { url: environment.apiUrl, options: {} };
const routes: Routes = [
  { path: '', component: ReportComponent }
];

@NgModule({
  declarations: [ReportComponent, HandleDialogComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    SocketIoModule.forRoot(config)
  ],
  entryComponents: [HandleDialogComponent]
})
export class WipModule { }
