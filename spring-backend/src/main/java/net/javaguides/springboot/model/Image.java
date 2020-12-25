package net.javaguides.springboot.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "files")
public class Image {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "name")
	private String name;	
	
	@Column(name = "type")
	private String type;    
	
	//image bytes can have large lengths so we specify a value which is more than the default length for picByte column
	@Column(name = "picByte", length = 10000)
	private byte[] picByte;
	
	@Column(name = "product_id")
	private long productId; 

	public Image() {
		super();
	}
	
	public Image(String name, String type, byte[] picByte, long productId) {
		super();
		this.name = name;
		this.type = type;
		this.picByte = picByte;
		this.productId = productId;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public byte[] getPicByte() {
		return picByte;
	}

	public void setPicByte(byte[] picByte) {
		this.picByte = picByte;
	}

	public long getProductId() {
		return productId;
	}

	public void setProductId(long productId) {
		this.productId = productId;
	}
}
