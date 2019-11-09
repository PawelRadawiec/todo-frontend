import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit() {
  }

  handleLogin() {
    if (this.login === 'test' && this.password === 'dummy') {
      this.invalidLogin = false;
      this.router.navigate(['welcome', this.login]);
    } else {
      this.invalidLogin = true;
    }
  }

}
