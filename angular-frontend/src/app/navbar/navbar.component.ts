import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userSessionId: any = sessionStorage.getItem('id');
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  isLogged() {
    return this.userSessionId === null ? false : true;
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/home']);
    window.location.reload();
  }
}
