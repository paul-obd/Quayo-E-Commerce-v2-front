import { SharedModule } from "./../shared/shared.module";
import "hammerjs";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { DemoMaterialModule } from "../demo-material-module";
import {
  DxBulletModule,
  DxDataGridModule,
  DxTemplateModule,
  DxTooltipModule,
  DxCheckBoxModule,
  DxGalleryModule,
  DxLoadPanelModule,
  DxPivotGridModule,
  DxChartModule,
} from "devextreme-angular";

import { RouterModule } from "@angular/router";
import { ReportsRoutes } from "./reports.routing";

import { ReportMainPageComponent } from "./report-main-page/report-main-page.component";
import { ReportViewerComponent } from "./report-viewer/report-viewer.component";
import { ReportBarComponent } from "./report-viewer/report-bar/report-bar.component";
import {
  ReportDataComponent,
  GridCellDataPipe,
} from "./report-viewer/report-data/report-data.component";
import { FilterPanelComponent } from "./report-viewer/report-bar/filter-panel/filter-panel.component";
import { FilterPanelItemsComponent } from "./report-viewer/report-bar/filter-panel/filter-panel-items/filter-panel-items.component";
import { FilterItemComponent } from "./report-viewer/report-bar/filter-panel/filter-panel-items/filter-item/filter-item.component";
import { FilterPanelDateActionButtonComponent } from "./report-viewer/report-bar/filter-panel/filter-panel-date-action-button/filter-panel-date-action-button.component";
import { TextMenuTableComponent } from "./report-viewer/report-bar/filter-panel/filter-panel-items/filter-item/text-menu-table/text-menu-table.component";
import { SnackBarContanierComponent } from "../shared/components/snack-bar-contanier/snack-bar-contanier.component";

import { DimScreenComponent } from "./elements/dim-screen/dim-screen.component";

import { ReportsService } from "../shared/services/reports/reports.service";
import { ImageGalleryComponent } from "./report-viewer/report-data/image-gallery/image-gallery.component";
import { TranslateModule } from "@ngx-translate/core";
import { PivotDataGridComponent } from "./report-viewer/report-data/pivot-data-grid/pivot-data-grid.component";
import { StandardDataGridComponent } from "./report-viewer/report-data/standard-data-grid/standard-data-grid.component";
import { ReportLauncherComponent } from "./report-viewer/report-launcher/report-launcher.component";

@NgModule({
  imports: [
    RouterModule.forChild(ReportsRoutes),
    CommonModule,
    DemoMaterialModule,
    FormsModule,
    DxDataGridModule,
    DxCheckBoxModule,
    DxGalleryModule,
    DxBulletModule,
    DxTooltipModule,
    DxTemplateModule,
    SharedModule,
    TranslateModule,
    DxLoadPanelModule,
    DxPivotGridModule,
    DxChartModule,
  ],
  declarations: [
    ReportMainPageComponent,
    ReportViewerComponent,
    GridCellDataPipe,
    ReportBarComponent,
    DimScreenComponent,
    ReportDataComponent,
    FilterPanelComponent,
    FilterPanelItemsComponent,
    FilterItemComponent,
    FilterPanelDateActionButtonComponent,
    TextMenuTableComponent,
    SnackBarContanierComponent,
    ImageGalleryComponent,
    PivotDataGridComponent,
    StandardDataGridComponent,
    ReportLauncherComponent,
  ],
  providers: [ReportsService],
})
export class ReportsModule {}
