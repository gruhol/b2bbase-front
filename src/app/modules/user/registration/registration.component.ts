import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from './registration.service';
import { Router } from '@angular/router';
import { JwtService } from '../../common/service/jwt.service';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registerForm!: FormGroup;
  firstName!: FormControl;
  lastName!: FormControl;
  username!: FormControl;
  password!: FormControl;
  repeatPassword!: FormControl;
  phone!: FormControl;
  regulationsAgreement!: FormControl;
  emailAgreement!: FormControl;
  smsAgreement!: FormControl;
  validationErrors = new Map<string, String>();
  REDIRECT_ROUTE: string = "/registered";
  buttonSend: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService,
    private jwtService: JwtService,
    private router: Router,
    private gtmService: GoogleTagManagerService,
  ) {}

  ngOnInit(): void {
    this.createRegistrationFormControls();
    this.createForm();
  }

  register() {
    this.validationErrors.clear()
    if(this.registerForm.valid) {
      this.jwtService.deleteToken();
      this.buttonSend = true;
      this.registrationService.register(this.registerForm.value)
      .subscribe({
        next: response => {
          const gtmTag = {
            event: 'registration_user',
          };
          this.gtmService.pushTag(gtmTag);

          if (response) {
            this.router.navigate([this.REDIRECT_ROUTE, {registration: 'yes'}]);
          }

        },
        error: err => {
          if(err.error.message) {
            for (const errorfield of Object.keys(err.error.fields)) {
              this.validationErrors.set(errorfield, err.error.fields[errorfield]);
            }
          }
        }
      });

    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  createRegistrationFormControls() {
    this.firstName = new FormControl('', [Validators.required, Validators.minLength(3)]);
    this.lastName = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.username = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(8)]);
    this.repeatPassword = new FormControl('', [Validators.required]);
    this.phone = new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(9), Validators.maxLength(11)]);
    this.regulationsAgreement = new FormControl('', [Validators.required]);
    this.emailAgreement = new FormControl('');
    this.smsAgreement = new FormControl('');
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password,
      repeatPassword: this.repeatPassword,
      phone: this.phone,
      regulationsAgreement: this.regulationsAgreement,
      emailAgreement: this.emailAgreement,
      smsAgreement: this.smsAgreement
    }, {validators: this.validateAreEqual})
  }

  public validateAreEqual(c: AbstractControl): {notsame: boolean} | null {
    return  c.value.password  ===  c.value.repeatPassword ? null : {notsame: true};
  }

}
