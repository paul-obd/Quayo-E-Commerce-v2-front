import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DxDataGridComponent } from "devextreme-angular";
import {
  ReportActionType,
  ReportFieldTypes,
} from "../../../../shared/constants/enums.constant";
import { CustomProcedureParameters } from "../../../../shared/models/reports/CustomProcedureParameters";
import { Report_Field } from "../../../../shared/models/reports/ReportSchema";
import { AppTranslateService } from "../../../../shared/services/app-translate.service";
import { SnackBarService } from "../../../../shared/services/common/snackBarService";
import { ReportsService } from "../../../../shared/services/reports/reports.service";
import { ImageGalleryComponent } from "../image-gallery/image-gallery.component";
import { ReportDataComponent } from "../report-data.component";
import { confirm } from "devextreme/ui/dialog";

let dataGridColumnsGlobal: Array<Report_Field>;

@Component({
  selector: "app-standard-data-grid",
  templateUrl: "./standard-data-grid.component.html",
  styleUrls: ["./standard-data-grid.component.css"],
})
export class StandardDataGridComponent implements OnInit, AfterViewInit {
  @Input() reportData: ReportDataComponent;

  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid: DxDataGridComponent;

  datasource: any;

  popupPosition: any;

  selectionEnabled: boolean;
  summary: {};
  groupedColumns: Array<string> = [];

  isColumnAutoWidth = false;
  cursor: number;
  selectedKeys: string[] = [];

  constructor(
    private _reportService: ReportsService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private _translate: AppTranslateService,
    private _snackBarService: SnackBarService
  ) {
    this.popupPosition = {
      of: window,
      at: "top",
      my: "top",
      offset: { y: 10 },
    };
  }
  ngAfterViewInit(): void {
    this._reportService.moveDatagridBarToReportBar();
  }

  ngOnInit() {
    dataGridColumnsGlobal = this.reportData._reportSchema.report_field;
    this.populateGroupedColumnsList();
    this.checkingSelection();
    if (this.reportData._reportSchema.report_field.length > 6) {
      this.isColumnAutoWidth = true;
    }

    this.showSummary();
  }

  setDatasource(datasource: any) {
    this.datasource = { store: datasource };
  }

  // Columns properties changing area
  customizeColumns(columns: any) {
    for (const column of columns) {
      const dataGridResultColumn = dataGridColumnsGlobal.filter(
        (item) =>
          item.report_field_name.toLowerCase() ===
          column.dataField.toLowerCase()
      )[0];
      if (dataGridResultColumn) {
        column.caption = dataGridResultColumn.caption;

        let fieldType: string;
        switch (dataGridResultColumn.field_type) {
          case ReportFieldTypes.Text:
            fieldType = "string";
            break;
          case ReportFieldTypes.Number:
            fieldType = "number";
            break;
          case ReportFieldTypes.Date:
            fieldType = "date";
            break;
          case ReportFieldTypes.ImageGallery:
            fieldType = "string";

            column.cellTemplate = "cellImageTemplate";
            break;
          case ReportFieldTypes.Variation:
            fieldType = "string";
            column.cellTemplate = "diffCellTemplate";
            break;
          case ReportFieldTypes.Percentage:
            fieldType = "number";
            column.cellTemplate = "percentageCellTemplate";
            column.format = "percent";
            break;
          case ReportFieldTypes.Currency:
            fieldType = "string";
            column.cellTemplate = "cellCurrencyTemplate";
            break;
          case ReportFieldTypes.ClientStatus:
            fieldType = "string";
            column.cellTemplate = "cellClientStatusTemplate";
            break;
          default:
            fieldType = "string";
            break;
        }
        column.dataType = fieldType;

        column.format = dataGridResultColumn.field_format;
        column.visible = dataGridResultColumn.is_visible;
        if (dataGridResultColumn.report_field_name === "color") {
          column.visible = false;
        }

        if (dataGridResultColumn.group_index !== null) {
          column.groupIndex = dataGridResultColumn.group_index;
        }
        column.allowGrouping = dataGridResultColumn.is_grouped;
        column.allowSorting = dataGridResultColumn.is_sortable;
        column.allowSearch = dataGridResultColumn.is_searchable;
      }
    }
  }

  showSummary() {
    const items = [
      {
        column:
          this.reportData._reportSchema.report_field[0].report_field_name.toLowerCase(),
        summaryType: "count",
        valueFormat: "#,##0.##",
      },
    ];

    const SummableColumns = this.reportData._reportSchema.report_field.filter(
      (x) =>
        x.is_summable === true ||
        x.is_avg === true ||
        x.is_max === true ||
        x.is_min === true
    );

    for (const column of SummableColumns) {
      if (column.is_summable === true) {
        items.push({
          column: column.report_field_name,
          summaryType: "sum",
          valueFormat: column.field_format,
        });
      }
      if (column.is_avg === true) {
        items.push({
          column: column.report_field_name,
          summaryType: "avg",
          valueFormat: column.field_format,
        });
      }
      if (column.is_max === true) {
        items.push({
          column: column.report_field_name,
          summaryType: "max",
          valueFormat: column.field_format,
        });
      }
      if (column.is_min === true) {
        items.push({
          column: column.report_field_name,
          summaryType: "min",
          valueFormat: column.field_format,
        });
      }
    }

    this.summary = { totalItems: items };
  }

