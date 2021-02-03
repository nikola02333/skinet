import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { OnInit } from '@angular/core';
import { IProduct } from './shared/models/product';
import { IPagination } from './shared/models/pagination';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SkiNEt';

   constructor(private bsService: BasketService){}
  ngOnInit(): void {
    const basketId = localStorage.getItem('basket_id');
    if (basketId ) {
      this.bsService.getBasket(basketId).subscribe( () => {
        console.log('Initialised basket');
      }, error => {
        console.log(error);
      });
    }
  }
}
