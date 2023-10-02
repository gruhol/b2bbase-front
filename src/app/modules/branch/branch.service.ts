import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Branch } from './model/branch';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private http: HttpClient) { }

  getBranchs(): Observable<Array<Branch>> {
    return this.http.get<Array<Branch>>("/api/branch/list")
  }

  getBranch(): Observable<Branch> {
    return this.http.get<Branch>("/api/branch/")
  }

}
