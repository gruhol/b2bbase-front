import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../catalog-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyCatalogExtended } from '../dto/CompanyCatalogExtended';
import { SocialToCatalog } from '../dto/SocalToCatalog';
import { faFacebook, faLinkedin, faInstagram, faYoutube, faTwitter, faTiktok, IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { Meta, Title } from '@angular/platform-browser';
import { commonValues } from 'src/app/shared/common-values';

@Component({
  selector: 'app-company-catalog',
  templateUrl: './company-catalog.component.html',
  styleUrls: ['./company-catalog.component.scss']
})
export class CompanyCatalogComponent implements OnInit {

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
  
  constructor(
    private activatedRouter: ActivatedRoute,
    private catalogService: CatalogService,
    private titleService: Title,
    private meta: Meta,
    private router: Router
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
}
