import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-index-path",
  templateUrl: "./index-path.component.html",
  styleUrls: ["./index-path.component.css"],
})
export class IndexPathComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {
    this._router.navigateByUrl(
      //  "/dashboards/dashboard/" + localStorage.getItem("defaultDashboardId")
      "/e-commerce/e-commerce-main-page/home"
    );
  }
}
