import {
  Component,
  ViewChild,
  Input,
  OnInit,
  AfterViewInit,
} from "@angular/core";
import { FilterPanelComponent } from "./filter-panel/filter-panel.component";
import { ReportDataComponent } from "../report-data/report-data.component";
import { IconButtonComponent } from "../../../shared/components/icon-button/icon-button.component";
import { Filters } from "../../../shared/models/reports/Filters";
import { MatDialog } from "@angular/material/dialog";
import { ReportViewerComponent } from "../report-viewer.component";
import { ReportsService } from "../../../shared/services/reports/reports.service";
import { SnackBarService } from "../../../shared/services/common/snackBarService";

/** ReportBar component*/
@Component({
  selector: "app-report-bar",
  templateUrl: "./report-bar.component.html",
  styleUrls: ["./report-bar.component.scss"],
})
export class ReportBarComponent implements OnInit, AfterViewInit {
  get datasource() {
    return this.reportDataComponent.dataSource;
  }

  get hasReportData() {
    return this.datasource != null ? true : false;
  }

  get hasReportFilters() {
    return this.FiltersData.filters.length !== 0 ? true : false;
  }

  /** ReportBar ctor */
  constructor(
    private reportService: ReportsService,
    private _snackBarService: SnackBarService,
    private _dialog: MatDialog
  ) {}

  @ViewChild(FilterPanelComponent) filterpanelComponent: FilterPanelComponent;
  @ViewChild("filterButton") filterButton: IconButtonComponent;

  @Input() reportViewerComponent: ReportViewerComponent;
  @Input() reportDataComponent: ReportDataComponent;

  @Input() FiltersData: Filters;
  @Input() reportTitle = "";

  panelOpen = false;
  reportOverview = "";
  isLoadingExportFile = false;
  withTemplateVisible = false;
  exportExcelEnabled = false;
  exportPdfEnabled = false;
  exportSpecialPdfEnabled = false;
  exportCsvEnabled = false;
  isReportFavorite = false;
  panelLock = false;

  selectedKeys: Array<string> = [];
  animate = false;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.exportExcelEnabled =
        this.reportDataComponent._reportSchema.is_exportable_XLSX;
      this.exportPdfEnabled =
        this.reportDataComponent._reportSchema.is_exportable_PDF;
      this.exportSpecialPdfEnabled =
        this.reportDataComponent._reportSchema.has_special_pdf_export;
      this.exportCsvEnabled =
        this.reportDataComponent._reportSchema.is_exportable_Csv;
      this.isReportFavorite =
        this.reportDataComponent._reportSchema.is_favorite;
    }, 1);
  }

  ngOnInit(): void {}

  togglePanel() {
    if (this.panelOpen) {
      this.hidePanel();
    } else {
      this.showPanel();
    }
  }

  showPanel() {
    this.filterpanelComponent.show();
    this.reportDataComponent.showDimScreen();
    if (this.hasReportFilters) {
      this.filterButton.arrow = "expand_less";
    }
    this.panelOpen = true;
  }
  toggleWithTemplate() {
    this.reportOverview =
      this.reportDataComponent._reportSchema.overview.toString();
    this.withTemplateVisible = !this.withTemplateVisible;
  }
  hidePanel() {
    if (this.hasReportData && !this.panelLock) {
      this.filterpanelComponent.hide();
      this.reportDataComponent.hideDimScreen();
      if (this.hasReportFilters) {
        this.filterButton.arrow = "expand_more";
      }
      this.panelOpen = false;
    }
  }

  // Export Section
  exportAllData(format: string) {
    let isAvailableToExport = true;

    if (this.hasReportData) {
      if (format === "xlsx" && this.datasource._totalCount > 1000000) {
        isAvailableToExport = false;
        this._snackBarService.openSnackBar(
          "Can't export the data to excel over one million rows !!",
          "custom_icon_business_exception",
          3
        );
      }
    }

    if (isAvailableToExport) {
      const reportId =
        this.reportDataComponent._reportSchema.reportId.toString();
      const reportName =
        this.reportDataComponent._reportSchema.description.toString();
      const reportUniqueId = this.reportService.getReportUniqueId();
      if (reportUniqueId) {
        this.isLoadingExportFile = true;
        this.reportService
          .exportReport(reportId, reportUniqueId, reportName, format)
          .subscribe(
            (res) => {
              this.isLoadingExportFile = false;
            },
            (error) => {
              this.isLoadingExportFile = false;
              console.log(error);
            }
          );
      }
    }
  }

  exportSpecial(format: string) {
    const isAvailableToExport = true;

    if (isAvailableToExport) {
      const reportId =
        this.reportDataComponent._reportSchema.reportId.toString();
      const reportUniqueId = this.reportService.getReportUniqueId();
      if (reportUniqueId) {
        if (
          this.reportDataComponent.standardDataGrid.dataGrid.instance.getSelectedRowKeys()
            .length === 0
        ) {
          this._snackBarService.openSnackBar(
            "No rows selected !!",
            "custom_icon_business_exception",
            3
          );
        } else if (
          this.reportDataComponent.standardDataGrid.dataGrid.instance.getSelectedRowKeys()
            .length > 75
        ) {
          this._snackBarService.openSnackBar(
            "Maximum you can select 75 rows !!",
            "custom_icon_business_exception",
            3
          );
        } else {
          const selectedArray: any[] =
            this.reportDataComponent.standardDataGrid.dataGrid.instance.getSelectedRowKeys();
          this.selectedKeys = [];
          selectedArray.forEach((element) => {
            this.selectedKeys.push(element[Object.keys(element)[0]]);
          });
          this.isLoadingExportFile = true;
          this.reportService
            .exportSpecialReport(
              reportId,
              reportUniqueId,
              this.selectedKeys.join(",")
            )
            .subscribe(
              (res) => {
                this.isLoadingExportFile = false;
              },
              (error) => {
                this.isLoadingExportFile = false;
                console.log(error);
              }
            );
        }
      }
    }
  }
  exportToExcelSelectedData() {
    const reportName =
      this.reportDataComponent._reportSchema.description.toString();
    const date = new Date();
    const fileName =
      reportName +
      " (" +
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1).toString() +
      "-" +
      date.getDate() +
      ")";

    const reportType = this.reportDataComponent._reportSchema.report_type;
    if (reportType == "3") {
      this.reportDataComponent.standardDataGrid.dataGrid.export = {
        fileName: fileName,
      };
      this.reportDataComponent.standardDataGrid.dataGrid.instance.exportToExcel(
        false
      );
    }
    if (reportType == "11") {
      this.reportDataComponent.pivotDataGridComponent.pivotGrid.export = {
        fileName: fileName,
      };
      this.reportDataComponent.pivotDataGridComponent.pivotGrid.instance.exportToExcel();
    }

    this.reportDataComponent.refreshView();
  }

  showColumnChooser() {
    const reportType = this.reportDataComponent._reportSchema.report_type;
    if (reportType == "3") {
      this.reportDataComponent.standardDataGrid.dataGrid.instance.showColumnChooser();
    }
    if (reportType == "11") {
      this.reportDataComponent.pivotDataGridComponent.pivotGrid.instance
        .getFieldChooserPopup()
        .show();
    }
  }

  toggleFavorite() {
    const reportId = this.reportDataComponent._reportSchema.reportId.toString();
    this.isReportFavorite = !this.isReportFavorite;
    console.log(this.isReportFavorite);
    this.reportService
      .updateReportFavorite(reportId, this.isReportFavorite)
      .subscribe(
        (res) => {},
        (error) => {
          console.log(error);
        }
      );
  }
}
