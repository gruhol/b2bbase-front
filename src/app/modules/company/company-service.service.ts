import { Injectable } from '@angular/core';
import { CompanyDto } from './add-company/dto/companyDto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CompanyToEditDto } from './add-company/dto/CompanyToEditDto';
import { AdditionalData } from './add-company/dto/AdditionalData';

@Injectable({
  providedIn: 'root'
})
export class CompanyServiceService {
  
  constructor(private http: HttpClient) { }

  addCompany(company: CompanyDto): Observable<CompanyDto>{
    return this.http.post<CompanyDto>("/api/company/add", company);
  }

  getCompany(): Observable<CompanyToEditDto> {
    return this.http.get<CompanyToEditDto>('/api/company/user');
  }

  editCompany(company: CompanyToEditDto): Observable<any> {
    return this.http.post<CompanyToEditDto>('/api/company/user', company);
  }

  editAdditionalData(additionalData: AdditionalData): Observable<any> {
    return this.http.post<AdditionalData>('/api/company/edit-additional-data', additionalData);
  }
}
