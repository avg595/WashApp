import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { File } from '../file';
import { ApiProductService } from '../api/api-product.service';

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

  constructor(private apiProductService: ApiProductService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('reload') === 'no reload') {
      location.reload();
      sessionStorage.removeItem('reload');
    }

    this.getProducts();
    //this.getProductImage(1);
    this.getImages();

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

  getProductImage(productId: number) {
    this.apiProductService.getProductImage(productId).subscribe(response => {
      if (response.status === 200) {
        this.base64Data = response.body.picByte;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      }
    }, error => console.log(error));
  }

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
