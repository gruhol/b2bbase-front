import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { validatePolish } from 'validate-polish';
import { CompanyServiceService } from '../company-service.service';
import { CompanyDto } from './dto/companyDto';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { SubscriptionCompanyDto } from './dto/SubscriptionCompanyDto';
import { PricelistService } from 'src/app/shared/pricelist.service';
import { DiscountCodeService } from '../discount-code.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent {

  price: any = 0;
  basicPrice: string = "";
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
  companyDateFromComplited: boolean = false;
  codeForm: boolean = false;

  registerCompanyMoreInfo!: FormGroup;
  paymentMethod!: FormControl;
  subscriptionType!: FormControl;
  companyId!: number;
  paymentsMethodMap: Map<string, string> = this.createPaymentMethods();

  discountCodeForm!: FormGroup;
  code!: FormControl;
  codeError: string = "";
  codeOk: string = "";
  priceWithCode: any

  REDIRECT_AFTER_ADD = "/added-company";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private companyService: CompanyServiceService,
    private gtmService: GoogleTagManagerService,
    private pricelistService: PricelistService,
    private discountCodeService: DiscountCodeService
  ) {}

  ngOnInit(): void {
    this.createRegistrationFormControls();
    this.createForm();
    this.createAdditionalFormControls();
    this.createAdditionalForm();
    this.getPriceSuBscription();
    this.createDiscountCodeFormControls();
    this.createDiscountCodeForm();
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
    this.subscriptionType = new FormControl('', Validators.required);
    this.paymentMethod = new FormControl('', Validators.required);
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

  createDiscountCodeFormControls() {
    this.code = new FormControl('', [Validators.minLength(2), Validators.maxLength(10)]);
    
  }
  
  createDiscountCodeForm() {
    this.discountCodeForm = this.formBuilder.group({
      code: this.code
    })  
  }

  getPriceSuBscription() {
    this.pricelistService.getPrice("SUBSCRIPTION_BASIC").subscribe({
      next: response => {
        if (response.promotionPrice) {
          this.basicPrice = response.price + " PLN - Cena promocyjna / rok";
        } else {
          this.basicPrice = response.price + " PLN / rok";
        }
      },
      error: err => {
        this.basicPrice = "Błąd pobierania ceny";
      }
    });
  }

  addCompany() {
    this.validationErrors.clear()
    
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
            this.companyId = response.id;
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
      this.companyService.addSubscription({
        companyId: this.companyId,
        subscriptionType: this.subscriptionType.value,
        year: 1,
        paymentType: this.paymentMethod.value,
        discountCode: this.discountCodeForm.get('code')?.value
      } as SubscriptionCompanyDto)
      .subscribe({
        next: response => {
          if (response) {
            const gtmTag = {
              event: 'add_company',
            };
            this.gtmService.pushTag(gtmTag);
            this.router.navigate([this.REDIRECT_AFTER_ADD, {added: 'yes'}]);
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
      this.registerCompanyMoreInfo.markAllAsTouched();
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

  getSubscriptionValue() {
    return this.registerCompanyMoreInfo.get('subscriptionType')?.value;
  }

  getPaymentValue() {
    return this.registerCompanyMoreInfo.get('paymentMethod')?.value;
  }

  getPriceValue() {
    const subscriptionType = this.registerCompanyMoreInfo.get('subscriptionType')?.value;
    if (subscriptionType) {
      this.pricelistService.getPrice("SUBSCRIPTION_" + subscriptionType).subscribe({
        next: response => {
          if (response.promotionPrice) {
            this.price = response.price;
          } else {
            this.price = response.price;
          }
        },
        error: err => {
          this.price = "Błąd pobierania ceny";
        }
      });
    } else {
      this.price = "Nie udało się pobrać typu subskrypcji";
    }
  }

  showCodeForm() {
    this.codeForm  = !this.codeForm;
  }

  checkDiscountCode() {
    this.codeError = "";
    this.codeOk = "";
    this.priceWithCode = ""
    
    const userCode = this.discountCodeForm.get('code')?.value;
    const subName = "SUBSCRIPTION_" + this.registerCompanyMoreInfo.get('subscriptionType')?.value;
    if(this.discountCodeForm.valid) {
  
      this.discountCodeService.getCode(userCode).subscribe({
        next: response => {
          if (response) {
            if (response.subscriptionName === subName) {
              this.priceWithCode = this.price * response.discountAmount
              this.codeOk = "Kod rabatowy aktywowany"
            } else {
              this.codeError = "Kod rabatowy niepoprawny";
            }
          }
        },
        error: err => {
          if (err.status == 400) {
            this.priceWithCode = "";
            this.codeError = "Kod rabatowy niepoprawny";
          } else {
            this.codeError = "Wystąpił błąd serwera";
          }
          
        }
      })

    }
  }
}


