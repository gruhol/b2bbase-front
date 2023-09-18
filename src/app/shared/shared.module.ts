import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CompanyMenuComponent } from './component/company-menu/company-menu.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CompanyMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    CompanyMenuComponent,
    MaterialModule,
    BrowserAnimationsModule
  ]
})
export class SharedModule { }
