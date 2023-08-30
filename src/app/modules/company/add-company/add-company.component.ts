import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { validatePolish } from 'validate-polish';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent {

  registerCompanyForm!: FormGroup;
  name!: FormControl;
  type!: FormControl;
  legalForm!: FormControl;
  nip!: FormControl;
  regon!: FormControl;
  krs!: FormControl;
  email!: FormControl;
  phone!: FormControl;
  wwwSite!: FormControl;
  wwwStore!: FormControl;
  validationErrors = new Map<string, String>();
  legalFormList: Map<string, string> = this.createLegalFormList();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createRegistrationFormControls();
    this.createForm();
  }

  createRegistrationFormControls() {
    this.name = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(250)]);
    this.type = new FormControl('', [Validators.required]);
    this.legalForm = new FormControl('', [Validators.required]);
    this.nip = new FormControl('', [Validators.required]);
    this.regon = new FormControl('', [Validators.required]);
    this.krs = new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.phone = new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(9), Validators.maxLength(11)]);
    this.wwwSite = new FormControl('', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]);
    this.wwwStore = new FormControl('', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]);
  }

  createForm() {
    this.registerCompanyForm = this.formBuilder.group({
      name: this.name,
      type: this.type,
      legalForm: this.legalForm,
      nip: this.nip,
      regon: this.regon,
      krs: this.krs,
      email: this.email,
      phone: this.phone,
      wwwSite: this.wwwSite,
      wwwStore: this.wwwStore,
    }, {validators: [this.nipIsValid, this.regonIsValid]})
  }

  addCompany() {
    this.validationErrors.clear()
    if(this.registerCompanyForm.valid) {
      console.log(this.registerCompanyForm.value);
    } else {
      console.log("Nieudana validacja");
      console.log(this.registerCompanyForm.value);
    }
  }

  createLegalFormList(): Map<string, string> {
    let legalFormMap = new Map<string, string>();
    legalFormMap.set("JDG", "Jednoosobowa działalność gospodarcza");
    legalFormMap.set("SC", "Spółka cywilna");
    legalFormMap.set("SJ", "Spółka jawna");
    legalFormMap.set("SP", "Spółka partnerska");
    legalFormMap.set("SK", "Spółka komandytowa");
    legalFormMap.set("SKA", "Spółka komandytowo-akcyjna");
    legalFormMap.set("ZOO", "Spółka z ograniczoną odpowiedzialnością");
    legalFormMap.set("PSA", "Prosta spółka akcyjna");
    legalFormMap.set("SA", "Spółka akcyjna");
    return legalFormMap;
  }

  public nipIsValid(c: AbstractControl): {nipValid: boolean} | null {
    return validatePolish.nip(c.value.nip) ? null : {nipValid: true};
  }

  public regonIsValid(c: AbstractControl): {regonValid: boolean} | null {
    return validatePolish.regon(c.value.regon) ? null : {regonValid: true};
  }

  public isCorrectLegalForm(c: AbstractControl): {legalForm: boolean} | null {
    let list = this.createLegalFormList();
    return list.has(c.value.legalForm) ? null : {legalForm: true};
  }
}
