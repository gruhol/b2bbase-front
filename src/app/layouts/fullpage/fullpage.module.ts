import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FullpageComponent } from './fullpage.component';
import { RegistrationComponent } from 'src/app/modules/user/registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoggedComponent } from 'src/app/modules/logged/logged.component';
import { RememberPasswordComponent } from 'src/app/modules/user/remember-password/remember-password.component';
import { SendPasswordComponent } from 'src/app/modules/user/send-password/send-password.component';
import { EditUserComponent } from 'src/app/modules/user/edit-user/edit-user.component';
import { LoginComponent } from 'src/app/modules/user/login/login.component';
import { LinkveryficationComponent } from 'src/app/modules/user/linkveryfication/linkveryfication.component';
import { RegisteredComponent } from 'src/app/modules/user/registered/registered.component';
import { AddCompanyComponent } from 'src/app/modules/company/add-company/add-company.component';
import { CompaniesCatalogComponent } from 'src/app/modules/catalog/companies-catalog/companies-catalog.component';
import { CompanyCatalogComponent } from 'src/app/modules/catalog/company-catalog/company-catalog.component';

@NgModule({
    declarations: [
        FullpageComponent,
        RegistrationComponent,
        LoggedComponent,
        LoginComponent,
        RememberPasswordComponent,
        SendPasswordComponent,
        EditUserComponent,
        SendPasswordComponent,
        LinkveryficationComponent,
        RegisteredComponent,
        AddCompanyComponent,
        CompaniesCatalogComponent,
        CompanyCatalogComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        SharedModule,
        FormsModule
    ]
})
export class FullpageModule { }
