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
import net.javaguides.springboot.model.CartDetail;
import net.javaguides.springboot.repository.CartDetailRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v6")
public class CartDetailController {

	@Autowired
	private CartDetailRepository cartDetailRepository;
	
	// create cart detail rest api
	@PostMapping("/cartdetail")
	public CartDetail createCartDetail(@RequestBody CartDetail cartDetail) {
		return cartDetailRepository.save(cartDetail);
	}
	
	// get cart detail by id
	@GetMapping("cartdetail/{id}")
	public ResponseEntity<CartDetail> getCartDetailById(@PathVariable Long id) {

		CartDetail cartDetail = cartDetailRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Cart detail not exist with id : " + id));

		return ResponseEntity.ok(cartDetail);
	}
}
