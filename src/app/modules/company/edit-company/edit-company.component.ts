import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { validatePolish } from 'validate-polish';
import { CompanyServiceService } from '../company-service.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss']
})
export class EditCompanyComponent  {

  editCompanyForm!: FormGroup;
  name!: FormControl;
  typeWholesaler!: FormControl;
  typeCustomer!: FormControl;
  legalForm!: FormControl;
  nip!: FormControl;
  regon!: FormControl;
  krs!: FormControl;
  email!: FormControl;
  phone!: FormControl;
  wwwSite!: FormControl;
  wwwStore!: FormControl;
  legalFormList: Map<string, string> = this.createLegalFormList();


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private companyService: CompanyServiceService
  ) {}

  ngOnInit(): void {
    this.createRegistrationFormControls();
    this.createForm();
  }

  editCompany() {}

  createRegistrationFormControls() {
    this.name = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(250)]);
    this.typeWholesaler = new FormControl('');
    this.typeCustomer = new FormControl('');
    this.legalForm = new FormControl('', [Validators.required]);
    this.nip = new FormControl('', [Validators.required]);
    this.regon = new FormControl('', [Validators.required]);
    this.krs = new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.phone = new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(9), Validators.maxLength(11)]);
    this.wwwSite = new FormControl('', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]);
    this.wwwStore = new FormControl('', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]);
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

  createForm() {
    this.editCompanyForm = this.formBuilder.group({
      name: this.name,
      typeWholesaler: this.typeWholesaler,
      typeCustomer: this.typeCustomer,
      legalForm: this.legalForm,
      nip: this.nip,
      regon: this.regon,
      krs: this.krs,
      email: this.email,
      phone: this.phone,
      wwwSite: this.wwwSite,
      wwwStore: this.wwwStore,
    }, {validators: [this.nipIsValid, this.regonIsValid, this.isCorrectLegalForm, this.isOneTypeSelect]})
  }

  nipIsValid(c: AbstractControl): {nipValid: boolean} | null {
    return validatePolish.nip(c.value.nip) ? null : {nipValid: true};
  }

  regonIsValid(c: AbstractControl): {regonValid: boolean} | null {
    return validatePolish.regon(c.value.regon) ? null : {regonValid: true};
  }

  isOneTypeSelect(c: AbstractControl): {isTypeSelect: boolean} | null {
    return (c.value.typeCustomer === true || c.value.typeWholesaler === true) ? null : {isTypeSelect: true};
  }

  createType(customer: boolean, wholeSaler: boolean): string {
    if (customer === true && wholeSaler === true) {
      return 'BOTH';
    } else if (customer === true) {
      return 'CUSTOMER';
    } else if (wholeSaler === true) {
      return 'WHOLESALER';
    } else {
      return '';
    }
  }

  isCorrectLegalForm(c: AbstractControl): {legalForm: boolean} | null {
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
    return legalFormMap.has(c.value.legalForm) ? null : {legalForm: true};
  }
}
