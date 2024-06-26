import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FullpageModule } from './layouts/fullpage/fullpage.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './modules/common/interceptor/jwt.interceptor';
import { RoleUserAuthorizeGuard } from './modules/common/guard/RoleUserAuthorizeGuard';
import { CompanyPanelModule } from './layouts/company-panel/company-panel.module';
import { LogoutComponent } from './modules/user/logout/logout/logout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

@NgModule({
  declarations: [
    AppComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullpageModule,
    CompanyPanelModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    RoleUserAuthorizeGuard,
    {provide: 'googleTagManagerId', useValue: "GTM-P2VWLBKX"},
    GoogleTagManagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
