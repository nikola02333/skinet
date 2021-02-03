import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { retryWhen } from 'rxjs/operators';
import { IBasket, IBasketItem } from '../shared/models/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  basket$ : Observable<IBasket>;
  constructor(private bService: BasketService) { }

  ngOnInit(): void {
    this.basket$ = this.bService.basket$;
  }
  removeBaketItem(item: IBasketItem){
    this.bService.removeItemFromBasket(item);
  }
  incerementItemQunatity(item: IBasketItem){
    this.bService.incrementItemQuantity(item);
  }
  decrementItemQuantity(item : IBasketItem) {
    this.bService.decrementItemQuantity(item);
  }

}
