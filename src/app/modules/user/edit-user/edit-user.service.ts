import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './dto/user';

@Injectable({
  providedIn: 'root'
})
export class EditUserService {

  constructor(private http: HttpClient) { }

  editUser(register:any): Observable<any> {
    return this.http.post<any>("/api/register", register);
  }

  getUser(token: string) {
    return this.http.post<User>("/api/getUserByToken", token);
  }

}
