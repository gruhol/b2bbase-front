import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchService } from '../branch.service';
import { Branch } from '../model/branch';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-branch',
  templateUrl: './edit-branch.component.html',
  styleUrls: ['./edit-branch.component.scss']
})
export class EditBranchComponent implements OnInit {

  editBranchForm!: FormGroup;
  private idBranch!: number;
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
    private activateRouter: ActivatedRoute,
    private router: Router,
    private branchService: BranchService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.idBranch = Number(this.activateRouter.snapshot.paramMap.get('id'));
    if (this.idBranch === null ) this.router.navigate(["/branch"]);
    this.createRegistrationFormControls();
    this.createForm();
    this.getBranch();
  }

  editBranch() {
    console.log("uruchomienie formularza");
    if(this.editBranchForm.valid) {
      console.log(this.editBranchForm.value);
      this.branchService.editBranch({
        id: this.idBranch,
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
            this.editBranchForm.setValue({
              name: response.name,
              headquarter: response.headquarter,
              voivodeship: response.voivodeship,
              post_code: response.post_code,
              city: response.city,
              street: response.street,
              house_number: response.house_number,
              office_number: response.office_number,
              email: response.email,
              phone: response.phone
            });
            this.snackBar.open("Oddział zostały zaktualizowany", '', { duration: 3000 });
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

  getBranch() {
    this.branchService.getBranch(this.idBranch)
      .subscribe(branch => this.mapFormValues(branch)
      );
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
    }
    //, {validators: [this.isCorrectVoivodeship]}
    )
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

  private mapFormValues(branch: Branch): void {

    this.editBranchForm.setValue({
      name: branch.name,
      headquarter: branch.headquarter,
      voivodeship: branch.voivodeship,
      post_code: branch.post_code,
      city: branch.city,
      street: branch.street,
      house_number: branch.house_number,
      office_number: branch.office_number,
      email: branch.email,
      phone: branch.phone
    });
  }

}
