import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FullpageComponent } from './fullpage.component';
import { RegistrationComponent } from 'src/app/modules/registration/registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from 'src/app/modules/login/login.component';

@NgModule({
  declarations: [
    FullpageComponent,
    RegistrationComponent,
    LoginComponent
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
