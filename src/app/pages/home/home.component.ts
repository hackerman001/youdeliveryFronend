import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Product } from "../../app.models";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public slides = [
    { title: 'Se liberer ', subtitle: 'de certaines taches ', image: 'assets/images/carousel/banner1.jpg' },
    { title: 'Etre ponctuel', subtitle: 'malgre tout', image: 'assets/images/carousel/banner2.jpg' },
    { title: 'Respecter', subtitle: 'La parole donnée', image: 'assets/images/carousel/banner3.jpg' },
    { title: 'Redjoindre les siens', subtitle: 'En toute Confiance', image: 'assets/images/carousel/banner4.jpg' },
    { title: 'Bienvenue', subtitle: 'Chez You_Delivery', image: 'assets/images/carousel/banner5.jpg' }
  ];

  public brands = [];
  public banners = [];
  public featuredProducts: Array<Product>;
  public onSaleProducts: Array<Product>;
  public topRatedProducts: Array<Product>;
  public newArrivalsProducts: Array<Product>;
  public allProducts: Array<Product>;

  constructor(public appService:AppService) { }

  ngOnInit() {
    this.getBanners();
    this.getProducts();
    this.getBrands();
  }

  /*public onLinkClick(e){
    this.getProducts(e.tab.textLabel.toLowerCase()); 
  }*/

  /*public getProducts(type){
    if(type == "featured" ){
      this.appService.getProducts("featured").subscribe(data=>{
        this.featuredProducts = data;      
      }) 
    }
   
  }*/
  
  public getProducts(){
      this.appService.getProductsList().subscribe(data=>{
        this.allProducts = data;      
      })  
   
  }

  public getBanners(){
    this.appService.getBanners().subscribe(data=>{
      this.banners = data;
    })
  }

  public getBrands(){
    this.brands = this.appService.getBrands();
  }

}
