import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SystemUser } from '../models/system-user.model';


@Injectable({
  providedIn: 'root'
})
export class SysteUserService {

  baseUrl = 'http://localhost:8080/user';

  constructor(
    private http: HttpClient
  ) {
  }

  save(request: SystemUser) {
    return this.http.post<SystemUser>(`${this.baseUrl}/create`, request);
  }

  activation(activationCode: string) {
    const activation = {
      activationCode: activationCode
    };
    return this.http.post<any>(`${this.baseUrl}/activation`, activation);
  }


}
