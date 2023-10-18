import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryResponse } from './additional-data-company/dto/CategoryResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategory(): Observable<CategoryResponse[]> {
    return this.http.get<CategoryResponse[]>('/api/category');
  }
}
