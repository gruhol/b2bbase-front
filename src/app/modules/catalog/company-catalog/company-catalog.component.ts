import { Component, OnInit } from '@angular/core';
import { CompanyCatalog } from '../dto/CompanyCatalog';
import { CatalogServiceService } from '../catalog-service.service';

@Component({
  selector: 'app-company-catalog',
  templateUrl: './company-catalog.component.html',
  styleUrls: ['./company-catalog.component.scss']
})
export class CompanyCatalogComponent implements OnInit {

  companies!: CompanyCatalog[];

  constructor(private companyCatalogService: CatalogServiceService) { }
  
  ngOnInit(): void {
    this.getCompanies()
  }

  getCompanies() {
    this.companyCatalogService.getCompany().subscribe(company => this.companies = company.content);
  }

}
