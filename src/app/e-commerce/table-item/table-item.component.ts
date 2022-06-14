import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BasketItem } from '../../shared/models/e-commerce/basket-item.model';
import { BasketService } from '../../shared/services/e-commerce/basket.service';
import { SnackbarService } from '../../shared/services/e-commerce/snackbar.service';


@Component({
  selector: '[app-table-item]',
  templateUrl: './table-item.component.html',
  styleUrls: ['./table-item.component.css']
})
export class TableItemComponent implements OnInit {


  @Input() i: number;
  @Input() item_code: string;
  @Input() description: string;
  @Input() price: number;
  @Input() in_stock: Boolean;
  @Input() image_path: string;


  orderQuantity: number = 1

  constructor(private _basketService: BasketService, private _snackbarService: SnackbarService,
     private _translateService: TranslateService) { }
 
  ngOnInit(): void {
  
  }

  addQuantity(){
    if(this.orderQuantity.toString() == ''){
     
      this.orderQuantity = 0
    }
    this.orderQuantity = Number.parseInt(this.orderQuantity.toString()) 
    this.orderQuantity += 1
    
  }

  setNoImage(event){
    this.image_path  = "../../../assets/images/no-image-image.png"
  }

  decreaseQuantity(){
    if (this.orderQuantity == 1) {
      
    
      this._translateService.stream("QUANTITY CAN'T BE 0").subscribe(res => this._snackbarService.openSnackbar(res))
   
    }else{
      if (this.orderQuantity == 0 || this.orderQuantity == null) {
     
        this._translateService.stream("QUANTITY CAN'T BE < 0").subscribe(res => this._snackbarService.openSnackbar(res))
   
        this.orderQuantity = 1 
        return;
      }
      this.orderQuantity -= 1
    }
   
  }

  validateNumber(event: KeyboardEvent) {
    const keyCode = event.keyCode;

    const excludedKeys = [8, 37, 39, 46];

    if (!((keyCode >= 48 && keyCode <= 57) ||
      (keyCode >= 96 && keyCode <= 105) || (keyCode == 9) || (keyCode == 13) || (keyCode == 32)) ||
      (excludedKeys.includes(keyCode) || String.fromCharCode(event.charCode).match(/^[^*|\":<>[\]{}`\\()';@&$+-=]+$/g) != null)

    ) {
      event.preventDefault();
    }

  }

  seeIfZero(){
    if(this.orderQuantity == 0){
      this.orderQuantity = 1
    }
  }


  addToBasket(){
    if(this.orderQuantity == 0 || this.orderQuantity == null ){


      this._translateService.stream("QUANTITY CAN'T BE 0").subscribe(res => this._snackbarService.openSnackbar(res))
   
      this.orderQuantity = 1
    }

    else{
    let item = this._basketService.basket.find(i => i.description == this.description)
    if (item != null) {
      item.orderQuantity += this.orderQuantity
    }else{
      let newBasketItem = new BasketItem()
      newBasketItem.item_code = this.item_code
      newBasketItem.description = this.description
      newBasketItem.price = this.price
      newBasketItem.in_stock = this.in_stock
      newBasketItem.image_path = this.image_path
      newBasketItem.orderQuantity = this.orderQuantity
    

      this._basketService.basket.push(newBasketItem)
    }
    
  }}




  

}
