import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class OrderTotalService {

  itemPrice: number=0;
  quantity: number = 1;
  total: number = this.itemPrice
  stock: number = 0

  constructor(private snackbar: SnackbarService, private translate: TranslateService) { }

  doTotal(){
    if (this.quantity < 0) {

      this.translate.stream("QUANTITY CAN'T BE 0").subscribe(res => this.snackbar.openSnackbar(res))
   
      
    }else if(this.quantity > this.stock){

     
      this.translate.stream("This Order Quantity is Not Available In Stock").subscribe(res => this.snackbar.openSnackbar(res))
   
      this.quantity = 1
    }
    else{
      if (this.quantity <= 0) {
        return;
      }else{
        this.total = this.itemPrice * this.quantity
      }
     
    }


  }

  addQuantity(){
    if(this.quantity.toString() == ''){
     
      this.quantity = 0
    }
    this.quantity = Number.parseInt(this.quantity.toString()) 
    this.quantity += 1
    
  }

  decreaseQuantity(){
    if (this.quantity == 1) {

      
      this.translate.stream("QUANTITY CAN'T BE 0").subscribe(res => this.snackbar.openSnackbar(res))
   
      
    }else{
      if (this.quantity == 0) {
        return;
      }
      this.quantity -= 1
    }
   
  }
}
