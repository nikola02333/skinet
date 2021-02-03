import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from './../../shared/models/product';
import { ShopService } from './../shop.service';
import {BreadcrumbService} from 'xng-breadcrumb'
import { BasketService } from './../../basket/basket.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  prodct: IProduct;
  quantity = 1;
  constructor(private shopService: ShopService,
              private activeteRoute: ActivatedRoute,
              private basketService: BasketService,
              private bcService: BreadcrumbService) {
    this.bcService.set('@productDetails', ' ');
   }

  ngOnInit(): void {
  this.loadProduct();
  }

  addItemToBasket() {
    this.basketService.addItemToBasket(this.prodct, this.quantity);

  }

  incrementQuantity()
  {
    this.quantity++;
  }
  decrementQuantity(){
    if( this.quantity >1)
    {
    this.quantity--;
    }
  }

  loadProduct(){
   this.shopService.getProduct(+ this.activeteRoute.snapshot.paramMap.get('id') ).subscribe( product => {
     this.prodct = product;
     this.bcService.set('@productDetails', product.name);
   }, error => {
     console.log(error);
   });
  }
}
