import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RememberPasswordService {

  constructor(private http: HttpClient) { }

  send(username:string): Observable<boolean> {
    
    return this.http.post<boolean>("/api/remember-password", username);
  }
}
