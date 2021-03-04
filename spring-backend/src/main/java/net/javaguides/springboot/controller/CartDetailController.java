package net.javaguides.springboot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.model.CartDetail;
import net.javaguides.springboot.model.Product;
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
	
	// get cart detail products by cart id
	@GetMapping("/cartdetail/{cartId}")
	public List<CartDetail> getCartDetailProductsByCartId(@PathVariable Long cartId) {
		return cartDetailRepository.findByCartId(cartId);
	}
	
	// get cart detail by cart and product id
	@GetMapping("cartdetail/{cartId}/{productId}")
	public ResponseEntity<CartDetail> getCartByCustomerId(@PathVariable Long cartId, @PathVariable Long productId) {

		CartDetail cartDetail = cartDetailRepository.findCartDetailByCartIdAndProductId(cartId, productId)
				.orElseThrow(() -> new ResourceNotFoundException("Cart detail not exist with cartId: " + cartId + " and productId: " + productId));

		return ResponseEntity.ok(cartDetail);
	}
	
	// update cart detail product
	@PutMapping("/cartdetail/{id}")
	public ResponseEntity<CartDetail> updateCartDetailProduct(@PathVariable Long id, @RequestBody CartDetail cartDetail){
		
		CartDetail cartDetailProduct = cartDetailRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Cart Detail not exist with id : " + id));
		
		cartDetailProduct.setQuantity(cartDetail.getQuantity());
		
		CartDetail updatedCartDetail = cartDetailRepository.save(cartDetailProduct);
		return ResponseEntity.ok(updatedCartDetail);
	}
	
	@DeleteMapping("/cartdetail/{cartId}/{productId}")
	public ResponseEntity<Map<String, Boolean>> deleteCartDetailProduct(@PathVariable Long cartId, @PathVariable Long productId){
		
		CartDetail cartDetailProduct = cartDetailRepository.findCartDetailByCartIdAndProductId(cartId, productId)
				.orElseThrow(() -> new ResourceNotFoundException("Cart detail not exist with cartId: " + cartId + " and productId: " + productId));
		
		cartDetailRepository.delete(cartDetailProduct);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
}
