import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { ApiEmployeeService } from '../api/api-employee.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class EmployeesComponent implements OnInit {

  employees: Employee[];

  display: boolean = false;
  displayUpdate: boolean = false;

  employee: Employee = new Employee();

  constructor(private apiEmployeeService: ApiEmployeeService, private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  private getEmployees(){
    this.apiEmployeeService.getEmployeesList().subscribe(data => {
      this.employees = data;
    })
  }

  private getEmployeeById(id: number){
    this.apiEmployeeService.getEmployeeById(id).subscribe(data => {
      this.employee = data;
    }, error => console.log(error));
  }

  saveEmployee() {
    this.employee.email = this.employee.email + "@washapp.com";
    this.employee.password = "test";
    this.apiEmployeeService.createEmployee(this.employee).subscribe(data => {
      this.getEmployees();
      this.showInfo("Employee saved.");
    }, error => console.log(error));
  }
  
  employeeDetails(id: number){
    console.log(id);
  }

  updateEmployee(id: number){
    this.getEmployeeById(id);
    this.displayUpdate = true;
  }

  deleteEmployee(id: number){
    this.deletePopUpConfirmation(id);
  }

  showDialog() {
    this.employee = new Employee();
    this.display = true;
  }

  onSubmit(data) {
    this.saveEmployee();
    this.display = false;
  }

  onSubmitUpdate(data) {
    this.apiEmployeeService.updateEmployee(this.employee.id, this.employee).subscribe( data =>{
      this.displayUpdate = false;
      this.getEmployees();
      this.showInfo("Employee updated.");
    }, error => console.log(error));
  }

  deletePopUpConfirmation(id: number) {
    this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.apiEmployeeService.deleteEmployee(id).subscribe(data=>{
            this.getEmployees();
          })
          this.showInfo("Employee deleted.");
        },
        reject: () => {
          this.showInfo("Employee not deleted.");
        }
    });
  }

  showInfo(detail: string) {
    this.messageService.add({severity:'info', summary: 'Info', detail: detail});
  }
}
