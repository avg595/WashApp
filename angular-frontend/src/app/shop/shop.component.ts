import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { File } from '../file';
import { ApiProductService } from '../api/api-product.service';
import { ApiCartService } from '../api/api-cart.service';
import { Cart } from '../model/cart';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  userSessionId: string = sessionStorage.getItem('id');
  
  products: Product[];
  images: File[];

  retrievedImage: any;
  base64Data: any;

  cart: Cart = new Cart();

  constructor(private apiProductService: ApiProductService, private apiCartService: ApiCartService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('reload') === 'no reload') {
      location.reload();
      sessionStorage.removeItem('reload');
    }

    this.getProducts();
    //this.getProductImage(1);
    this.getImages();


    this.checkIfUserCartExists();
  }

  private getProducts() {
    this.apiProductService.getProductsList().subscribe(data => {
      this.products = data;
    })
  }

  private getImages() {
    this.apiProductService.getFilesList().subscribe(data => {
      this.images = data;
    })
  }

  private checkIfUserCartExists() {
    this.apiCartService.getCartByCustomerId(parseInt(this.userSessionId)).subscribe(response => {
      if (response.status === 200) {
        /* console.log("tiene carro") */
      }
    }, error => {
      if (error.status === 404) {
        this.createUserCart();
      } else {
        console.log(error);
      }
    })
  }

  private createUserCart() {
    this.apiCartService.createCart(parseInt(this.userSessionId)).subscribe(response => {
      /* console.log(response) */
    }, error => console.log(error));
  }

  /* getProductImage(productId: number) {
    this.apiProductService.getProductImage(productId).subscribe(response => {
      if (response.status === 200) {
        this.base64Data = response.body.picByte;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      }
    }, error => console.log(error));
  } */

  minus(productId: number) {
    const quantityRow = document.getElementById("numProd" + productId);
    let actualQty = document.getElementById("numProd" + productId).innerHTML;
    let minQty = parseInt(actualQty);

    if (minQty > 1) {
      minQty--;
      quantityRow.innerHTML = minQty.toString();
    }
  }

  plus(productId: number) {
    const quantityRow = document.getElementById("numProd" + productId);
    let actualQty = document.getElementById("numProd" + productId).innerHTML;
    let sumQty = parseInt(actualQty);

    sumQty++;
    quantityRow.innerHTML = sumQty.toString();
  }
}
