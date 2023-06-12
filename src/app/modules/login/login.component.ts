import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

  login() {}

}
