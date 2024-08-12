import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VerificationLinkResponse } from './dto/VerificationLinkResponse';

@Injectable({
  providedIn: 'root'
})
export class LinkveryficationService {

  constructor(private http: HttpClient) { }

  checktoken(token: string): Observable<VerificationLinkResponse> {
    return this.http.get<VerificationLinkResponse>(`api/verify/${token}`);
  }
}
