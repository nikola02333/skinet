import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IProduct } from '../../shared/models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() product: IProduct;

  constructor() { }

  ngOnInit(): void {
  }

}
