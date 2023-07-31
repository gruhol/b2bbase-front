import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RememberPasswordService } from './remember-password.service';

@Component({
  selector: 'app-remember-password',
  templateUrl: './remember-password.component.html',
  styleUrls: ['./remember-password.component.scss']
})
export class RememberPasswordComponent implements OnInit{

  username!: FormControl;
  remember!: FormGroup;
  success!: string;

  constructor(
    private formBuilder: FormBuilder,
    private rememberPasswordService: RememberPasswordService
  ) {}

  ngOnInit(): void {
    this.createRememberFormControls();
    this.createForm();
  }

  createRememberFormControls() {
    this.username = new FormControl('', [Validators.required, Validators.email]);
  }

  createForm() {
    this.remember = this.formBuilder.group({
      username: this.username,
    })
  }

  rememberPassword(){
    if(this.remember.valid) {
      this.rememberPasswordService.send(this.remember.value.username)
      .subscribe({
        next: response => {
          if (response) {
           this.success = "yes";
          }
        },
        error: err => {
          if (err) {
            this.success = "no";
          }
        }
      });

    } else {
      this.remember.markAllAsTouched();
    }
  }
}
