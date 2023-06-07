import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from './registration.service';
import { catchError } from 'rxjs';

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
  regulations!: FormControl;
  marketing!: FormControl;
  validationErrors = new Map<string, String>();

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService
  ) {}

  ngOnInit(): void {
    this.createRegistrationFormControls();
    this.createForm();
  }

  register() {
    this.validationErrors.clear()
    if(this.registerForm.valid) {
      
      this.registrationService.register(this.registerForm.value)
      .subscribe({
        next: response => {
          //this.jwtService.setToken(response.token);
          //this.router.navigate([this.REDIRECT_ROUTE]);
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
    this.phone = new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(9)]);
    this.regulations = new FormControl('', [Validators.required]);
    this.marketing = new FormControl('');
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password,
      repeatPassword: this.repeatPassword,
      phone: this.phone,
      regulations: this.regulations,
      marketing: this.marketing
    }, {validators: this.validateAreEqual})
  }

  public validateAreEqual(c: AbstractControl): {notsame: boolean} | null {
    return  c.value.password  ===  c.value.repeatPassword ? null : {notsame: true};
  }

}
