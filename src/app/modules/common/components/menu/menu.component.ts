import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from 'src/app/shared/service/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit() {
  }

  isUserLoggedIn() {
    return this.authService.isUserLoggedIn();
  }


}
