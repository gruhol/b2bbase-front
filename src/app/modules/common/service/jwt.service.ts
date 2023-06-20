import { Injectable, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class JwtService {

  role!: string[];
  
  constructor(private http: HttpClient) { }
  
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

  hasRole(checkRole: string): boolean {
    this.updateRole(this.getToken());
    return this.role.includes(checkRole);
  }

  updateRole(token: string | null): void {
    if (this.role == null) {
      this.http.post<string[]>("/api/getRole", token).subscribe({
        next: (response) => {
          this.role = response;
        },
      });
      console.log("Aktualizuje role: " +  this.role)
    }
  }
}
