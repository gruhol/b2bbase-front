import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendPasswordService {

  constructor(private http: HttpClient) { }

  checktoken(token: string): Observable<boolean> {
    return this.http.get<boolean>(`api/send-password/${token}`);
  }
}
