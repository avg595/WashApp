import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../employee';

@Injectable({
  providedIn: 'root'
})
export class ApiEmployeeService {

  private baseURL = "http://localhost:8080/api/v1/employees";
  private baseURL2 = "http://localhost:8080/api/v1/employee";

  constructor(private httpClient: HttpClient) { }

  getEmployeesList(): Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.baseURL}`);
  }
  
  createEmployee(employee: Employee): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, employee);
  }

  getEmployeeByEmail(email: string) {
    const httpHeaders = new HttpHeaders();
    return this.httpClient.get<Employee>(`${this.baseURL2}/${email}`, { headers: httpHeaders, observe: 'response'});
  }

  deleteEmployee(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
