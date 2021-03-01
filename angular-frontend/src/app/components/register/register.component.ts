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

  saveCustomer() {
    //TODO: email or username already exists
    this.apiCustomerService.createCustomer(this.customer).subscribe(data => {
      this.showSuccess();
      setTimeout(() => {
        this.goToHome();
      }, 1000);
    }, error => console.log(error));
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  onSubmit(data) {
    this.saveCustomer();
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Register ok'});
  }
}