  getMasterDetailGridDataSource(key: string): any {
    const reportId = this.reportData._reportSchema.reportId.toString();
    return this._reportService.getMasterDetails(reportId, key);
  }
  // on initialize report make those columns grouped directly with summary
  populateGroupedColumnsList() {
    this.reportData._reportSchema.report_field.forEach((column) => {
      if (column.group_index != null) {
        this.groupedColumns.push(column.report_field_name);
      }
    });
  }
  // selection changed
  selectionChanged(event) {
    const selectedArray: any[] = event.selectedRowsData;
    this.selectedKeys = [];
    selectedArray.forEach((element) => {
      this.selectedKeys.push(element[Object.keys(element)[0]]);
    });
  }
  // build context menu
  addMenuItems(e) {
    if (
      e.target === "content" &&
      this.selectedKeys != null &&
      this.selectedKeys.length > 0
    ) {
      if (!e.items) {
        e.items = [];
      }

      this.reportData._reportSchema.report_context_menu_items.forEach(
        (element) => {
          if (
            element.report_action_type ===
            ReportActionType.ExecuteCustomProcedure
          ) {
            e.items.push({
              text: element.description,
              icon: element.icon_name,
              onItemClick: () => {
                // tslint:disable-next-line: max-line-length
                const result = confirm(
                  "<p>" +
                    this._translate.getTranslation("ARE YOU SURE") +
                    "</p>",
                  this._translate.getTranslation("CONFIRM CHANGES")
                );
                const customProcedureParameters =
                  new CustomProcedureParameters();
                customProcedureParameters.procedureName =
                  element.procedure_name;
                customProcedureParameters.ids = this.selectedKeys;
                result.then((dialogResult) => {
                  if (dialogResult) {
                    this._reportService
                      .executeCustomProcedure(customProcedureParameters)
                      .subscribe(
                        (res) => {
                          // tslint:disable-next-line: no-shadowed-variable
                          const response: Response = res as Response;
                          if (res.code === "0") {
                            this._snackBarService.openSnackBar(
                              res.message,
                              "custom_icon_success",
                              3
                            );
                          } else {
                            this._snackBarService.openSnackBar(
                              res.message,
                              "custom_icon_business_exception",
                              3
                            );
                          }
                        },
                        (error) => {
                          this._snackBarService.openSnackBar(
                            error.error.UserMessage,
                            "custom_icon_business_exception",
                            3
                          );
                        }
                      );
                  }
                });
              },
            });
          }
        }
      );
    }
  }

  // on initialize report make rows colored with respect the value of color field.
  colorizeRows(e: any): void {
    if (
      e.rowType === "data" &&
      this.reportData._reportSchema.is_colored &&
      e.data.color != null
    ) {
      e.rowElement.className = e.rowElement.className.replace("dx-row-alt", "");
      for (
        let i = 0;
        i < this.reportData._reportSchema.report_field.length - 1;
        i++
      ) {
        e.rowElement.getElementsByTagName("td")[i].style.backgroundColor =
          e.data.color.toString();
      }
    }
  }

  // enable/disable selection on grid
  checkingSelection() {
    this.selectionEnabled =
      this.reportData._reportSchema.has_special_pdf_export === true ||
      this.reportData._reportSchema.has_context_menu_items === true;
  }
  openDialog(data: any): void {
    const reportId = this.reportData._reportSchema.reportId.toString();
    const ownerCode = data.image;

    const dialogRef = this.dialog.open(ImageGalleryComponent, {
      width: "80vw",
      height: "80vh",
      data: { reportId: reportId, ownerCode: ownerCode },
    });
  }
  abs(value: number): number {
    return Math.abs(value);
  }

  // for client status columns
  getClientStatusFlag(statusId: string): string {
    switch (statusId) {
      case "1": {
        return "custom_icon_green";
      }
      case "2": {
        return "custom_icon_red";
      }
      case "3": {
        return "custom_icon_yellow";
      }
      case "8": {
        return "custom_icon_orange";
      }
      case "9": {
        return "custom_icon_grey";
      }
      case "10": {
        return "custom_icon_black";
      }
      case "11": {
        return "custom_icon_blue";
      }
      default: {
        return "custom_icon_green";
      }
    }
  }
  // for client status columns
  getClientStatusDescription(statusId: string): string {
    const language = localStorage.getItem("lang");
    switch (statusId) {
      case "1": {
        return language === "en" ? "Active" : "Actif";
      }
      case "2": {
        return language === "en" ? "Blocked" : "Bloqu�";
      }
      case "3": {
        return language === "en" ? "Stopped" : "Arr�t�";
      }
      case "8": {
        return language === "en" ? "Dormant" : "Dormant";
      }
      case "9": {
        return language === "en" ? "Lost" : "Non s�rvi";
      }
      case "10": {
        return language === "en" ? "Black List" : "Liste Noire";
      }
      case "11": {
        return language === "en" ? "Modified" : "Modifi�";
      }
      default: {
        return language === "en" ? "Blocked" : "Bloqu�";
      }
    }
  }
}
