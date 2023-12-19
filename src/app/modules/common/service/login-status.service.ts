import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginStatusService {

  private loginSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  getLoginStatus(): Observable<boolean> {
    return this.loginSubject.asObservable();
  }

  setLoginStatus(status: boolean): void {
    this.loginSubject.next(status);
  }
}
