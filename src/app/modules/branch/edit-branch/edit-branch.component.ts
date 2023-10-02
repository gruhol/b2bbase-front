import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchService } from '../branch.service';

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
  voivodeship!: FormControl;
  post_code!: FormControl;
  city!: FormControl;
  street!: FormControl;
  house_number!: FormControl;
  office_number!: FormControl;
  email!: FormControl;
  phone!: FormControl;
  voivodeshipList: Map<string, string> = this.createVoivodeshipList();

  constructor(
    private formBuilder: FormBuilder,
    private activateRouter: ActivatedRoute,
    private router: Router,
    private branchService: BranchService
  ) {}

  ngOnInit(): void {
    this.idBranch = this.activateRouter.snapshot.paramMap.get('id');
    if (this.idBranch === null ) this.router.navigate(["/branch"]);
    this.createRegistrationFormControls()
    this.createForm()
  }

  editBranch() {
    console.log(this.editBranchForm.value)
    if(this.editBranchForm.valid) {
      console.log(this.editBranchForm.value);
    }
  }

  createForm() {
    this.editBranchForm = this.formBuilder.group({
      name: this.name,
      headquarter: this.headquarter,
      voivodeship: this.voivodeship,
      post_code: this.post_code,
      city: this.city,
      street: this.street,
      house_number: this.house_number,
      office_number: this.office_number,
      email: this.email,
      phone: this.phone
    }, {validators: [this.isCorrectVoivodeship]})
  }

  createRegistrationFormControls() {
    this.name = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(250)]);
    this.headquarter = new FormControl('', [Validators.required]);
    this.voivodeship = new FormControl('', [Validators.required]);
    this.post_code = new FormControl('', [Validators.required, Validators.pattern("^[0-9]{2}-[0-9]{3}$")]);
    this.city = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]);
    this.street = new FormControl('', [Validators.required, Validators.maxLength(128)]);
    this.house_number = new FormControl('', [Validators.required, Validators.maxLength(16)]);
    this.office_number = new FormControl('', [Validators.maxLength(16)]);
    this.email = new FormControl('', [Validators.required, Validators.email, Validators.maxLength(256)]);
    this.phone = new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(9), Validators.maxLength(11)]);
  }

  createVoivodeshipList(): Map<string, string> {
    let voivodeshipMap = new Map<string, string>();
    voivodeshipMap.set("DS","dolnośląskie"),
    voivodeshipMap.set("KP", "kujawsko-pomorskie"),
    voivodeshipMap.set("LU", "lubelskie"),
    voivodeshipMap.set("LB", "lubuskie"),
    voivodeshipMap.set("LD", "łódzkie"),
    voivodeshipMap.set("MA", "małopolskie"),
    voivodeshipMap.set("MZ", "mazowieckie"),
    voivodeshipMap.set("OP", "opolskie"),
    voivodeshipMap.set("PK", "podkarpackie"),
    voivodeshipMap.set("PD", "podlaskie"),
    voivodeshipMap.set("PM", "pomorskie"),
    voivodeshipMap.set("SL", "śląskie"),
    voivodeshipMap.set("SK", "świętokrzyskie"),
    voivodeshipMap.set("WN", "warmińsko-mazurskie"),
    voivodeshipMap.set("WP", "wielkopolskie"),
    voivodeshipMap.set("ZP", "zachodniopomorskie");
    return voivodeshipMap;
  }

  isCorrectVoivodeship(c: AbstractControl): {voivodeship: boolean} | null {
    let voivodeshipMap = new Map<string, string>();
    voivodeshipMap.set("DS","dolnośląskie"),
    voivodeshipMap.set("KP", "kujawsko-pomorskie"),
    voivodeshipMap.set("LU", "lubelskie"),
    voivodeshipMap.set("LB", "lubuskie"),
    voivodeshipMap.set("LD", "łódzkie"),
    voivodeshipMap.set("MA", "małopolskie"),
    voivodeshipMap.set("MZ", "mazowieckie"),
    voivodeshipMap.set("OP", "opolskie"),
    voivodeshipMap.set("PK", "podkarpackie"),
    voivodeshipMap.set("PD", "podlaskie"),
    voivodeshipMap.set("PM", "pomorskie"),
    voivodeshipMap.set("SL", "śląskie"),
    voivodeshipMap.set("SK", "świętokrzyskie"),
    voivodeshipMap.set("WN", "warmińsko-mazurskie"),
    voivodeshipMap.set("WP", "wielkopolskie"),
    voivodeshipMap.set("ZP", "zachodniopomorskie");
    return voivodeshipMap.has(c.value.legalForm) ? null : {voivodeship: true};
  }

}
