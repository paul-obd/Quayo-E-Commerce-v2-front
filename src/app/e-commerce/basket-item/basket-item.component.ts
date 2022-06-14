import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BasketService } from '../../shared/services/e-commerce/basket.service';
import { DialogService } from '../../shared/services/e-commerce/dialog.service';
import { SnackbarService } from '../../shared/services/e-commerce/snackbar.service';


@Component({
  selector: 'app-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.css']
})
export class BasketItemComponent implements OnInit {

  @Input() i: number;
  @Input() item_code: string;
  @Input() description: string;
  @Input() price: number;
  @Input() in_stock: Boolean;
  @Input() image_path: string;
  @Input() orderQuantity: number = 1;


  imageIsLoaded: boolean = false


  constructor(public basketService: BasketService, private dialogService: DialogService, 
    private snackbar: SnackbarService, private translate: TranslateService) { }

  ngOnInit(): void {
  }

  onImageLoad() {
    this.imageIsLoaded = true
  }

  addQuantity() {
    if (this.basketService.basket[this.i].orderQuantity.toString() == '') {
      this.basketService.basket[this.i].orderQuantity = 0
    }
    this.basketService.basket[this.i].orderQuantity = Number.parseInt(this.basketService.basket[this.i].orderQuantity.toString())
    this.basketService.basket[this.i].orderQuantity += 1
    this.basketService.doTotal()
  }


  decreaseQuantity() {

    if (this.basketService.basket[this.i].orderQuantity == 1) {

  
      this.translate.stream("QUANTITY CAN'T BE 0").subscribe(res => this.snackbar.openSnackbar(res))

    } else {
      if (this.basketService.basket[this.i].orderQuantity == 0 || this.basketService.basket[this.i].orderQuantity == null) {

        this.translate.stream("QUANTITY CAN'T BE < 0").subscribe(res => this.snackbar.openSnackbar(res))
        this.basketService.basket[this.i].orderQuantity = 1
        return;
      }
      this.basketService.basket[this.i].orderQuantity -= 1
      this.basketService.doTotal()
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
    } else {
      this.basketService.doTotal()
    }

  }

  seeIfZero() {
    if (this.basketService.basket[this.i].orderQuantity == 0) {
      this.basketService.basket[this.i].orderQuantity = 1
      this.basketService.doTotal()
    }
  }

  deleteFromBasket() {
    this.dialogService.openDialog('ARE YOU SURE YOU WANT TO REMOVE THIS PRODUCT FROM BASKET', 'CANCEL', 'DELETE' ).afterClosed().subscribe(
      (result) => {
        if (result == 'true') {
          this.basketService.basket.splice(this.i, 1)
          this.basketService.doTotal()
        }
      }
    )

  }



}
