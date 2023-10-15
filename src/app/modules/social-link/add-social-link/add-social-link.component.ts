import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SocialLinkService } from '../social-link.service';
import { Social } from '../dto/socjal';

@Component({
  selector: 'app-add-social-link',
  templateUrl: './add-social-link.component.html',
  styleUrls: ['./add-social-link.component.scss']
})
export class AddSocialLinkComponent {
  addSocialForm!: FormGroup;
  url!: FormControl;
  type!: FormControl;
  types: Map<string, string> = this.createTypeList();
  errorMessage!: string;
  validationErrors = new Map<string, String>();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private socialLinkService: SocialLinkService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.createAddSocialFormControls();
    this.createForm();
  }

  addSocial() {
    if(this.addSocialForm.valid) {
      this.socialLinkService.addSocial({
        type: this.type.value,
        url: this.url.value
      } as Social)
      .subscribe({
        next: response => {
            this.snackBar.open("Link zostały dodany", '', { duration: 3000 });
            this.router.navigate(["/social-link"]);
        },
        error: err => {
          if (typeof(err.error.fields) === 'object') {
            for (const errorfield of Object.keys(err.error.fields)) {
              this.validationErrors.set(errorfield, err.error.fields[errorfield]);
            }
          } else if( typeof(err.error.message) === 'string') {
            this.errorMessage = err.error.message;
          }
        }
      });
    }
  }

  createAddSocialFormControls() {
    this.url = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(250), Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]);
    this.type = new FormControl('', [Validators.required]);
  }

  createTypeList(): Map<string, string> {
    let types = new Map<string, string>();
    types.set("FACEBOOK","Facebook"),
    types.set("LINKEDIN","LinkedIn"),
    types.set("TWITTER","Twitter"),
    types.set("YOUTUBE","YouTube"),
    types.set("INSTAGRAM","Instagram"),
    types.set("TIKTOK","TikTok");
    return types;
  }

  createForm() {
    this.addSocialForm = this.formBuilder.group({
      url: this.url,
      type: this.type,
    }
    //, {validators: [this.isCorrectVoivodeship]}
    )
  }

  isCorrectVoivodeship(c: AbstractControl): {voivodeship: boolean} | null {
    let voivodeshipMap = new Map<string, string>();
    voivodeshipMap.set("DS","dolnośląskie"),
    voivodeshipMap.set("KP", "kujawsko-pomorskie");
    return voivodeshipMap.has(c.value.legalForm) ? null : {voivodeship: true};
  }
}
