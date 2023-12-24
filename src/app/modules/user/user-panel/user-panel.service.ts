import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyToEditDto } from 'src/app/modules/company/add-company/dto/CompanyToEditDto';
import { PackageOrderToCatalog } from './dto/PackageOrderToCatalog';

@Injectable({
  providedIn: 'root'
})
export class UserPanelService {

  constructor(private http: HttpClient) { }

  getCompany(): Observable<CompanyToEditDto> {
    return this.http.get<CompanyToEditDto>('/api/company/user');
  }

  getOrders(): Observable<Array<PackageOrderToCatalog>> {
    return this.http.get<Array<PackageOrderToCatalog>>('/api/subscription/getOrders');
  }
}
