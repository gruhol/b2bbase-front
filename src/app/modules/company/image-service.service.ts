import { Injectable } from '@angular/core';
import { UploadResponse } from './additional-data-company/dto/UploadResponse';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  uploadImage(formData: FormData): Observable<UploadResponse> {
    return this.http.post<UploadResponse>('api/img/upload/logos', formData);
  }
}
