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
  displayUpdate: boolean = false;

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

  private getProductById(id: number){
    this.apiProductService.getProductById(id).subscribe(data => {
      this.product = data;
    }, error => console.log(error));
  }

  saveProduct() {
    this.apiProductService.createProduct(this.product).subscribe(data => {
      location.reload();
    }, error => console.log(error));
  }

  productDetails(id: number){

  }

  updateProduct(id: number){
    this.getProductById(id);
    this.displayUpdate = true;
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

  onSubmitUpdate(data) {
    this.apiProductService.updateProduct(this.product.id, this.product).subscribe( data =>{
      this.displayUpdate = false;
      location.reload();
    }, error => console.log(error));
  }
}
