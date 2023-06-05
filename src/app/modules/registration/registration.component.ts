import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createRegistrationFormControls();
    this.createForm();
  }

  register() {
      
  }

  createRegistrationFormControls() {
    this.firstName = new FormControl('', [Validators.required, Validators.minLength(3)]);
    this.lastName = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.username = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(8)]);
    this.repeatPassword = new FormControl('', Validators.pattern("{{password.value}}"));
    this.phone = new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(9)]);
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password,
      repeatPassword: this.repeatPassword,
      phone: this.phone,
    })
  }

}
