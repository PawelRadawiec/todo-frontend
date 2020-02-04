import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SystemUser } from 'src/app/components/models/system-user.model';

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

}
