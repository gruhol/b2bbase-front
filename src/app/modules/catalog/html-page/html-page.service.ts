import { Injectable } from '@angular/core';
import { HtmlPage } from './dto/HtmlPage';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HtmlPageService {

  constructor(private http: HttpClient) { }

  getPage(slug: String) : Observable<HtmlPage> {
    return this.http.get<HtmlPage>("/api/htmlpage/" + slug)
  }
  
}
