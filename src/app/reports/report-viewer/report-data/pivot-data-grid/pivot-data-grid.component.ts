import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import {
  DxPivotGridModule,
  DxPivotGridComponent,
  DxChartModule,
  DxChartComponent,
} from "devextreme-angular";
import { ReportDataComponent } from "../report-data.component";
import { exportPivotGrid } from "devextreme/excel_exporter";

// import * as ExcelJS from "exceljs/dist/exceljs.min.js";
import saveAs from "file-saver";
import { Workbook } from "exceljs";

@Component({
  selector: "app-pivot-data-grid",
  templateUrl: "./pivot-data-grid.component.html",
  styleUrls: ["./pivot-data-grid.component.css"],
})
export class PivotDataGridComponent implements OnInit, AfterViewInit {
  @ViewChild(DxPivotGridComponent, { static: false })
  pivotGrid: DxPivotGridComponent;
  @ViewChild(DxChartComponent, { static: false }) chart: DxChartComponent;

  @Input() reportData: ReportDataComponent;

  pivotGridDataSource: any;

  isPivotReady = false;

  constructor() {
    this.customizeTooltip = this.customizeTooltip.bind(this);
  }

  setDatasource(datasource: any) {
    let fieldStore = [];

    this.reportData._reportSchema.report_field.forEach((e) => {
      let pivotField = {
        caption: e.caption,
        dataField: e.report_field_name,

        area:
          e.pivot_area_id == 0
            ? "row"
            : e.pivot_area_id == 1
            ? "column"
            : e.pivot_area_id == 2
            ? "data"
            : "filter",

        visible: e.is_visible,
        summaryType:
          e.pivot_summary_type == "" ? undefined : e.pivot_summary_type,
        dataType:
          e.field_type == 0
            ? "string"
            : e.field_type == 1
            ? "number"
            : e.field_type == 3
            ? "date"
            : "string",
        format: e.field_format == "" ? undefined : e.field_format,
      };

      fieldStore.push(pivotField);
    });

    this.pivotGridDataSource = {
      remoteOperations: true,
      store: datasource,
      fields: fieldStore,
    };

    this.isPivotReady = true;
  }

  customizeTooltip(args) {
    return {
      html:
        args.seriesName +
        " | Total<div class='currency'>" +
        args.valueText +
        "</div>",
    };
  }

  onExporting(e) {
    const reportTitle = this.reportData._reportSchema.description;
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("sheet 1");
    exportPivotGrid({
      component: e.component,
      worksheet: worksheet,
    }).then(function () {
      workbook.xlsx.writeBuffer().then(function (buffer: BlobPart) {
        saveAs(
          new Blob([buffer], { type: "application/octet-stream" }),
          reportTitle + ".xlsx"
        );
      });
    });
    e.cancel = true;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    // var pivotInstance=$("#gridContainer").dxPivotGrid("instance");
    // var chartInstance=$("#chartContainer").dxChart("instance");
    // console.log(pivotInstance);
    // console.log(this.pivotGrid);
    // this.pivotGrid.instance.bindChart(this.chart.instance, {
    //   dataFieldsDisplayMode: "splitPanes",
    //   alternateDataFields: false
    // });
  }
}
