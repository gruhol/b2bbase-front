import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../common/model/page';
import { BlogResponse } from './dto/BlogResponse';
import { BlogCategory } from './dto/BlogCategory';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  getBlogPosts(page: number, size: number, categories: string[]) : Observable<Page<BlogResponse>> 
  {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (categories.length > 0) {
      params = params.set('categories', categories.join(','));
    }

    return this.http.get<Page<BlogResponse>>("api/blog", { params });
  }

  getBlogCategories() : Observable<Array<BlogCategory>> {
    return this.http.get<Array<BlogCategory>>("/api/blog/categories");
  }

  getBlogPost(slug: string): Observable<BlogResponse> {
    return this.http.get<BlogResponse>("/api/blog/" + slug);
  }

  getBlogPostByCategoryName(slug: string, page: number, size: number): Observable<Page<BlogResponse>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<BlogResponse>>("/api/blog/category/" + slug, {params});
  }
  
}
