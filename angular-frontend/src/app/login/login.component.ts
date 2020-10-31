import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../customer';
import { ApiCustomerService } from '../api/api-customer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  customer: Customer = new Customer();
  constructor(private apiCustomerService: ApiCustomerService, private router: Router) { }

  ngOnInit(): void {
  }

  goToShop() {
    this.router.navigate(['/shop']);
  }

  onSubmit(data) {
    this.apiCustomerService.getCustomerByEmail(this.customer.email).subscribe(response => {
      if (response.status === 200) {
        console.log(response.body);
        if (response.body.password === this.customer.password) {
          sessionStorage.setItem('id', response.body.id.toString());
          this.goToShop();
        } else {
          console.log("PASS ERR");
        }
      } 
    }, error => {
      console.log(error)
    })
  }
}
