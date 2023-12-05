import { Component } from '@angular/core';
import { CompanyCatalog } from '../dto/CompanyCatalog';
import { CatalogService } from '../catalog-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company-catalog',
  templateUrl: './company-catalog.component.html',
  styleUrls: ['./company-catalog.component.scss']
})
export class CompanyCatalogComponent {

  company!: CompanyCatalog;

  constructor(
    private router: ActivatedRoute,
    private catalogService: CatalogService
  ) {
    let slug = this.router.snapshot.params['slug'];
    this.catalogService.getCompany(slug)
      .subscribe(data => {
        this.company = data;
        console.log(this.company)
      });
    
  }
}
