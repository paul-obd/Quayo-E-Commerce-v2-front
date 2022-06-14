import { Component,ViewChild,Input,ChangeDetectionStrategy,ChangeDetectorRef,Pipe,PipeTransform,OnInit, AfterViewInit } from '@angular/core';
import { DimScreenComponent } from '../../elements/dim-screen/dim-screen.component';
import { ReportBarComponent } from '../report-bar/report-bar.component';
import { ReportSchema,Report_Field } from '../../../shared/models/reports/ReportSchema';
import { ReportsService } from '../../../shared/services/reports/reports.service';
import { MatDialog } from '@angular/material/dialog';

import { loadMessages, locale } from 'devextreme/localization';
import { devextremeFrenchLanguage } from '../../../../assets/i18n/Devextreme/fr';
import { StandardDataGridComponent } from './standard-data-grid/standard-data-grid.component';
import { PivotDataGridComponent } from './pivot-data-grid/pivot-data-grid.component';

@Component({
    selector: 'app-report-data',
    templateUrl: './report-data.component.html',
    styleUrls: ['./report-data.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
/** ReportData component*/
export class ReportDataComponent implements OnInit,AfterViewInit {
    @Input()
    set reportSchema(reportSchema: ReportSchema) {
        this.setReportSchema(reportSchema);
    }

    constructor(
        private _reportService: ReportsService,
        private cdr: ChangeDetectorRef,
        public dialog: MatDialog,
    ) {
        // Devextreme language section
        const currentLanguage = localStorage.getItem('lang');
        locale(currentLanguage);
        switch (currentLanguage) {
            case 'fr':
                loadMessages(devextremeFrenchLanguage);
                break;
        }
    }

    @ViewChild(DimScreenComponent) dimScreen: DimScreenComponent;

    @ViewChild(StandardDataGridComponent, { static: false })
    standardDataGrid: StandardDataGridComponent;

    @ViewChild(PivotDataGridComponent, { static: false })
    pivotDataGridComponent: PivotDataGridComponent;
   
    dataGridColumnsGlobal: Array<Report_Field>;

    @Input() reportbarComponent: ReportBarComponent;

    _reportSchema: ReportSchema;
    dataSource: any;

    isStandardDataGrid = false;
    isPivotDataGrid = false;

    ngOnInit(): void {
        this.switchReportType(this._reportSchema.report_type);
       
    }

    switchReportType(reportTypeId: string) {
        if (reportTypeId == '3') { this.isStandardDataGrid = true; }
        if (reportTypeId == '11') { this.isPivotDataGrid = true; }
    }

    setReportSchema(reportSchema: ReportSchema) {
        this._reportSchema = reportSchema;
    }

    // Dim Screen Functions
    showDimScreen(): void {
        this.dimScreen.show();
    }
    hideDimScreen(): void {
        this.dimScreen.hide();
    }
    ///////////////////////

    dimScreenClickEvent() {
        this.reportbarComponent.hidePanel();
    }

    setDataSource(datasource: any) {
        if (this._reportSchema.report_type == '3') {
            this.standardDataGrid.dataGrid.instance.clearFilter();
            this.standardDataGrid.setDatasource(datasource);
        }
        if (this._reportSchema.report_type == '11') {
            this.pivotDataGridComponent.setDatasource(datasource);
           
           
        }

        this.dataSource = datasource;
        this.refreshView();
    }

    refreshView() {
        this.cdr.markForCheck();
    }
    ngAfterViewInit() {
       
      }

}
@Pipe({ name: 'gridCellData' })
export class GridCellDataPipe implements PipeTransform {
    transform(gridData: any) {
        return gridData.data[gridData.column.caption.toLowerCase()];
    }
}
