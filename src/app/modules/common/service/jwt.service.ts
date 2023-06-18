import { Injectable, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { LoginService } from '../../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private role!: Array<string>;
  
  constructor() { }
  
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

  setRole(roles: Array<string>) {
    this.role = roles;
  }

  hasRole(checkRole: string): boolean {
    console.log("Szukana rola: " + checkRole)
    console.log("Dostepne role: " + this.role)
    return this.role?.includes(checkRole);
  }

  getRole(): string[] {
    return this.role;
  }
}
