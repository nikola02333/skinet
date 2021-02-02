import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/models/pagination';
import { IBrand } from './../shared/models/brands';
import { IType } from './../shared/models/produtType';
import {map} from 'rxjs/operators';
import { ShopParams } from './../shared/models/shopParams';
import { IProduct } from './../shared/models/product';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopService {


  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  getProducts(sophParams: ShopParams){

    let params = new HttpParams();

    if (sophParams.BrandId !== 0 ){
      params = params.append('brandId',sophParams.BrandId.toString());
    }
    if (sophParams.typeId !== 0 ){
      params = params.append('typeId', sophParams.typeId.toString());
    }

    if(sophParams.search) {
       params=params.append('search', sophParams.search);
    }
      params = params.append('sort', sophParams.sort);

      params= params.append('pageIndex', sophParams.pageNumber.toString());
      params= params.append('pageSize', sophParams.pageSize.toString());
      
    return this.http.get<IPagination>(this.baseUrl + 'products', {observe: 'response', params})
                .pipe(
                  map( response => {
                    return response.body;
                  })
                );
  }
  getProduct(id :number) {
   return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }
  getBrands(){
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }
  getTypes(){
    return this.http.get<IType[]>(this.baseUrl + 'products/types');
  }
}
