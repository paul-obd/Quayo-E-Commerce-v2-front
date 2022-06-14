import { Injectable } from '@angular/core';
import { BasketItem } from '../../models/e-commerce/basket-item.model';
//import { BasketItem } from '../models/basket-item.model';

@Injectable({
  providedIn: 'root'
})
export class BasketService {



  basket: BasketItem[] = []
  total: number = 0


  constructor() { }


  doTotal(){
    this.total = 0
    this.basket.forEach(item => {
      this.total += (item.orderQuantity*item.price)
    });
  }


  updateOrderQuantity(i: number, newQuantity: number){
    this.basket[i].orderQuantity = newQuantity
  }


}
