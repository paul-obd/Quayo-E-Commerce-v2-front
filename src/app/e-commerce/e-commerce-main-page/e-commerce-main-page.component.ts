import { Component, OnInit } from "@angular/core";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-e-commerce-main-page",
  templateUrl: "./e-commerce-main-page.component.html",
  styleUrls: ["./e-commerce-main-page.component.scss"],
})
export class ECommerceMainPageComponent implements OnInit {
  public _showFooter: boolean = environment.showFooter;
  ngOnInit(): void {}
  title = "SFAeCommerce";
}
