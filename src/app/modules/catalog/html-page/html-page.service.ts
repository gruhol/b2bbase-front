import { Injectable } from '@angular/core';
import { HtmlPage } from './dto/HtmlPage';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HtmlPageService {

  constructor(private http: HttpClient) { }

  getPage2(slug: String) : Observable<HtmlPage> {
    return this.http.get<HtmlPage>("/api/page/" + slug)
  }

  getPage(slug: string): Observable<HtmlPage> {
    const examplePage: HtmlPage = {
      title: "Przykładowa strona",
      content: "<p>To jest przykładowa treść strony HTML.</p>",
      slug: "przykladowa-strona"
    };

    return new Observable<HtmlPage>((observer) => {
      observer.next(examplePage);
      observer.complete();
    });
  }
  
}
