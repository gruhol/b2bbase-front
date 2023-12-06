import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../catalog-service';
import { ActivatedRoute } from '@angular/router';
import { CompanyCatalogExtended } from '../dto/CompanyCatalogExtended';

@Component({
  selector: 'app-company-catalog',
  templateUrl: './company-catalog.component.html',
  styleUrls: ['./company-catalog.component.scss']
})
export class CompanyCatalogComponent implements OnInit {

  company!: CompanyCatalogExtended;

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
          console.log(response);
        },
        error: error => {
          
        }
      });
  }
}
