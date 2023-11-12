import { Component, OnInit } from '@angular/core';
import { CompanyCatalog } from '../dto/CompanyCatalog';
import { CatalogServiceService } from '../catalog-service.service';
import { Page } from '../../common/model/page';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-company-catalog',
  templateUrl: './company-catalog.component.html',
  styleUrls: ['./company-catalog.component.scss']
})
export class CompanyCatalogComponent implements OnInit {

  page!: Page<CompanyCatalog>;

  constructor(private companyCatalogService: CatalogServiceService) { }
  
  ngOnInit(): void {
    this.getCompanies()
  }

  getCompanies() {
    this.getCompanyPage(0, 5);

    
  }

  private getCompanyPage(page: number, size: number) {
    this.companyCatalogService.getCompany(page, size).subscribe(page => this.page = page);
  }

  onPageEvent(event: PageEvent) {
    this.getCompanyPage(event.pageIndex, event.pageSize);
  }

}
