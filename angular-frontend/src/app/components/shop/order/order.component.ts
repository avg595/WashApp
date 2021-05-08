import { Component, OnInit } from '@angular/core';
import { ApiCartService } from 'src/app/api/api-cart.service';
import { CartDetail } from 'src/app/model/cart-detail';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  userSessionId: string = sessionStorage.getItem('id');

  idUserCart: number;

  cartDetailProducts: CartDetail [];

  totalPrice: number = 0;

  constructor(private apiCartService: ApiCartService, private router: Router) { }

  ngOnInit(): void {
    this.apiCartService.refreshNeeded$.subscribe(() => {
      this.totalPrice = 0;
      this.getCartDetail();
    });

    this.getCartDetail();
  }

  getCartDetail() {
    this.apiCartService.getCartByCustomerId(parseInt(this.userSessionId)).subscribe(response => {
      if (response.status === 200) {
        
        this.idUserCart = response.body.id;

        this.apiCartService.getCartDetailProductList(this.idUserCart).subscribe(data => {
          this.cartDetailProducts = data;
          this.setTotalPrice();
        }, error => console.log(error))
      } 
    }, error => console.log(error));
  }

  deleteProduct(productId: number) {
    this.apiCartService.deleteCartDetailProduct(this.idUserCart, productId).subscribe(data => {
      //this.getCartDetail();
    })

    if (this.cartDetailProducts.length - 1 === 0) {
      this.router.navigate(['/shop']);
    }
  }

  setTotalPrice() {
    this.cartDetailProducts.forEach(cdProduct => {
      this.totalPrice += cdProduct.product.price * cdProduct.quantity;
    });
  }

  deleteAllProducts() {
    this.apiCartService.deleteCartDetailProducts(this.idUserCart).subscribe(data => {
      this.router.navigate(['/shop']);
    })
  }
}
