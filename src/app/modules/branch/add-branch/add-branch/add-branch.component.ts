import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BranchService } from '../../branch.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Branch } from '../../model/branch';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.scss']
})

export class AddBranchComponent implements OnInit{

  addBranchForm!: FormGroup;
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
  errorMessage!: string;
  validationErrors = new Map<string, String>();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private branchService: BranchService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.createAddBranchFormControls();
    this.createForm();
  }

  addBranch() {
    console.log(this.addBranchForm.valid)
  
    if(this.addBranchForm.valid) {
      this.branchService.addBranch({
        name: this.name.value,
        headquarter: this.headquarter.value,
        voivodeship: this.voivodeship.value,
        post_code: this.post_code.value,
        city: this.city.value,
        street: this.street.value,
        house_number: this.house_number.value,
        office_number: this.office_number.value,
        email: this.email.value,
        phone: this.phone.value
      } as Branch)
      .subscribe({
        next: response => {
            this.snackBar.open("Oddział zostały dodany", '', { duration: 3000 });
            this.router.navigate(["/branch"]);
        },
        error: err => {
          if (typeof(err.error.fields) === 'object') {
            for (const errorfield of Object.keys(err.error.fields)) {
              this.validationErrors.set(errorfield, err.error.fields[errorfield]);
            }
          } else if( typeof(err.error.message) === 'string') {
            this.errorMessage = err.error.message;
          }
        }
      });
    }
  }

  createAddBranchFormControls() {
    this.name = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(250)]);
    this.headquarter = new FormControl(false, [Validators.required]);
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

  createForm() {
    this.addBranchForm = this.formBuilder.group({
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
    }
    //, {validators: [this.isCorrectVoivodeship]}
    )
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
