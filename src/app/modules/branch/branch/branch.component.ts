import { Component, OnInit } from '@angular/core';
import { BranchService } from '../branch.service';
import { Branch } from '../model/branch';
import { ConfirmDialogService } from '../../common/confirm-dialog/confirm-dialog.service';


@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit{
  
  branchs: Array<Branch> = [];
  messageError: string = "";

  constructor(
    private branchService: BranchService,
    private dialogService: ConfirmDialogService
    ) {}
  
  ngOnInit(): void {
    this.getBranchs();
  }

  getBranchs() {
    this.branchService.getBranchs().subscribe({
      next: response => {
        response.forEach(branch => {
          this.branchs.push(branch);
        })  
      },
      error: error => {
        if( typeof(error.error.message) === 'string' ) {
          this.messageError = error.error.message;
        }
      }
    })
  }

  confirmDelete(element: Branch) {
    this.dialogService.openConfirmDialog()
    .afterClosed()
    .subscribe(result => {
      
      if (result) {
        this.branchService.deleteBranch(element.id)
        .subscribe(() => {
          this.branchs.forEach((value, index) => {
            if(element == value) {
              this.branchs.splice(index, 1);
            }
          })
        })
      }
    })
  }

}
