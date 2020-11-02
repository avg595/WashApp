import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-customer',
  templateUrl: './navbar-customer.component.html',
  styleUrls: ['./navbar-customer.component.css']
})
export class NavbarCustomerComponent implements OnInit {

  userSessionId: any = sessionStorage.getItem('id');
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/home']);
  }
}
