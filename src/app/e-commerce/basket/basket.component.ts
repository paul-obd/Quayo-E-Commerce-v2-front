import { Component, OnInit } from "@angular/core";
import { BasketService } from "../../shared/services/e-commerce/basket.service";
import { DialogService } from "../../shared/services/e-commerce/dialog.service";
import { ResponsiveService } from "../../shared/services/e-commerce/responsive.service";
import { LanguageService } from "../../shared/services/common/toolbar.service";

@Component({
  selector: "app-basket",
  templateUrl: "./basket.component.html",
  styleUrls: ["./basket.component.css"],
})
export class BasketComponent implements OnInit {
  constructor(
    public languageService: LanguageService,
    public basketService: BasketService,
    public responsiveService: ResponsiveService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.basketService.doTotal();
  }

  deleteAllFromBasket() {
    this.dialogService
      .openDialog(
        "ARE YOU SURE YOU WANT TO REMOVE ALL PRODUCTS FROM BASKET",
        "CANCEL",
        "DELETE"
      )
      .afterClosed()
      .subscribe((result) => {
        if (result == "true") {
          this.basketService.basket = [];
        }
      });
  }

  checkout() {
    console.log(this.basketService.basket);
  }
}
