import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userSessionId: string = sessionStorage.getItem('id');
  userSessionName: string = sessionStorage.getItem('name');
  userSessionType: string = sessionStorage.getItem('type');

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  isHomeRoute() {
    return this.router.url.includes('home') ? true: false;
  }

  isShopRoute() {
    return this.router.url.includes('shop') ? true: false;
  }

  isLogged() {
    return this.userSessionId === null ? false : true;
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/home']).then(() =>
      location.reload()
    );
  }
}
