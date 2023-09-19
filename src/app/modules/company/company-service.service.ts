import { Injectable } from '@angular/core';
import { CompanyDto } from './add-company/dto/companyDto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CompanyToEditDto } from './add-company/dto/CompanyToEditDto';

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
}
