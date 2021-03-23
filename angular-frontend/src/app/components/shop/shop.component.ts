import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { File } from '../../model/file';
import { ApiProductService } from '../../api/api-product.service';
import { ApiCartService } from '../../api/api-cart.service';
import { ApiCustomerService } from 'src/app/api/api-customer.service';
import { CartDetail } from '../../model/cart-detail';
import { Customer } from 'src/app/model/customer';
import { Cart } from 'src/app/model/cart';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  userSessionId: string = sessionStorage.getItem('id');
  
  product: Product;
  products: Product[];
  images: File[];
  cart: Cart;

  retrievedImage: any;
  base64Data: any;

  idUserCart: number;

  customer: Customer = new Customer();

  constructor(private apiProductService: ApiProductService, private apiCartService: ApiCartService,
              private apiCustomerService: ApiCustomerService) { }

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
    this.apiCustomerService.getCustomerById(parseInt(this.userSessionId)).subscribe(data => {
      this.customer = data;

      this.apiCartService.getCartByCustomerId(parseInt(this.userSessionId)).subscribe(response => {
        if (response.status === 200) {
          //console.log("user cart exists")
        }
      }, error => {
        if (error.status === 404) {
          this.createUserCart(this.customer);
        } else {
          console.log(error);
        }
      })
    }, error => console.log(error));
  }

  private createUserCart(customer: Customer) {
    this.apiCartService.createCart(customer).subscribe(data => {
      //console.log("cart created")
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
        this.cart = response.body;

        this.apiProductService.getProductById(productId).subscribe(data => {
          this.product = data;
        
          const cartDetail: CartDetail = new CartDetail(this.cart, this.product, parseInt(quantitySelected));
          
          this.apiCartService.getCartDetailByCartIdAndProductId(cartDetail).subscribe(response => {
            if (response.status === 200) {
              let actualQuantity = response.body.quantity;
              let sumQuantity = actualQuantity + parseInt(quantitySelected);
              const cartDetailtoUpdate: CartDetail = new CartDetail (response.body.cart, response.body.product, sumQuantity);

              this.apiCartService.updateCartDetailProduct(response.body.id, cartDetailtoUpdate).subscribe(data => {
                console.log(data)
              }, error => console.log(error))
            } 
          }, error => {
            if (error.status === 404) {
              this.apiCartService.addToCartDetail(cartDetail).subscribe(data => {
                console.log(data)
              }, error => console.log(error));
            } else {
              console.log(error);
            }
          })
        })
      }
    }, error => console.log(error));
  }
}
