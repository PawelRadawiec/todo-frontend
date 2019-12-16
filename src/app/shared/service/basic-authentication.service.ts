import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export const TOKEN = 'token';
export const AUTH_USER = 'authUser';

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
          sessionStorage.setItem(AUTH_USER, login);
          sessionStorage.setItem(TOKEN, basicAuthHeaderString);
          return data;
        }
      )
    );
  }

  getAuthUser() {
    return sessionStorage.getItem(AUTH_USER);
  }

  getAuthToken() {
    if (this.getAuthUser()) {
      return sessionStorage.getItem(TOKEN);
    }
  }

  isUserLoggedIn() {
    return sessionStorage.getItem(AUTH_USER) !== null;
  }

  logout() {
    sessionStorage.removeItem(AUTH_USER);
    sessionStorage.removeItem(TOKEN);
  }
}

export class AuthenticationBean {
  message: string;
}
