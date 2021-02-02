import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from './../../shared/models/product';
import { ShopService } from './../shop.service';
import {BreadcrumbService} from 'xng-breadcrumb'
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  prodct: IProduct;
  constructor(private shopService: ShopService, private activeteRoute: ActivatedRoute, private bcService: BreadcrumbService) {
    this.bcService.set('@productDetails', ' ');
   }

  ngOnInit(): void {
  this.loadProduct();
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
