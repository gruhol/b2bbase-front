import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { JwtService } from '../../common/service/jwt.service';
import { LoginStatusService } from '../../common/service/login-status.service';

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
  loginError: String = "";


  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private jwtService: JwtService,
    private router: Router,
    private loginStatusService: LoginStatusService,
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
      this.jwtService.deleteToken();
      this.loginService.login(this.loginForm.value)
        .subscribe({
          next: (response) => {
            this.jwtService.setToken(response.token);
            this.loginStatusService.setLoginStatus(true);
            this.router.navigate(["/"]);
          },
          error: err => this.loginError = err.error.message
        })
    }
  }

}
