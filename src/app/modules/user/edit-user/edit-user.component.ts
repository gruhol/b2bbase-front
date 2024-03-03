import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { JwtService } from '../../common/service/jwt.service';
import { Router } from '@angular/router';
import { EditUserService } from './edit-user.service';
import { EditUser } from './dto/edituser';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
  editUserForm!: FormGroup;
  firstName!: FormControl;
  lastName!: FormControl;
  username!: FormControl;
  password!: FormControl;
  newPassword!: FormControl;
  repeatNewPassword!: FormControl;
  errorMessage!: string;
  phone!: FormControl;
  emailAgreement!: FormControl;
  smsAgreement!: FormControl;

  validationErrors = new Map<string, String>();
  REDIRECT_ROUTE: string = "/registered";
  selectItem!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private editUserService: EditUserService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.createEditUserFormControls();
    this.createForm();

    this.editUserService.getUser()
    .subscribe({
      next: user => {
        this.editUserForm.patchValue({
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          emailAgreement: user.emailAgreement,
          smsAgreement: user.smsAgreement
        });
      }
    });
  }

  submit() {
    this.validationErrors.clear()
    if(this.editUserForm.valid) {
      this.editUserService.editUser({
        firstName: this.editUserForm.get('firstName')?.value,
        lastName: this.editUserForm.get('lastName')?.value,
        username: this.editUserForm.get('username')?.value,
        phone: this.editUserForm.get('phone')?.value,
        password: this.editUserForm.get('password')?.value,
        newPassword: this.editUserForm.get('newPassword')?.value,
        repeatNewPassword: this.editUserForm.get('repeatNewPassword')?.value,
        emailAgreement: this.editUserForm.get('emailAgreement')?.value,
        smsAgreement: this.editUserForm.get('smsAgreement')?.value,
      } as EditUser)
      .subscribe({
        next: response => {
          this.editUserForm.patchValue({
            username: response.username,
            firstName: response.firstName,
            lastName: response.lastName,
            phone: response.phone,
            emailAgreement: response.emailAgreement,
            smsAgreement: response.smsAgreement
          });
          this.snackBar.open("Dane użytkownika zaaktualizowane", '', { duration: 3000 });
        },
        error: err => {
          if(err.error.message) {
            if( typeof(err.error.message) === 'string' ) {
              this.errorMessage = err.error.message;
            } else {
              for (const errorfield of Object.keys(err.error.fields)) {
                this.validationErrors.set(errorfield, err.error.fields[errorfield]);
              }
            }
          }
          
        }
      });

    } else {
      this.editUserForm.markAllAsTouched();
    }
  }

  createEditUserFormControls() {
    this.firstName = new FormControl('', [Validators.required, Validators.minLength(3)]);
    this.lastName = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.username = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.minLength(8)]);
    this.newPassword = new FormControl('', [Validators.minLength(8)]);
    this.repeatNewPassword = new FormControl('', [Validators.minLength(8)]);
    this.phone = new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(9), Validators.maxLength(11)]);
    this.emailAgreement = new FormControl('');
    this.smsAgreement = new FormControl('');
  }

  createForm() {
    this.editUserForm = this.formBuilder.group({
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password,
      newPassword: this.newPassword,
      repeatNewPassword: this.repeatNewPassword,
      phone: this.phone,
      emailAgreement: this.emailAgreement,
      smsAgreement: this.smsAgreement
    }, {validators: this.validateAreEqual})
  }

  public validateAreEqual(c: AbstractControl): {notsame: boolean} | null {
    return  c.value.newPassword  ===  c.value.repeatNewPassword ? null : {notsame: true};
  }

}
