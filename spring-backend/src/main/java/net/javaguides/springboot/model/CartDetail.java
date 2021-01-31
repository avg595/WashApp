package net.javaguides.springboot.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "cartdetail")
public class CartDetail {

	@Id
	@Column(name = "cart_id")
	private long cartId;
	
	@Column(name = "product_id")
	private long productId;
	
	@Column(name = "quantity")
	private long quantity;

	public CartDetail() {
		
	}

	public CartDetail(long cartId, long productId, long quantity) {
		super();
		this.cartId = cartId;
		this.productId = productId;
		this.quantity = quantity;
	}

	public long getCartId() {
		return cartId;
	}

	public void setCartId(long cartId) {
		this.cartId = cartId;
	}

	public long getProductId() {
		return productId;
	}

	public void setProductId(long productId) {
		this.productId = productId;
	}

	public long getQuantity() {
		return quantity;
	}

	public void setQuantity(long quantity) {
		this.quantity = quantity;
	}
}
