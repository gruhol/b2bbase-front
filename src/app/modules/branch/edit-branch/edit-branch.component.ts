import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-branch',
  templateUrl: './edit-branch.component.html',
  styleUrls: ['./edit-branch.component.scss']
})
export class EditBranchComponent implements OnInit {

  editBranchForm!: FormGroup;
  private idBranch!: string | null;
  name!: FormControl;
  headquarter!: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private activateRouter: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idBranch = this.activateRouter.snapshot.paramMap.get('id');
    if (this.idBranch === null ) this.router.navigate(["/branch"]);
  }

  editBranch() {

  }

  createForm() {
    this.editBranchForm = this.formBuilder.group({
      name: this.name,
      headquarter: this.headquarter
    })
  }

  createRegistrationFormControls() {
    this.name = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(250)]);
    this.headquarter = new FormControl('', [Validators.required]);
  }


}
