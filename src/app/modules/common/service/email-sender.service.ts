import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmailData } from '../../catalog/company-catalog/dto/EmailData';

@Injectable({
  providedIn: 'root'
})
export class EmailSenderService {

  constructor(private http: HttpClient) { }

  sendEmail(emailData: EmailData): Observable<boolean> {
    return this.http.get<boolean>(`api/catalog/company/${emailData}`);
  }
}
