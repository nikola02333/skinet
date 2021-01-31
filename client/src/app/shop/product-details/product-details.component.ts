import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from './../../shared/models/product';
import { ShopService } from './../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  prodct: IProduct;
  constructor(private shopService: ShopService, private activeteRoute: ActivatedRoute) { }

  ngOnInit(): void {
  this.loadProduct();
  }

  loadProduct(){
   this.shopService.getProduct(+ this.activeteRoute.snapshot.paramMap.get('id') ).subscribe( product => {
     this.prodct = product;
   }, error => {
     console.log(error);
   });
  }
}
