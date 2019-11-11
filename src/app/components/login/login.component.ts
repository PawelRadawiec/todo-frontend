import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthService } from 'src/app/shared/service/hardcoded-auth.service';

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

  constructor(
    private router: Router,
    private authService: HardcodedAuthService
  ) { }

  ngOnInit() {
  }

  handleLogin() {
    if (this.authService.authenticate(this.login, this.password)) {
      this.invalidLogin = false;
      this.router.navigate(['welcome', this.login]);
    } else {
      this.invalidLogin = true;
    }
  }

}
