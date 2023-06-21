import { Injectable, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../login/login.service';
import { Subject, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class JwtService {

  role!: string[];
  
  constructor(private http: HttpClient,
    private loginService: LoginService) { }

  
  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  getToken() : string | null {
    return localStorage.getItem("token");
  }

  isLoggedIn(): boolean {
    let token = localStorage.getItem("token");
    return token != null && this.notExpired(token);
  }
  notExpired(token: string): boolean {
    let tokenDecoded = jwtDecode<any>(token);
    return (tokenDecoded.exp * 1000) > new Date().getTime();
  }

  hasRole(rolea: string): boolean {
    var token = this.getToken();
    let check!: boolean;
    this.loginService.getRole(token).pipe(
       map(response => {check = response.includes(rolea)})
    )

    return check;
  }
}
