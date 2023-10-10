import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { validatePolish } from 'validate-polish';
import { CompanyServiceService } from '../company-service.service';
import { CompanyToEditDto } from '../add-company/dto/CompanyToEditDto';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  ediCooperation!: FormControl;
  apiCooperation!: FormControl;
  productFileCooperation!: FormControl;
  legalFormList: Map<string, string> = this.createLegalFormList();
  validationErrors = new Map<string, String>();
  errorMessage!: string;

  REDIRECT_AFTER_EDIT = "/edit-company";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private companyService: CompanyServiceService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.createRegistrationFormControls();
    this.getCompany();
    this.createForm();
  }

  editCompany() {
    if(this.editCompanyForm.valid) {
      console.log(this.editCompanyForm.value);
      const requestType = this.createType(this.typeCustomer.value, this.typeWholesaler.value);
      this.companyService.editCompany({
        name: this.name.value,
        type: requestType,
        legalForm: this.legalForm.value,
        nip: this.nip.value,
        regon: this.regon.value,
        krs: this.krs.value,
        email: this.email.value,
        phone: this.phone.value,
        wwwSite: this.wwwSite.value,
        wwwStore: this.wwwStore.value,
        ediCooperation: this.ediCooperation.value,
        apiCooperation: this.apiCooperation.value,
        productFileCooperation: this.productFileCooperation.value
      } as CompanyToEditDto)
      .subscribe({
        next: response => {
          if (response) {
            
            let wholeSaler: boolean = response.type === 'BOTH' || response.type === 'WHOLESALER';
            let customer: boolean = response.type === 'BOTH' || response.type === 'CUSTOMER';

            this.editCompanyForm.setValue({
              name: response.name,
              typeWholesaler: wholeSaler,
              typeCustomer: customer,
              legalForm: response.legalForm,
              nip: response.nip,
              regon: response.regon,
              krs: response.krs,
              email: response.email,
              phone: response.phone,
              wwwSite: response.wwwSite,
              wwwStore: response.wwwStore,
              ediCooperation: response.ediCooperation,
              apiCooperation: response.apiCooperation,
              productFileCooperation: response.productFileCooperation
            });

            this.snackBar.open("Firma została zaktualizowana", '', { duration: 3000 });
          }
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
    this.ediCooperation =  new FormControl('');
    this.apiCooperation = new FormControl('');
    this.productFileCooperation = new FormControl('');
  }

  getCompany() {
    this.companyService.getCompany()
      .subscribe(product => this.mapFormValues(product)
      );
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
      ediCooperation: this.ediCooperation,
      apiCooperation: this.apiCooperation,
      productFileCooperation: this.productFileCooperation,
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

  private mapFormValues(company: CompanyToEditDto): void {
    let wholeSaler: boolean = false;
    let customer: boolean = false;
    if (company.type === 'WHOLESALER') wholeSaler = true;
    if (company.type === 'CUSTOMER') customer = true;
    if (company.type === 'BOTH') {
      wholeSaler = true;
      customer = true;
    }

    this.editCompanyForm.setValue({
      name: company.name,
      typeWholesaler: wholeSaler,
      typeCustomer: customer,
      legalForm: company.legalForm,
      nip: company.nip,
      regon: company.regon,
      krs: company.krs,
      email: company.email,
      phone: company.phone,
      wwwSite: company.wwwSite,
      wwwStore: company.wwwStore,
      ediCooperation: company.ediCooperation,
      apiCooperation: company.apiCooperation,
      productFileCooperation: company.productFileCooperation
    });
  }
}
