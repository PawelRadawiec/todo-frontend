import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = 'test';
  password = '';
  errorMessage = 'Invalid credentials';
  invalidLogin = false;

  constructor() { }

  ngOnInit() {
  }

  handleLogin() {
    console.log('Login: ', this.login, 'password: ', this.password);
    if(this.login === 'test' && this.password === 'dummy') {
      this.invalidLogin = false;
    } else {
      this.invalidLogin = true;
    }
  }

}
