import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../customer';

@Injectable({
  providedIn: 'root'
})
export class ApiCustomerService {

  private baseURL = "http://localhost:8080/api/v2/customers";

  constructor(private httpClient: HttpClient) { }

  createCustomer(customer: Customer): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, customer);
  }
}
