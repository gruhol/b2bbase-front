import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialLinkService } from '../social-link.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Social } from '../dto/socjal';

@Component({
  selector: 'app-edit-social-link',
  templateUrl: './edit-social-link.component.html',
  styleUrls: ['./edit-social-link.component.scss']
})
export class EditSocialLinkComponent implements OnInit {
  editSocialForm!: FormGroup;
  private idSocial!: number;
  type!: FormControl;
  url!: FormControl;
  
  types: Map<string, string> = this.createTypeList();
  errorMessage!: string;
  validationErrors = new Map<string, String>();

  constructor(
    private formBuilder: FormBuilder,
    private activateRouter: ActivatedRoute,
    private router: Router,
    private socialLinkService: SocialLinkService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.idSocial = Number(this.activateRouter.snapshot.paramMap.get('id'));
    if (this.idSocial === null ) this.router.navigate(["/social-link"]);
    this.createAddSocialFormControls();
    this.createForm();
    this.getBranch();
  }

  editSocial() {
    if(this.editSocialForm.valid) {
      this.socialLinkService.editSocial({
        id: this.idSocial,
        type: this.type.value,
        url: this.url.value,
      } as Social)
      .subscribe({
        next: response => {
            this.editSocialForm.setValue({
              type: response.type,
              url: response.url,
            });
            this.snackBar.open("Dane oddziału zostały zaktualizowany", '', { duration: 3000 });
        },
        error: err => {
          console.log(err.error);
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

  getBranch() {
    this.socialLinkService.getSocial(this.idSocial)
      .subscribe({
        next: social => {
          this.mapFormValues(social)
        },
        error: social => {
          this.router.navigate(["/branch"])
        }
      })
  }

  createForm() {
    this.editSocialForm = this.formBuilder.group({
      type: this.type,
      url: this.url,
    }
    //, {validators: [this.isCorrectVoivodeship]}
    )
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

  isCorrectVoivodeship(c: AbstractControl): {voivodeship: boolean} | null {
    let types = new Map<string, string>();
    types.set("FACEBOOK","Facebook"),
    types.set("LINKEDIN","LinkedIn"),
    types.set("TWITTER","Twitter"),
    types.set("YOUTUBE","YouTube"),
    types.set("INSTAGRAM","Instagram"),
    types.set("TIKTOK","TikTok");
    return types.has(c.value.legalForm) ? null : {voivodeship: true};
  }

  private mapFormValues(social: Social): void {

    this.editSocialForm.setValue({
      type: social.type,
      url: social.url
    });
  }
}
