import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../model/cart';

@Injectable({
  providedIn: 'root'
})
export class ApiCartService {

  private baseURL = "http://localhost:8080/api/v5/cart";

  constructor(private httpClient: HttpClient) { }

  /* createCart(cart: Cart): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, cart);
  } */

  createCart(id: number) {
    const httpHeaders = new HttpHeaders();
    return this.httpClient.post(`${this.baseURL}/${id}`, { headers: httpHeaders, observe: 'response'});
  }

  getCartByCustomerId(id: number) {
    const httpHeaders = new HttpHeaders();
    return this.httpClient.get<Cart>(`${this.baseURL}/${id}`, { headers: httpHeaders, observe: 'response'});
  }
}
