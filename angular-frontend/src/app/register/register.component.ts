import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../customer';
import { ApiCustomerService } from '../api/api-customer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  customer: Customer = new Customer();
  constructor(private apiCustomerService: ApiCustomerService, private router: Router) { }

  ngOnInit(): void {
  }

  saveCustomer() {
    this.apiCustomerService.createCustomer(this.customer).subscribe(data => {
      this.goToHome();
    }, error => console.log(error));
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  onSubmit() {
    this.saveCustomer();
  }
}
