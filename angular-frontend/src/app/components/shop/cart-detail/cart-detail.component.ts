import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ApiCartService } from 'src/app/api/api-cart.service';
import { CartDetail } from 'src/app/model/cart-detail';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit, OnDestroy {

  @Output() cartTotalProducts = new EventEmitter();

  userSessionId: string = sessionStorage.getItem('id');

  totalProducts: number = 0;
  totalPrice: number = 0;
  idUserCart: number;

  cartDetailProducts: CartDetail [];

  test$: Observable<CartDetail[]>;
  refreshData$ = new BehaviorSubject<boolean>(true);

  clickEventSubscription: Subscription;

  constructor(private apiCartService: ApiCartService) {}

  ngOnInit(): void {
    this.apiCartService.refreshNeeded$.subscribe(() => {
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
          this.totalProducts = data.length;

          this.cartTotalProducts.emit(this.totalProducts);

        }, error => console.log(error))
      } 
    }, error => console.log(error));
  }

  deleteProduct(productId: number) {
    this.apiCartService.deleteCartDetailProduct(this.idUserCart, productId).subscribe(data => {
      this.getCartDetail();
    })
  }
 
  ngOnDestroy() {
    this.apiCartService.refreshNeeded$.unsubscribe();
  }
}
