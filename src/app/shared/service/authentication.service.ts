import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenResponse} from '../../store/authentication/model/token-response';

export const TOKEN = 'token';
export const AUTH_USER = 'authUser';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

  authorizationRequest(login: string, password: string) {
    const body = {
      username: login,
      password: password
    };
    return this.http.post<TokenResponse>('http://localhost:8080/authenticate', body);
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

