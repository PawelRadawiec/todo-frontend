import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthService {

  constructor() { }

  authenticate(login: string, password: string) {
    if (login === 'test' && password === 'dummy') {
      sessionStorage.setItem('authUser', login);
      return true;
    }
    return false;
  }

  isUserLoggedIn() {
    return sessionStorage.getItem('authUser') !== null;
  }

  logout() {
    sessionStorage.removeItem('authUser');
  }

}
