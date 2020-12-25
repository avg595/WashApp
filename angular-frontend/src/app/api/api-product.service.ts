import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { File } from '../file';

@Injectable({
  providedIn: 'root'
})
export class ApiProductService {

  private baseURL = "http://localhost:8080/api/v3/products";
  private imageURL = "http://localhost:8080/api/v4/upload";
  private getImageURL = "http://localhost:8080/api/v4/get";

  constructor(private httpClient: HttpClient) { }

  getProductsList(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.baseURL}`);
  }

  createProduct(product: Product): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, product);
  }

  getProductById(id: number): Observable<Product>{
    return this.httpClient.get<Product>(`${this.baseURL}/${id}`);
  }

  updateProduct(id: number, product: Product): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, product);
  }

  deleteProduct(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  updateProductImage(id: number, uploadImageData: FormData) {
    const httpHeaders = new HttpHeaders();
    return this.httpClient.post(`${this.imageURL}/${id}`, uploadImageData, { headers: httpHeaders, observe: 'response'});
  }

  getProductImage(id: number){
    const httpHeaders = new HttpHeaders();
    return this.httpClient.get<File>(`${this.getImageURL}/${id}`, { headers: httpHeaders, observe: 'response'});
  }
}
