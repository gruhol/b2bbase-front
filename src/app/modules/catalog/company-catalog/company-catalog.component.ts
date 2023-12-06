import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../catalog-service';
import { ActivatedRoute } from '@angular/router';
import { CompanyCatalogExtended } from '../dto/CompanyCatalogExtended';
import { SocialToCatalog } from '../dto/SocalToCatalog';
import { faFacebook, faLinkedin, faInstagram, faYoutube, faTwitter, faTiktok, IconDefinition } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-company-catalog',
  templateUrl: './company-catalog.component.html',
  styleUrls: ['./company-catalog.component.scss']
})
export class CompanyCatalogComponent implements OnInit {

  company!: CompanyCatalogExtended;
  socials!: SocialToCatalog[];
  //icons
  faFacebook = faFacebook;
  faLinkedin = faLinkedin;
  faInstagram = faInstagram;
  faYouTube = faYoutube;
  faTwitter = faTwitter;
  faTiktok = faTiktok;

  constructor(
    private router: ActivatedRoute,
    private catalogService: CatalogService,
  ) {}

  ngOnInit(): void {
    let slug = this.router.snapshot.params['slug'];
    this.catalogService.getCompany(slug)
      .subscribe({
        next: response => {
          this.company = response;
          this.getSocials(response.id)
        }
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
