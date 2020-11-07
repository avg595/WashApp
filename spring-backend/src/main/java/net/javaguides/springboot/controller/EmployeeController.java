package net.javaguides.springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.model.Customer;
import net.javaguides.springboot.model.Employee;
import net.javaguides.springboot.repository.EmployeeRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1")
public class EmployeeController {

	@Autowired
	private EmployeeRepository employeeRepository;
	
	// get all employees
	@GetMapping("/employees")
	public List<Employee> getAllEmployees() {
		return employeeRepository.findAll();
	}
	
	// get employee by id
	@GetMapping("employees/{id}")
	public ResponseEntity<Employee> getEmpoyeeById(@PathVariable Long id) {
		
		Employee employee = employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id : " + id));
		
		return ResponseEntity.ok(employee);
	}
	
	// get employee by email
	@GetMapping("/employee/{email}")
	public ResponseEntity<Employee> getCustomerByEmail(@PathVariable String email) {

		Employee employee = employeeRepository.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with email : " + email));

		return ResponseEntity.ok(employee);
	}
}
