import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../catalog-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyCatalogExtended } from '../dto/CompanyCatalogExtended';
import { SocialToCatalog } from '../dto/SocalToCatalog';
import { faFacebook, faLinkedin, faInstagram, faYoutube, faTwitter, faTiktok, IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { Meta, Title } from '@angular/platform-browser';
import { commonValues } from 'src/app/shared/common-values';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailSenderService } from '../../common/service/email-sender.service';
import { EmailData } from './dto/EmailData';

@Component({
  selector: 'app-company-catalog',
  templateUrl: './company-catalog.component.html',
  styleUrls: ['./company-catalog.component.scss']
})
export class CompanyCatalogComponent implements OnInit {

  sendMassageForm!: FormGroup;
  name!: FormControl;
  email!: FormControl;
  phone!: FormControl;
  message!: FormControl;
  company!: CompanyCatalogExtended;
  socials!: SocialToCatalog[];
  notFound: boolean = false;
  //icons
  faFacebook = faFacebook;
  faLinkedin = faLinkedin;
  faInstagram = faInstagram;
  faYouTube = faYoutube;
  faTwitter = faTwitter;
  faTiktok = faTiktok;
  formBuilder: any;
  
  constructor(
    private activatedRouter: ActivatedRoute,
    private catalogService: CatalogService,
    private titleService: Title,
    private meta: Meta,
    private emailSender: EmailSenderService
  ) {}

  ngOnInit(): void {
    let slug = this.activatedRouter.snapshot.params['slug'];
    this.catalogService.getCompany(slug)
      .subscribe({
        next: response => {
          this.company = response;
          this.getSocials(response.id)
          this.titleService.setTitle('Hurtownia '  + this.company.name + " - " + commonValues.userSite);

          const parser = new DOMParser();
          const decodedString = parser.parseFromString(`<!doctype html><body>${this.company.description}`, 'text/html').body.textContent;

          this.meta.updateTag({ name: 'description', content: decodedString!.substring(0, 170) });
        },
        error: () => this.notFound = true
      }); 
  }

  getSocials(id: number): void {
    this.catalogService.getSocial(this.company?.id)
      .subscribe({
        next: response => {
          this.socials = response;
        }
      })
  }

  getIcon(icon: string): IconDefinition {
    switch (icon) {
      case 'FACEBOOK':
        return faFacebook
      case 'INSTAGRAM':
        return faInstagram;
      case 'LINKEDIN':
        return faLinkedin;
      case 'TWITTER':
        return faTwitter;
      case 'YOUTUBE':
        return faYoutube;
      default:
        return faTiktok;
    }
  }

  createForm() {
    this.sendMassageForm = this.formBuilder.group({
      name: this.name,
      email: this.email,
      phone: this.phone,
      message: this.message
    })
  }

  createRegistrationFormControls() {
    this.name = new FormControl('', [Validators.required, Validators.minLength(3)]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.phone = new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(9), Validators.maxLength(11)]);
    this.message = new FormControl('', [Validators.required]);
  }

  sendMessage() {
    if(this.sendMassageForm.valid) {
      this.emailSender.sendEmail({
        name: this.name.value,
        email: this.email.value,
        phone: this.phone.value,
        message: this.message.value
      } as EmailData)
      .subscribe({
        next: response => {
          
        },
        error: err => {
          if(err.error.message) {
            
          }
        }
      });

    } else {
      this.sendMassageForm.markAllAsTouched();
    }
  }
}
