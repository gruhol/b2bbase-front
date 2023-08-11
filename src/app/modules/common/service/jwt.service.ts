import { Injectable, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, tap } from 'rxjs';
import { LoginService } from '../../user/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  roles: string[] = [];
  
  constructor(private http: HttpClient,
    private loginService: LoginService) { }

  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  deleteToken() {
    localStorage.removeItem("token");
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

  hasRole(role: string): Observable<boolean>{
    if (this.roles.length  === 0) {
      return this.saveRole().pipe(
        map(roles => roles.includes(role))
      );
    } else {
      return of(this.roles.includes(role));
    }
  }

saveRole(): Observable<string[]> {
  return this.http.get<string[]>("/api/user/role")
    .pipe(
      tap(roles => this.roles = roles)
    );
  }
}
