import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Social } from './dto/socjal';

@Injectable({
  providedIn: 'root'
})
export class SocialLinkService {

  constructor(private http: HttpClient) { }

  getSocials(): Observable<Array<Social>> {
    return this.http.get<Array<Social>>("/api/social")
  }

  getSocial(id: number): Observable<Social> {
    return this.http.get<Social>("/api/social/" + id)
  }

  editSocial(social: Social): Observable<Social> {
    return this.http.put<Social>("/api/social", social)
  }

  addSocial(social: Social): Observable<Social> {
    return this.http.post<Social>("/api/social", social)
  }

  deleteSocial(id: number): Observable<void> {
    return this.http.delete<void>("api/social/" + id);
  }
}
