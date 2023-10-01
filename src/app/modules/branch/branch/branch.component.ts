import { Component, OnInit } from '@angular/core';
import { BranchService } from '../branch.service';
import { Branch } from '../model/branch';


@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit{
  
  branchs: Array<Branch> = [];
  messageError: string = "";

  constructor(private branchService: BranchService) {}
  
  ngOnInit(): void {
    this.getBranchs();
    console.log(this.branchs);
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

}
