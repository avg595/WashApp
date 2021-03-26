import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Cart } from '../model/cart';
import { CartDetail } from '../model/cart-detail';
import { Customer } from '../model/customer';

@Injectable({
  providedIn: 'root'
})
export class ApiCartService {

  private baseURL = "http://localhost:8080/api/v5/cart";
  private baseURL2 = "http://localhost:8080/api/v6/cartdetail";

  private _refreshNeeded$ = new Subject<void>();
  
  constructor(private httpClient: HttpClient) { }

  httpHeaders = new HttpHeaders();

  createCart(customer: Customer): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, customer);
  }

  getCartByCustomerId(id: number) {
    return this.httpClient.get<Cart>(`${this.baseURL}/${id}`, { headers: this.httpHeaders, observe: 'response'});
  }

  /* addToCartDetail(cartDetail: CartDetail): Observable<Object>{
    return this.httpClient.post(`${this.baseURL2}`, cartDetail);
  } */

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  addToCartDetail(cartDetail: CartDetail): Observable<Object>{
    return this.httpClient.post(`${this.baseURL2}`, cartDetail)
    .pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

  getCartDetailProductList(cartId: number): Observable<CartDetail[]>{
    return this.httpClient.get<CartDetail[]>(`${this.baseURL2}/${cartId}`);
  }

  getCartDetailByCartIdAndProductId(cartDetail: CartDetail) {
    return this.httpClient.get<CartDetail>(`${this.baseURL2}/${cartDetail.cart.id}/${cartDetail.product.id}`, 
    { headers: this.httpHeaders, observe: 'response'});
  }

  /* updateCartDetailProduct(id: number, cartDetail: CartDetail): Observable<Object>{
    return this.httpClient.put(`${this.baseURL2}/${id}`, cartDetail);
  } */

  updateCartDetailProduct(id: number, cartDetail: CartDetail): Observable<Object>{
    return this.httpClient.put(`${this.baseURL2}/${id}`, cartDetail)
    .pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

  deleteCartDetailProduct(cartId: number, productId: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL2}/${cartId}/${productId}`)
    .pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }
}
