import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCartService } from 'src/app/api/api-cart.service';
import { ApiProductService } from 'src/app/api/api-product.service';
import { CartDetail } from 'src/app/model/cart-detail';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userSessionId: string = sessionStorage.getItem('id');
  userSessionName: string = sessionStorage.getItem('name');
  userSessionType: string = sessionStorage.getItem('type');

  totalProducts: number = 0;
  totalPrice: number = 0;
  idUserCart: number;

  cartDetailProducts: CartDetail [];
  products: Array<Product> = [];
  
  constructor(public router: Router, private apiCartService: ApiCartService, private apiProductService: ApiProductService) { }

  ngOnInit(): void {
    this.getCartDetail();
  }

  isHomeRoute() {
    return this.router.url.includes('home') ? true: false;
  }

  isShopRoute() {
    return this.router.url.includes('shop') ? true: false;
  }

  isLogged() {
    return this.userSessionId === null ? false : true;
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/home']).then(() =>
      location.reload()
    );
  }

  getCartDetail() {
    this.apiCartService.getCartByCustomerId(parseInt(this.userSessionId)).subscribe(response => {
      if (response.status === 200) {
        
        this.idUserCart = response.body.id;

        this.apiCartService.getCartDetailProductList(this.idUserCart).subscribe(data => {
          this.cartDetailProducts = data;
          this.totalProducts = data.length;

        }, error => console.log(error))
      } 
    }, error => console.log(error));
  }

  deleteProduct(productId: number) {
    this.apiCartService.deleteCartDetailProduct(this.idUserCart, productId).subscribe(data => {
      //console.log("deleted")
    })
  }
}
