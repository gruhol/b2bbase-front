import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SitemapService {

  constructor(private http: HttpClient) { }

  downloadXml(): Observable<Blob> {
    const url = '/api/sitemap.xml';
    return this.http.get(url, { responseType: 'blob' })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Błąd pobierania XML:', error);
    return throwError('Coś poszło nie tak. Spróbuj ponownie później.');
  }
}
