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

  getBranch(id: number): Observable<Branch> {
    return this.http.get<Branch>("/api/branch/" + id)
  }

  editBranch(branch: Branch): Observable<Branch> {
    return this.http.put<Branch>("/api/branch", branch)
  }

  addBranch(branch: Branch): Observable<Branch> {
    return this.http.post<Branch>("/api/branch", branch)
  }
}
