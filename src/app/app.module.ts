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
import { HomePageComponent } from './modules/catalog/home-page/home-page/home-page.component';
import { SearchComponent } from './modules/search/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    LogoutComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullpageModule,
    CompanyPanelModule,
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
