import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopService } from './shop.service';
import { IBrand } from './../shared/models/brands';
import { IType } from './../shared/models/produtType';
import { ShopParams } from './../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  @ViewChild('search', {static: false}) searchTearm : ElementRef;

  products: IProduct[];
  brands: IBrand[];
  types: IType[];
 shopParams = new ShopParams();
  totalCounts: number;
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'},
  ];
  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getBrands(){
    this.shopService.getBrands().subscribe( response => {
      this.brands = [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
  }
  getTypes(){
    this.shopService.getTypes().subscribe( response => {
      this.types = [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
  }
  getProducts()
  {
    this.shopService.getProducts(this.shopParams).subscribe( response => {
      this.products = response.data;
      this.shopParams.pageNumber = response.pageIndex;
      this.shopParams.pageSize = response.pageSize; 
      this.totalCounts = response.count;
    }, error => {
      console.log(error);
    });
  }
  onBrandSelected(brandId: number){
    this.shopParams.BrandId = brandId;
    this.shopParams.pageNumber =1;
    this.getProducts();
  }

  onTypeSelected(typeId: number){
    debugger
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber =1;
    this.getProducts();
  }
  onSortSelected(sort: string){
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChanged(event: any) {
    if( this.shopParams.pageNumber !== event)
    {
      // event  je ustvari pageNumber,  je on iz Komponente page.Component
      this.shopParams.pageNumber = event;
      // imam 2 poziva, zbog pageItems, posto se menja, kod filtriranja
      this.getProducts();
    }
  }
  onSearch(){
    this.shopParams.search = this.searchTearm.nativeElement.value;
    this.shopParams.pageNumber =1;
    this.getProducts();
  }
  onReset(){
    this.searchTearm.nativeElement.value= '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
