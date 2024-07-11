import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { validatePolish } from 'validate-polish';
import { CompanyServiceService } from '../company-service.service';
import { CompanyDto } from './dto/companyDto';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent {

  registerCompanyForm!: FormGroup;
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
  validationErrors = new Map<string, String>();
  legalFormList: Map<string, string> = this.createLegalFormList();
  errorMessage!: string;
  buttonSend: boolean = false;
  companyDateFromComplited: boolean = true;
  registerCompanyMoreInfo!: FormGroup;
  paymentMethod!: FormControl;
  subscriptionType!: FormControl;

  paymentsMethodMap: Map<string, string> = this.createPaymentMethods();

  REDIRECT_AFTER_ADD = "/added-company";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private companyService: CompanyServiceService,
    private gtmService: GoogleTagManagerService,
  ) {}

  ngOnInit(): void {
    this.createRegistrationFormControls();
    this.createForm();
    this.createAdditionalForm();
    this.createAdditionalFormControls();
  }

  createRegistrationFormControls() {
    this.name = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(250)]);
    this.typeWholesaler = new FormControl('');
    this.typeCustomer = new FormControl('');
    this.legalForm = new FormControl('', [Validators.required]);
    this.nip = new FormControl('', [Validators.required]);
    this.regon = new FormControl('', [Validators.required]);
    this.krs = new FormControl('', [Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.phone = new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(9), Validators.maxLength(11)]);
    this.wwwSite = new FormControl('', [Validators.pattern('^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$')]);
    this.wwwStore = new FormControl('', [Validators.pattern('^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$')]);
  }

  createAdditionalFormControls() {
    this.subscriptionType = new FormControl('', [Validators.required]);
    this.paymentMethod = new FormControl('', [Validators.required]);
  }

  createForm() {
    this.registerCompanyForm = this.formBuilder.group({
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

  createAdditionalForm() {
    this.registerCompanyMoreInfo = this.formBuilder.group({
      subscriptionType: this.subscriptionType,
      paymentMethod: this.paymentMethod
    })
  }

  addCompany() {
    //this.validationErrors.clear()
    
    if(this.registerCompanyForm.valid) {
      const requestType = this.createType(this.typeCustomer.value, this.typeWholesaler.value);
      this.buttonSend = true;
      this.companyService.addCompany({
        name: this.name.value,
        type: requestType,
        legalForm: this.legalForm.value,
        nip: this.nip.value,
        regon: this.regon.value,
        krs: this.krs.value,
        email: this.email.value,
        phone: this.phone.value,
        wwwSite: this.wwwSite.value,
        wwwStore: this.wwwStore.value
      } as CompanyDto)
      .subscribe({
        next: response => {
          if (response) {
            const gtmTag = {
              event: 'add_company',
            };
            this.gtmService.pushTag(gtmTag);
            //this.router.navigate([this.REDIRECT_AFTER_ADD, {added: 'yes'}]);
            this.companyDateFromComplited = true;
          }
        },
        error: err => {
          this.buttonSend = false;
          if (typeof(err.error.fields) === 'object') {
            for (const errorfield of Object.keys(err.error.fields)) {
              this.validationErrors.set(errorfield, err.error.fields[errorfield]);
            }
          } else if( typeof(err.error.message) === 'string') {
            this.errorMessage = err.error.message;
          }
        }
      });
    } else {
      this.registerCompanyForm.markAllAsTouched();
    }
  }

  addCompanyMoreInfo() {
    if(this.registerCompanyMoreInfo.valid) {
      console.log(this.registerCompanyMoreInfo.get('paymentMethod')?.value)
      console.log(this.registerCompanyMoreInfo.get('subscriptionType')?.value)
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

  createPaymentMethods() {
    let paymentMethods = new Map<string, string>();
    paymentMethods.set("BANK_TRANSFER", "Przelew bankowy");
    return paymentMethods;
  }

  nipIsValid(c: AbstractControl): {nipValid: boolean} | null {
    return validatePolish.nip(c.value.nip) ? null : {nipValid: true};
  }

  regonIsValid(c: AbstractControl): {regonValid: boolean} | null {
    return validatePolish.regon(c.value.regon) ? null : {regonValid: true};
  }

  isCorrectLegalForm(c: AbstractControl): {legalForm: boolean} | null {
    //let list: Map<string, string> = this.createLegalFormList();
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
}


