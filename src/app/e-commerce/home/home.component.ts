import { environment } from "./../../../environments/environment";
import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { BreakpointObserver } from "@angular/cdk/layout";
import { MatDrawer, MatDrawerToggleResult } from "@angular/material/sidenav";
import { ActivatedRoute, Router } from "@angular/router";
import { AttributeValueService } from "../../shared/services/e-commerce/attribute-value.service";
import { ItemsService } from "../../shared/services/e-commerce/items.service";
import { LoadingService } from "../../shared/services/e-commerce/loading.service";
import { BasketService } from "../../shared/services/e-commerce/basket.service";
import { ResponsiveService } from "../../shared/services/e-commerce/responsive.service";
import { LanguageService } from "../../shared/services/common/toolbar.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild("drawer") drawer: MatDrawer;
  isDrawerOpen: string;
  isPhone: boolean;
  showCarousel: boolean = environment.showCarousel;

  constructor(
    public attributeValueService: AttributeValueService,
    public itemsService: ItemsService,
    public loadingService: LoadingService,
    private bpObserver: BreakpointObserver,
    public basketService: BasketService,
    private route: Router,
    public responsiveService: ResponsiveService,
    public languageService: LanguageService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  doTotal() {
    this.basketService.doTotal();
  }

  goToBasket() {
    this.route.navigate(["/e-commerce/e-commerce-main-page/basket"]);
  }

  openSearch() {
    this.itemsService.openSearch = true;
  }

  toggleGrid() {
    if (this.responsiveService.grid == "cards") {
      this.responsiveService.grid = "table";
    } else {
      this.responsiveService.grid = "cards";
    }
  }

  ngAfterViewInit(): void {
    this.bpObserver.observe(["(max-width: 900px)"]).subscribe((res: any) => {
      if (res.matches) {
        this.responsiveService.isMobile = true;
        this.drawer.mode = "over";
        this.drawer.close().then((sidenavIsOpen: MatDrawerToggleResult) => {
          this.isDrawerOpen = sidenavIsOpen;
        });
      } else {
        this.responsiveService.isMobile = false;
        this.drawer.mode = "side";
        this.drawer.open().then((sidenavIsOpen: MatDrawerToggleResult) => {
          this.isDrawerOpen = sidenavIsOpen;
        });
      }
    });
  }

  toggleDrawer() {
    this.drawer.toggle().then((sidenavIsOpen: MatDrawerToggleResult) => {
      this.isDrawerOpen = sidenavIsOpen;
    });
  }
}
