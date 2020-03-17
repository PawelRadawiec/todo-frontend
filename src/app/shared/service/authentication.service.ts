import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

export const TOKEN = 'token';
export const AUTH_USER = 'authUser';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

  executeJwtAuthService(login: string, password: string) {
    const body = {
      username: login,
      password: password
    }
    return this.http.post<any>('http://localhost:8080/authenticate', body).pipe(
      map(
        data => {
          sessionStorage.setItem(AUTH_USER, login);
          sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
          return data;
        })
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

