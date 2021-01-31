package net.javaguides.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.model.Cart;
import net.javaguides.springboot.repository.CartRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v5")
public class CartController {

	@Autowired
	private CartRepository cartRepository;
	
	// create cart rest api
	@PostMapping("/cart")
	public Cart createCart(@RequestBody Cart cart) {
		return cartRepository.save(cart);
	}
	
	// get cart by customer id
	@GetMapping("cart/{customerId}")
	public ResponseEntity<Cart> getCartByCustomerId(@PathVariable Long customerId) {

		Cart cart = cartRepository.findByCustomerId(customerId)
				.orElseThrow(() -> new ResourceNotFoundException("Cart not exist with customer id : " + customerId));

		return ResponseEntity.ok(cart);
	}
}
