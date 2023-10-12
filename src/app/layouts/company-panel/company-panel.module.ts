import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyPanelComponent } from './company-panel.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditCompanyComponent } from 'src/app/modules/company/edit-company/edit-company.component';
import { EditBranchComponent } from 'src/app/modules/branch/edit-branch/edit-branch.component';
import { BranchComponent } from 'src/app/modules/branch/branch/branch.component';
import { AddBranchComponent } from 'src/app/modules/branch/add-branch/add-branch/add-branch.component';
import { ConfirmDialogComponent } from 'src/app/modules/common/confirm-dialog/confirm-dialog.component';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [
    CompanyPanelComponent,
    EditCompanyComponent,
    BranchComponent,
    EditBranchComponent,
    AddBranchComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    AngularEditorModule
  ]
})
export class CompanyPanelModule { }
