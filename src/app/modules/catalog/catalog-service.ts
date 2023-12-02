import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CompanyCatalog } from './dto/CompanyCatalog';
import { Page } from '../common/model/page';
import { CategoryCatalog } from './dto/CategoryCatalog';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private http: HttpClient) { }

  getCompany(page: number, size: number): Observable<Page<CompanyCatalog>> {
    return this.http.get<Page<CompanyCatalog>>(`api/catalog/?page=${page}&size=${size}`);
  }

  getCategory(): Observable<CategoryCatalog[]> {
    return this.http.get<CategoryCatalog[]>("api/catalog/category");
  }

  getCompanies(page: number, size: number, categories: number[], voivodeshipSlugs: string[], isEdiCooperation?: boolean, isApiCooperation?: boolean, isProductFileCooperation?: boolean)
  : Observable<Page<CompanyCatalog>> 
  {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (categories.length > 0) {
      params = params.set('categories', categories.join(','));
    }
    if (voivodeshipSlugs.length > 0) {
      params = params.set('voivodeshipSlugs', voivodeshipSlugs.join(','));
    }
    if (isEdiCooperation !== undefined) {
      params = params.set('isEdiCooperation', isEdiCooperation.toString());
    }
    if (isApiCooperation !== undefined) {
      params = params.set('isApiCooperation', isApiCooperation.toString());
    }
    if (isProductFileCooperation !== undefined) {
      params = params.set('isProductFileCooperation', isProductFileCooperation.toString());
    }

    return this.http.get<Page<CompanyCatalog>>("api/catalog/wholesales", { params });
  }
}
