import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StaticPage } from './dto/StaticPage';

@Injectable({
  providedIn: 'root'
})
export class ViewpageService {

  constructor(private http: HttpClient) { }

  getPage(slug: String) : Observable<StaticPage> {
    return this.http.get<StaticPage>("/api/page/" + slug)
  }
}
