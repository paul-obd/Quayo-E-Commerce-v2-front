import { Component, OnInit, OnDestroy } from "@angular/core";

import { ActivatedRoute, Router } from "@angular/router";
import { DashboardSchema } from "../../shared/models/dashboard/DashboardSchema";
import { DashboardComponentsService } from "../../shared/services/dashboard/dashboard-components.service";
import { DashboardRefreshService } from "../../shared/services/dashboard/dashboard-refresh.service";
import { SnackBarService } from "../../shared/services/common/snackBarService";
import { DashboardDatasourceService } from "../../shared/services/dashboard/dashboard-datasource.service";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard-main-page.component.html",
    styleUrls: ["./dashboard-main-page.component.scss"],
})
export class DashboardMainPageComponent implements OnInit, OnDestroy {
    dashboardSchema: DashboardSchema;
    isLoading: boolean;

    dashboardId: number;

    isErrorInConnection = false;

    title: HTMLElement;

    constructor(
        private dashboardComponentsService: DashboardComponentsService,
        private dashboardRefreshService: DashboardRefreshService,
        private dashboardDatasourceService: DashboardDatasourceService,
        private snackBarService: SnackBarService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.isLoading = true;
    }

    ngOnInit(): void {
        this.title = document.getElementById("title");
        let titleSeparate = document.getElementById("title-separator");

        this.title.style.display = "inline";
        titleSeparate.style.display = "inline";

        // Cancel the Dashboard refreshing when the url changes
        this.router.events.subscribe((data) => {
            this.dashboardRefreshService.setRefreshStatusAll(false);
            this.dashboardDatasourceService.removeParameterCodeValueAll();
        });

        // Get Dashboard Id Parameter from URL
        this.route.params.subscribe((param) => {
            this.getDashboardSchema(param["id"]);
        });
    }

    ngOnDestroy(): void {
        document.getElementById("title").style.display = "none";
        document.getElementById("title-separator").style.display = "none";
    }

    getDashboardSchema(dashboardId: number) {
        this.dashboardId = dashboardId;

        this.dashboardComponentsService
            .getDashboardSchemaById(dashboardId)
            .subscribe(
                (data) => {
                    this.dashboardSchema = data;
                    this.isLoading = false;
                    this.title.innerText = this.dashboardSchema.caption;

                },
                (error) => {
                    this.isLoading = false;
                    this.snackBarService.openSnackBar(
                        "NO CONNECTION",
                        "custom_icon_technical_exception",
                        3,
                        true
                    );
                    this.isErrorInConnection = true;
                }
            );
    }

    retry() {
        this.isLoading = true;
        this.isErrorInConnection = false;

        this.getDashboardSchema(this.dashboardId);
    }
}
