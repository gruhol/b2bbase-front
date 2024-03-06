import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../catalog-service';
import { CompanyCatalogExtended } from '../dto/CompanyCatalogExtended';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{

  lastCompanyParametr: number = 5;
  companies!: Array<CompanyCatalogExtended>;
  
  constructor(
    private catalogService: CatalogService
  ) {}

  ngOnInit(): void {
    this.getLastCompanies();
  }

  getLastCompanies() {
    this.catalogService.getLastCompanies(this.lastCompanyParametr)
    .subscribe({
      next: response => {
        this.companies = response;
      }
    })
  }

}
