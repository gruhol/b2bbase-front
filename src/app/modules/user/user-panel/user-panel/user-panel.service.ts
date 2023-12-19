import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyToEditDto } from 'src/app/modules/company/add-company/dto/CompanyToEditDto';

@Injectable({
  providedIn: 'root'
})
export class UserPanelService {

  constructor(private http: HttpClient) { }

  getCompany(): Observable<CompanyToEditDto> {
    return this.http.get<CompanyToEditDto>('/api/company/user');
  }
}
