import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer';

@Injectable({
  providedIn: 'root'
})
export class ApiCustomerService {

  private baseURL = "http://localhost:8080/api/v2/customers";
  private baseURL2 = "http://localhost:8080/api/v2/customer";

  constructor(private httpClient: HttpClient) { }
   
  httpHeaders = new HttpHeaders();

  createCustomer(customer: Customer) {
    return this.httpClient.post(`${this.baseURL}`, customer, { headers: this.httpHeaders, observe: 'response'});
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.httpClient.get<Customer>(`${this.baseURL}/${id}`);
  }

  getCustomerByEmail(email: string) {
    return this.httpClient.get<Customer>(`${this.baseURL2}/${email}`, { headers: this.httpHeaders, observe: 'response'});
  }
}
