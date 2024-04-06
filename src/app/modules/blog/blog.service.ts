import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../common/model/page';
import { BlogResponse } from './dto/BlogResponse';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  getBlogPosts(page: number, size: number, categories: number[]) : Observable<Page<BlogResponse>> 
  {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (categories.length > 0) {
      params = params.set('categories', categories.join(','));
    }

    return this.http.get<Page<BlogResponse>>("api/blog", { params });
  }
}
