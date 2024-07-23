import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  constructor(private http: HttpClient) { }

  getPreferemce(key: string): Observable<string> {
    return this.http.get<string>('api/preferences/get/' + key);
  }
}
