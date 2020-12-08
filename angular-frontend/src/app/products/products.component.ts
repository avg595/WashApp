import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ApiProductService } from '../api/api-product.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ProductsComponent implements OnInit {

  products: Product[];

  display: boolean = false;
  displayUpdate: boolean = false;

  product: Product = new Product();

  constructor(private apiProductService: ApiProductService, private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

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
      this.getProducts();
      this.showInfo("Product saved.");
    }, error => console.log(error));
  }

  productDetails(id: number){

  }

  updateProduct(id: number){
    this.getProductById(id);
    this.displayUpdate = true;
  }

  deleteProduct(id: number){
    this.deletePopUpConfirmation(id);
  }

  showDialog() {
    this.product = new Product();
    this.display = true;
  }

  onSubmit(data) {
    this.saveProduct();
    this.display = false;
  }

  onSubmitUpdate(data) {
    this.apiProductService.updateProduct(this.product.id, this.product).subscribe( data =>{
      this.displayUpdate = false;
      this.getProducts();
      this.showInfo("Product updated.");
    }, error => console.log(error));
  }

  deletePopUpConfirmation(id: number) {
    this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.apiProductService.deleteProduct(id).subscribe(data=>{
            this.getProducts();
          })
          this.showInfo("Product deleted.");
        },
        reject: () => {
          this.showInfo("Product not deleted.");
        }
    });
  }

  showInfo(detail: string) {
    this.messageService.add({severity:'info', summary: 'Info', detail: detail});
  }
}
