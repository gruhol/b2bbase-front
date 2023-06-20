import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { JwtService } from '../common/service/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username!: FormControl;
  password!: FormControl;
  loginForm!: FormGroup;
  validationErrors = new Map<string, String>();

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private jwtService: JwtService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createRegistrationFormControls();
    this.createForm();
  }

  createRegistrationFormControls() {
    this.username = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      username: this.username,
      password: this.password
    })
  }

  login() {
    if(this.loginForm.valid) {
      this.loginService.login(this.loginForm.value)
        .subscribe({
          next: (response) => {
            this.jwtService.setToken(response.token);
            this.router.navigate(["/"]);
          },
          error: err => {
            if(err.error.message) {
              for (const errorfield of Object.keys(err.error.fields)) {
                this.validationErrors.set(errorfield, err.error.fields[errorfield]);
              }
            }
          }
        })
    }
  }

}
