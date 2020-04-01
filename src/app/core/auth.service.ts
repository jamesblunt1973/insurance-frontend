import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ILogin } from '../shared/models/login.model';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  constructor(private router: Router, private http: HttpClient) { }

  login(data: ILogin) {
    return this.http.post(environment.apiUrl + 'users/auth', data);
  }

  register(data: ILogin) {
    return this.http.post(environment.apiUrl + 'auth/register', data);
  }

  private userStatus = new BehaviorSubject<string[]>([]);

  changeUserStatus(items: string[]) {
    this.userStatus.next(items);
  }

  getUsername(): Observable<string[]> {
    return this.userStatus.asObservable();
  }

  checkUser(): boolean | Observable<boolean> {
    var token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['auth/login']);
      return false;
    }
    var un = localStorage.getItem('name');
    var insuranceName = localStorage.getItem('insuranceName');
    this.changeUserStatus([un, insuranceName]);
    return true;
  }

  logout() {
    localStorage.clear();
    this.changeUserStatus([]);
    this.router.navigate(['auth/login']);
  }
}
