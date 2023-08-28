import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent {

  registerCompanyForm!: FormGroup;
  name!: FormControl;
  slug!: FormControl;
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
  legalFormList: string[] = Array.of("JDG", "SC", "SJ", "SP", "SK", "SKA", "ZOO", "PSA", "SA");

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createRegistrationFormControls();
    this.createForm();
  }

  createRegistrationFormControls() {
    this.name = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.slug = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.nip = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.regon = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.phone = new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(9), Validators.maxLength(11)]);
  }

  createForm() {
    this.registerCompanyForm = this.formBuilder.group({
      name: this.name,
      slug: this.slug,
      type: this.type,
      legalForm: this.legalForm,
      nip: this.nip,
      regon: this.regon,
      krs: this.krs,
      email: this.email,
      phone: this.phone,
      wwwSite: this.wwwSite,
      wwwStore: this.wwwStore,
    })
  }

  addCompany() {

  }
}
