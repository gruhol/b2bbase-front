import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FullpageComponent } from './fullpage.component';
import { RegistrationComponent } from 'src/app/modules/registration/registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    FullpageComponent,
    RegistrationComponent
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
