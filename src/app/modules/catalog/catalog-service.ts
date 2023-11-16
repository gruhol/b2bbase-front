import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CompanyCatalog } from './dto/CompanyCatalog';
import { Page } from '../common/model/page';
import { CategoryToCatalog } from './dto/categoryToCatalog';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private http: HttpClient) { }

  getCompany(page: number, size: number): Observable<Page<CompanyCatalog>> {
    return this.http.get<Page<CompanyCatalog>>(`api/catalog?page=${page}&size=${size}`);
  }

  getCategory(): Observable<CategoryToCatalog[]> {
    return this.http.get<CategoryToCatalog[]>("api/catalog/category");
  }
}
