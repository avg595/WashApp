import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../../model/customer';
import { ApiCustomerService } from '../../api/api-customer.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {

  customer: Customer = new Customer();
  constructor(private apiCustomerService: ApiCustomerService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onSubmit(data) {
    this.saveCustomer();
  }

  saveCustomer() {
    this.apiCustomerService.createCustomer(this.customer).subscribe(response => {
      if (response.status === 200) {
        this.showSuccess();
          setTimeout(() => {
            this.goToHome();
          }, 1000);
      } 
    }, error => {
      if (error.status === 500) {
        this.showError();
      } else {
        console.log(error);
      }
    })
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Register ok'});
  }

  showError() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'User already exists'});
  }
}
