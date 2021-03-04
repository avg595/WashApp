import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { File } from '../../model/file';
import { ApiProductService } from '../../api/api-product.service';
import { ApiCartService } from '../../api/api-cart.service';
import { CartDetail } from '../../model/cart-detail';

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

  idUserCart: number;

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

  addProductToCart(productId: number) {

    this.apiCartService.getCartByCustomerId(parseInt(this.userSessionId)).subscribe(response => {
      if (response.status === 200) {
        let quantitySelected = document.getElementById("numProd" + productId).innerHTML;
        
        this.idUserCart = response.body.id;

        this.apiCartService.getCartDetailByCartIdAndProductId(response.body.id, productId).subscribe(response => {
          if (response.status === 200) {
            let actualQuantity = response.body.quantity;
            let sumQuantity = actualQuantity + parseInt(quantitySelected);
            const cartDetailtoUpdate: CartDetail = new CartDetail (response.body.cartId, response.body.productId, sumQuantity);

            this.apiCartService.updateCartDetailProduct(response.body.id, cartDetailtoUpdate).subscribe(data => {
              console.log(data)
            }, error => console.log(error))

          }
        }, error => {
          if (error.status === 404) {
            const cartDetail: CartDetail = new CartDetail(this.idUserCart, productId, parseInt(quantitySelected));

            this.apiCartService.addToCartDetail(cartDetail).subscribe(data => {
              console.log(data)
            }, error => console.log(error));
          } else {
            console.log(error);
          }
        })
      }
    }, error => console.log(error));
  }
}
