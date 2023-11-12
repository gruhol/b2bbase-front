import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CompanyCatalog } from './dto/CompanyCatalog';
import { Page } from '../common/model/page';

@Injectable({
  providedIn: 'root'
})
export class CatalogServiceService {

  constructor(private http: HttpClient) { }

  getCompany(): Observable<Page<CompanyCatalog>> {
    return this.http.get<Page<CompanyCatalog>>("api/catalog");
  }
}
