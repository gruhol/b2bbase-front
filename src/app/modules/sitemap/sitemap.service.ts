import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class SitemapService {

  constructor(private http: HttpClient) { }

  getSitemap(): Observable<string> {
    const url = 'api/sitemap.xml';
    return this.http.get(url, { responseType: 'text' });
  }
}
