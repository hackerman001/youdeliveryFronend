import { Component, OnInit, HostListener } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Product } from 'src/app/app.models';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  public products: Array<Product> = [];
  public productes: Array<Product> = [];
  public viewCol: number = 25;
  public page: any;
  public count = 12;

  photoServiceUrl =environment.photoServiceUrl;
  
  constructor(public appService:AppService, public dialog: MatDialog) { }

  ngOnInit(): void {
    if(window.innerWidth < 1280){
      this.viewCol = 33.3;
    };
    this.getAllProducts(); 
    this.getProducts();
  }

  public getProducts(){
    this.appService.getProductsList().subscribe(data=>{
      this.productes = data; 
      console.log(this.productes);
     
    });
  }
  public reloadData(){
    this.getProducts();
  }
  public getAllProducts(){
    this.appService.getProducts("featured").subscribe(data=>{
      this.products = data; 
      //for show more product  
      for (var index = 0; index < 3; index++) {
        this.products = this.products.concat(this.products);        
      }
    });
  }

  public onPageChanged(event){
    this.page = event; 
    window.scrollTo(0,0); 
  }

  @HostListener('window:resize')
  public onWindowResize():void { 
    (window.innerWidth < 1280) ? this.viewCol = 33.3 : this.viewCol = 25;
  }
 

  public remove(product:any){  
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
        title: "Confirm Action",
        message: "Are you sure you want delete this product?"
      }
    }); 
    dialogRef.afterClosed().subscribe(dialogResult => { 
      if(dialogResult){
        const index: number = this.productes.indexOf(product);
        if (index !== -1) {
          this.productes.splice(index, 1);  
        } 
        this.appService.deleteProduct(product.id).subscribe(
          data => {
            console.log(data);
            this.reloadData();
          },
          error => console.log(error));
      } 
    }); 
  }

}
