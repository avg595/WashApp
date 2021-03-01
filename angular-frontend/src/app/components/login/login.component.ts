import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../../model/customer';
import { ApiCustomerService } from '../../api/api-customer.service';
import { ApiEmployeeService } from '../../api/api-employee.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  customer: Customer = new Customer();
  constructor(private apiCustomerService: ApiCustomerService, private apiEmployeeService: ApiEmployeeService, 
              private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  employeeLogin(formData) {
    this.apiEmployeeService.getEmployeeByEmail(formData.email).subscribe(response => {
      if (response.status === 200) {
        if (response.body.password === formData.password) {
          if (response.body.id === 1) {
            this.setSessionStorage(response.body.id.toString(), response.body.email, "admin");
            this.showSuccess();
            setTimeout(() => {
              this.goToAdminPanel();
            }, 1000);
          } else {
            this.setSessionStorage(response.body.id.toString(), response.body.email, "employee");
            this.showSuccess();
            setTimeout(() => {
              console.log("worker");
            }, 1000);
          }
        } else {
          this.showError("Wrong password");
        }
      } 
    }, error => {
      if (error.status === 404) {
        this.showError("Wrong email");
      } else {
        console.log(error);
      }
    })
  }

  customerLogin(formData) {
    this.apiCustomerService.getCustomerByEmail(formData.email).subscribe(response => {
      if (response.status === 200) {
        if (response.body.password === formData.password) {
          this.setSessionStorage(response.body.id.toString(), response.body.name, "customer");
          this.showSuccess();
            setTimeout(() => {
              this.goToShop();
            }, 1000);
        } else {
          this.showError("Wrong password");
        }
      } 
    }, error => {
      if (error.status === 404) {
        this.showError("Wrong email");
      } else {
        console.log(error);
      }
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
      this.employeeLogin(formData);
    } else {
      this.customerLogin(formData);
    }
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Login ok'});
  }

  showError(detail: string) {
    this.messageService.add({severity:'error', summary: 'Error', detail: detail});
  }
}
