import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailSenderService {

  constructor(private http: HttpClient) { }

  sendEmail(slug: string): Observable<any> {
    return this.http.get<any>(`api/catalog/company/${slug}`);
  }
}
