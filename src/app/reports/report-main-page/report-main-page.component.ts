import { Component, OnInit, ViewChild } from "@angular/core";
import { Filters } from "../../shared/models/reports/Filters";
import { FiltersResult } from "../../shared/models/reports/FiltersResult";
import {
  ReportSchema,
  DataGridData,
} from "../../shared/models/reports/ReportSchema";
import { ReportViewerComponent } from "../report-viewer/report-viewer.component";
import DataSource from "devextreme/data/data_source";
import { ActivatedRoute, Params } from "@angular/router";
import { ReportsService } from "../../shared/services/reports/reports.service";
import { QuayoExceptionResponse } from "../../shared/models/quayoExceptionResponse";
import { SnackBarService } from "../../shared/services/common/snackBarService";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: "app-report-main-page",
  templateUrl: "./report-main-page.component.html",
  styleUrls: ["./report-main-page.component.scss"],
})
export class ReportMainPageComponent implements OnInit {
  @ViewChild("reportViewer") reportViewerComponent: ReportViewerComponent;

  FiltersData: Filters;
  reportSchema: ReportSchema;

  isLoading = true;

  request: Subscription;

  private _reportId = "";

  constructor(
    private _route: ActivatedRoute,
    private _reportsService: ReportsService,
    private _snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    // Get Report Id Parameter from URL
    this._route.params.subscribe(
      (param) => {
        this._reportId = param["id"];
        this._reportsService.resetReportUniqueId();
        this.createReport();
      },
      (errmess) => {
        console.log("Error" + errmess);
      }
    );
  }

  private createReport() {
    this.isLoading = true;

    if (this.reportViewerComponent) {
      if (this.request) {
        if (!this.request.closed) {
          this.request.unsubscribe();
        }
      }
      this.reportViewerComponent.refreshComponent();
    }

    // Get report schema from ReportsService
    this._reportsService.getReportSchemaById(this._reportId).subscribe(
      (data) => {
        this.reportSchema = data;

        const report_filters = data.report_filters;

        // Get filtersData from ReportsService
        this._reportsService.getFiltersData(report_filters).subscribe(
          (data) => {
            this.FiltersData = data;
            this.isLoading = false;
          },
          (error) => {
            console.log(error);
            this.isLoading = false;
          }
        );
      },
      (error) => {
        const quayoExceptionResponse = error.error as QuayoExceptionResponse;
        console.log(quayoExceptionResponse);
        if (quayoExceptionResponse.ExceptionType) {
          if (quayoExceptionResponse.ExceptionType === "Buisness") {
            this._snackBarService.openSnackBar(
              quayoExceptionResponse.UserMessage,
              "custom_icon_business_exception"
            );
          }

          if (quayoExceptionResponse.ExceptionType === "Technical") {
            this._snackBarService.openSnackBar(
              quayoExceptionResponse.UserMessage,
              "custom_icon_technical_exception"
            );
          }
        } else {
          this._snackBarService.openSnackBar(
            "NO CONNECTION",
            "custom_icon_technical_exception",
            3,
            true
          );
        }
        this.isLoading = false;
      }
    );
  }

  fillDataGrid(filtersResult: FiltersResult) {
    const userIdentifier = this._reportsService.getUserUniqueIdentifier();

    filtersResult.reportId = this._reportId;
    filtersResult.timeStamp = this._reportId + "_" + userIdentifier;

    this.applyFilterButtonDisabled(true);
    this.slidePanelLock(true);

    this.request = this._reportsService.getReportData(filtersResult).subscribe(
      (data) => {
        this.slidePanelLock(false);
        this.applyFilterButtonDisabled(false);

        const dataGridData = new DataGridData();
        if (data) {
          this.reportViewerComponent.setDataSource(data);
          this.reportViewerComponent.reportbarComponent.hidePanel();
        }
      },
      (error) => {
        this.applyFilterButtonDisabled(false);
        this.slidePanelLock(false);
        // this.reportViewerComponent.setDataSource(null);
        const quayoExceptionResponse = error.error as QuayoExceptionResponse;
        if (quayoExceptionResponse.ExceptionType) {
          if (quayoExceptionResponse.ExceptionType === "Buisness") {
            this._snackBarService.openSnackBar(
              quayoExceptionResponse.UserMessage,
              "custom_icon_business_exception"
            );
          }
          if (quayoExceptionResponse.ExceptionType === "Technical") {
            this._snackBarService.openSnackBar(
              quayoExceptionResponse.UserMessage,
              "custom_icon_technical_exception"
            );
          }
        } else {
          this._snackBarService.openSnackBar(
            "NO CONNECTION",
            "custom_icon_technical_exception",
            3,
            true
          );
        }
      }
    );
  }

  applyFilterButtonDisabled(disabled: boolean) {
    const filterPanelDateActionButton =
      this.reportViewerComponent.reportbarComponent.filterpanelComponent
        .filterPanelDateActionButton;
    setTimeout(() => {
      filterPanelDateActionButton.buttonDisabled = disabled;
    }, 1);
  }

  slidePanelLock(lock: boolean) {
    this.reportViewerComponent.reportbarComponent.panelLock = lock;
  }
}
