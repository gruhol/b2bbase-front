import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PriceList } from './dto/PriceList';

@Injectable({
  providedIn: 'root'
})
export class PricelistService {

  constructor(private http: HttpClient) { }

  getPrice(name: String): Observable<PriceList> {
    return this.http.get<PriceList>('api/pricelist/getPrice/' + name);
  }
}
