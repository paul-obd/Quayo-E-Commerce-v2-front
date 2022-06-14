import { Component, OnDestroy, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { svgMatIcon } from "./svg-mat-icon-data";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnDestroy, OnInit {
  popupVisible: boolean = false;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private translate: TranslateService
  ) {
    this.svgAdded();
  }
  async ngOnInit() {
    if (localStorage.getItem("lang") == null) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use(localStorage.getItem("lang"));
    }
  }
  ngOnDestroy() {
    this.translate.use(this.translate.getBrowserLang());
  }

  svgAdded() {
    svgMatIcon.forEach((item) => {
      this.matIconRegistry.addSvgIcon(
        item.SvgName,
        this.domSanitizer.bypassSecurityTrustResourceUrl(item.SvgPath)
      );
    });
  }
}
