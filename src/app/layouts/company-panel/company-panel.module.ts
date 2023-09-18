import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyPanelComponent } from './company-panel.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditCompanyComponent } from 'src/app/modules/company/edit-company/edit-company.component';
import { BranchComponent } from 'src/app/modules/company/branch/branch.component';

@NgModule({
  declarations: [
    CompanyPanelComponent,
    EditCompanyComponent,
    BranchComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ]
})
export class CompanyPanelModule { }
