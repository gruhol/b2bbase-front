import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FullpageModule } from './layouts/fullpage/fullpage.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './modules/common/interceptor/jwt.interceptor';
import { RoleUserAuthorizeGuard } from './modules/common/guard/RoleUserAuthorizeGuard';
import { LoggedComponent } from './modules/logged/logged.component';
import { RegisteredComponent } from './modules/registered/registered.component';
import { LinkveryficationComponent } from './modules/linkveryfication/linkveryfication.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisteredComponent,
    LinkveryficationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullpageModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    RoleUserAuthorizeGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
