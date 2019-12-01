import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http: HttpClient) { }

  executeAuthService(login: string, password: string) {
    const basicAuthHeaderString = 'Basic ' + window.btoa(login + ':' + password);
    const headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    });
    return this.http.get<AuthenticationBean>('http://localhost:8080/basicauth', { headers }).pipe(
      map(
        data => {
          sessionStorage.setItem('authUser', login);
          sessionStorage.setItem('token', basicAuthHeaderString);
          return data;
        }
      )
    );
  }

  getAuthUser() {
    return sessionStorage.getItem('authUser');
  }

  getAuthToken() {
    if (this.getAuthUser()) {
      return sessionStorage.getItem('token');
    }
  }

  isUserLoggedIn() {
    return sessionStorage.getItem('authUser') !== null;
  }

  logout() {
    sessionStorage.removeItem('authUser');
    sessionStorage.removeItem('token');
  }
}

export class AuthenticationBean {
  message: string;
}
