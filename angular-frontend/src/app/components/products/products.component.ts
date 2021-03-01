import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { ApiProductService } from '../../api/api-product.service';
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
  displayUpdateImage: boolean = false;
  displayProductData: boolean = false;

  product: Product = new Product();

  selectedFile: File = null;
  retrievedImage: any;
  base64Data: any;
  imageName: any;

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

  saveImage() {
    const uploadImageData = new FormData();
    
    let imageExtension = this.selectedFile.name.substring(this.selectedFile.name.indexOf("."));
    let productName = this.product.name.toLowerCase().replace(/\s+/g, '');
    this.imageName = productName + imageExtension;
    
    uploadImageData.append('imageFile', this.selectedFile, this.imageName);

    let productId = this.product.id;

    this.apiProductService.updateProductImage(productId, uploadImageData).subscribe(response => {
      if (response.status === 200) {
        this.showInfo("Image uploaded successfully");
      } else {
        this.showInfo("Image not uploaded successfully");
      }
    }, error => console.log(error));
  }

  productDetails(id: number){
    this.getProductImage(id);
    this.displayProductData = true;
  }

  saveProductImage(id: number){
    this.getProductById(id);
    this.displayUpdateImage = true;
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

  getProductImage(productId: number) {
    this.apiProductService.getProductImage(productId).subscribe(response => {
      if (response.status === 200) {
        this.base64Data = response.body.picByte;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      } else {
        this.showError("ERROR");
      }
    }, error => {
      if (error.status === 500) {
        this.displayProductData = false;
        this.showError("Product without image");
      } else {
        console.log(error);
      }
    })
  }

  onSubmitUpdate(data) {
    this.apiProductService.updateProduct(this.product.id, this.product).subscribe( data =>{
      this.displayUpdate = false;
      this.getProducts();
      this.showInfo("Product updated.");
    }, error => console.log(error));
  }

  onSubmitUpdateImage(data) {
    this.saveImage();
    this.displayUpdateImage = false;
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

  showError(detail: string) {
    this.messageService.add({severity:'error', summary: 'Error', detail: detail});
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }
}
