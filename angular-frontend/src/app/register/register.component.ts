import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../customer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  customer: Customer = new Customer();
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToHome(){
    this.router.navigate(['/home']);
  }

  onSubmit(){
    this.goToHome();
  }
}
