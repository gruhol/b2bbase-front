import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CompanyCatalog } from './dto/CompanyCatalog';
import { Page } from '../common/model/page';
import { CategoryCatalog } from './dto/CategoryCatalog';
import { CompanyCatalogExtended } from './dto/CompanyCatalogExtended';
import { SocialToCatalog } from './dto/SocalToCatalog';
import { SearchCompanyResult } from '../search/dto/searchCompanyResult';
import { CategoriesWithCompanies } from './dto/CategoriesWithCompanies';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private http: HttpClient) { }

  getCompany(slug: string): Observable<CompanyCatalogExtended> {
    return this.http.get<CompanyCatalogExtended>(`api/catalog/company/${slug}`);
  }

  getCategory(): Observable<CategoryCatalog[]> {
    return this.http.get<CategoryCatalog[]>("api/catalog/category");
  }

  getCategoryBySlug(slug: string): Observable<CategoryCatalog[]> {
    return this.http.get<CategoryCatalog[]>("api/catalog/category/" + slug);
  }

  getLastCompanies(howMany: number): Observable<Array<CompanyCatalogExtended>> {
    return this.http.get<Array<CompanyCatalogExtended>>("api/catalog/company/last/" + howMany);
  }

  getSocial(id: number): Observable<SocialToCatalog[]> {
    return this.http.get<SocialToCatalog[]>("api/catalog/company/social/" + id)
  }

  getCompanies(page: number, size: number, categories: number[], voivodeshipSlugs: string[], 
    isEdiCooperation?: boolean, isApiCooperation?: boolean, isProductFileCooperation?: boolean)
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

  getCompaniesWithSlug(slug: string | undefined, page: number, size: number, voivodeshipSlugs: string[], 
    isEdiCooperation?: boolean, isApiCooperation?: boolean, isProductFileCooperation?: boolean)
    : Observable<CategoriesWithCompanies> 
  {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

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

    return this.http.get<CategoriesWithCompanies>("api/catalog/" + slug, { params });
  }

  getSearchResult(keyword: string, 
                  page: number, size: number, 
                  categories: number[], voivodeshipSlugs: string[], 
                  isEdiCooperation?: boolean, isApiCooperation?: boolean, isProductFileCooperation?: boolean)
                  : Observable<SearchCompanyResult> {
    
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

    return this.http.get<SearchCompanyResult>("api/search/" + keyword, {params});
  }
}
