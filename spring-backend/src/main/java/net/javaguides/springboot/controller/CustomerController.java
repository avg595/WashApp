package net.javaguides.springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.javaguides.springboot.model.Customer;
import net.javaguides.springboot.repository.CustomerRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v2")
public class CustomerController {

	@Autowired
	private CustomerRepository customerRepository;
	
	// get all customers
	@GetMapping("/customers")
	public List<Customer> getAllCustomers() {
		return customerRepository.findAll();
	}
	
	// create customer rest api
	@PostMapping("/customers")
	public Customer createCustomer(@RequestBody Customer customer) {
		return customerRepository.save(customer);
	}
}