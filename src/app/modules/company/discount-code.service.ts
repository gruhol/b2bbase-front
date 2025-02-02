import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DiscountCodeResponse } from './add-company/dto/DiscountCodeResponse';

@Injectable({
  providedIn: 'root'
})
export class DiscountCodeService {

  constructor(private http: HttpClient) { }
  
    getCode(code: String): Observable<DiscountCodeResponse> {
      return this.http.get<DiscountCodeResponse>('api/code/' + code);
    }
}
