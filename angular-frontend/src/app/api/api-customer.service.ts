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

  createCustomer(customer: Customer): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, customer);
  }

  getCustomerByEmail(email: string) {
    const httpHeaders = new HttpHeaders();
    return this.httpClient.get<Customer>(`${this.baseURL2}/${email}`, { headers: httpHeaders, observe: 'response'});
  }
}
