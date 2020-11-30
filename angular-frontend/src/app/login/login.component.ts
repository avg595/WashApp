import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../customer';
import { ApiCustomerService } from '../api/api-customer.service';
import { ApiEmployeeService } from '../api/api-employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  customer: Customer = new Customer();
  constructor(private apiCustomerService: ApiCustomerService, private apiEmployeeService: ApiEmployeeService, private router: Router) { }

  ngOnInit(): void {
  }

  adminLogin(formData) {
    this.apiEmployeeService.getEmployeeByEmail(formData.email).subscribe(response => {
      if (response.status === 200) {
        if (response.body.password === formData.password) {
          if (response.body.id === 1) {
            this.setSessionStorage(response.body.id.toString(), response.body.email, "admin");
            this.goToAdminPanel();
          } else {
            this.setSessionStorage(response.body.id.toString(), response.body.email, "employee");
            console.log("worker");
          }
        } else {
          console.log("PASS ERR");
        }
      } 
    }), error => {
      console.log(error);
    }
  }

  customerLogin(formData) {
    this.apiCustomerService.getCustomerByEmail(formData.email).subscribe(response => {
      if (response.status === 200) {
        if (response.body.password === formData.password) {
          this.setSessionStorage(response.body.id.toString(), response.body.name, "customer");
          this.goToShop();
        } else {
          console.log("PASS ERR");
        }
      } 
    }, error => {
      console.log(error);
    })
  }

  goToShop() {
    this.router.navigate(['/shop']);
  }

  goToAdminPanel() {
    this.router.navigate(['/admin'])
  }

  setSessionStorage(id: string, name: string, type: string) {
    sessionStorage.setItem('id', id);
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('type', type);
    sessionStorage.setItem('reload', 'no reload');
  }

  onSubmit(formData) {
    if (formData.email.includes('@washapp.com')) {
      this.adminLogin(formData);
    } else {
      this.customerLogin(formData);
    }
  }
}
