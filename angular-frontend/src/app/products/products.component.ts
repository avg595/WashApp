import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ApiProductService } from '../api/api-product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[];

  display: boolean = false;

  constructor(private apiProductService: ApiProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts(){
    this.apiProductService.getProductsList().subscribe(data => {
      this.products = data;
    })
  }

  productDetails(id: number){

  }

  updateProduct(id: number){
    
  }

  deleteProduct(id: number){
    
  }

  showDialog() {
    this.display = true;
  }
}
