import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from 'src/app/shared/service/basic-authentication.service';

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
    private authService: BasicAuthenticationService
  ) { }

  ngOnInit() {
  }

  handleJwtLogin() {
    this.authService.executeJwtAuthService(this.login, this.password)
      .subscribe(
        data => {
          this.router.navigate(['welcome', this.login])
          this.invalidLogin = false
        },
        error => {
          console.log(error),
            this.invalidLogin = true
        }
      )
  }

}
