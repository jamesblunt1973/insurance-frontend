import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { DataService } from './data.service';
import { AuthInterceptorProvider } from './token-interceptor';
import { UiService } from './ui.service';

@NgModule({
  declarations: [

  ],
  imports: [
    HttpClientModule,
    SharedModule
  ],
  providers: [
    UiService,
    DataService,
    AuthGuard,
    AuthService,
    AuthInterceptorProvider
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`CoreModule has already been loaded. Import Core modules in the AppModule only.`);
    }
  }
}
