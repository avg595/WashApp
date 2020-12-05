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

  product: Product = new Product();

  constructor(private apiProductService: ApiProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts(){
    this.apiProductService.getProductsList().subscribe(data => {
      this.products = data;
    })
  }

  saveProduct() {
    this.apiProductService.createProduct(this.product).subscribe(data => {
      location.reload();
    }, error => console.log(error));
  }

  productDetails(id: number){

  }

  updateProduct(id: number){
    
  }

  deleteProduct(id: number){
    this.apiProductService.deleteProduct(id).subscribe(data=>{
      this.getProducts();
    })
  }

  showDialog() {
    this.display = true;
  }

  onSubmit(data) {
    this.saveProduct();
    this.display = false;
  }
}
