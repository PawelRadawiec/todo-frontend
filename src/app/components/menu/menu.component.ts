import { Component, OnInit } from '@angular/core';
import { HardcodedAuthService } from 'src/app/shared/service/hardcoded-auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private authService: HardcodedAuthService) { }

  ngOnInit() {
  }

  isUserLoggedIn() {
    return this.authService.isUserLoggedIn();
  }

}
