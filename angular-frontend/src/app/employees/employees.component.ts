import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { ApiEmployeeService } from '../api/api-employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[];
  display: boolean = false;

  employee: Employee = new Employee();

  constructor(private apiEmployeeService: ApiEmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  private getEmployees(){
    this.apiEmployeeService.getEmployeesList().subscribe(data => {
      this.employees = data;
    })
  }

  saveEmployee() {
    this.employee.email = this.employee.email + "@washapp.com";
    this.employee.password = "test";
    this.apiEmployeeService.createEmployee(this.employee).subscribe(data => {
      window.location.reload();
    }, error => console.log(error));
  }
  
  employeeDetails(id: number){
    console.log(id);
  }

  updateEmployee(id: number){
    console.log(id);
  }

  deleteEmployee(id: number){
    this.apiEmployeeService.deleteEmployee(id).subscribe(data=>{
      this.getEmployees();
    })
  }

  showDialog() {
    this.display = true;
  }

  onSubmit(data) {
    this.saveEmployee();
    this.display = false;
  }

  test(){

  }
}
