import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ComponentFactoryResolver, NgModule, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DxChartComponent, DxChartModule } from 'devextreme-angular';
import { DashboardComponentsService } from '../../../../../shared/services/dashboard/dashboard-components.service';
import { DashboardRefreshService } from '../../../../../shared/services/dashboard/dashboard-refresh.service';
import { ChartTopSideComponent } from '../../shared-elements/chart-top-side/chart-top-side.component';
import { BaseComponentType } from '../BaseComponentType';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import * as ExcelJS from 'exceljs';

@Component({
    selector: 'app-dashboard-basic-charts',
    templateUrl: './dashboard-basic-charts.component.html',
    styleUrls: ['./dashboard-basic-charts.component.css']
})
export class DashboardBasicChartsComponent extends BaseComponentType implements OnInit, AfterViewInit {

    defaultHeight = '400px';

    @ViewChild('chart') dxBarChart: DxChartComponent;
    @ViewChild('chartTopSideContainer', { read: ViewContainerRef }) chartTopSideContainer: ViewContainerRef;

    constructor(private dashboardRefreshService: DashboardRefreshService,
        private dashboardComponentsService: DashboardComponentsService,
        private componentFactoryResolver: ComponentFactoryResolver) {
        super();
    }

    get isComponentHidden() {
        return this.dashboardComponentsService.getComponentReferenceById(this.properties.id).componentHidden;
    }

    ngOnInit(): void {

    }

    export(type: string) {
        switch (type) {
            case 'xlsx':
                this.exportToExcel();
                break;
            default:
                let fileName = this.schema.title + '-' + this.schema.sub_title;
                this.dxBarChart.instance.exportTo(fileName, type);
                break;
        }
    }

    exportToExcel() {
        let workbook = new Workbook();
        let worksheet = workbook.addWorksheet("Data");

        let header = [''];
        if (this.datasource.Table1) {
            this.datasource.Table1.map(x => x.name).forEach(x =>
                header.push(x)
            )

            worksheet.addRow(header);
        }

        for (let x1 of this.datasource.Table) {
            let x2 = Object.keys(x1);
            let temp = []
            for (let y of x2) {
                temp.push(x1[y])
            }
            worksheet.addRow(temp)
        }

        let fname = this.schema.title;

        //add data and file name and download
        workbook.xlsx.writeBuffer().then((data) => {
            let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            fs.saveAs(blob, fname + '-' + new Date().valueOf() + '.xlsx');
        });
    }


    refresh() {
        this.dashboardRefreshService.refreshComponentDatasource(this.properties.id, true, true, true);
        this.dxBarChart.instance.refresh();
    }

    onSeriesClick(e: any) {
        var series = e.target;
        if (series.isVisible()) {
            series.hide();
        } else {
            series.show();
        }
    }

    async ngAfterViewInit() {
        super.ngAfterViewInit();
        await this.loadChartTopSideComponent();
    }

    async loadChartTopSideComponent() {
        const componentFactorya = await this.componentFactoryResolver.resolveComponentFactory(ChartTopSideComponent);
        let componentRef = await this.chartTopSideContainer.createComponent(componentFactorya);

        componentRef.instance.title = this.schema.title;
        componentRef.instance.subTitle = this.schema.sub_title;
        componentRef.instance.Export.subscribe(type => {
            this.export(type);
        });
        componentRef.instance.Refresh.subscribe(() => {
            this.refresh();
        });
    }

    customizeTooltip(arg: any) {
        return {
            text: arg.argumentText + "<br/>" + arg.valueText
        };
    }
}

@NgModule({
  declarations:[DashboardBasicChartsComponent],
  imports: [DxChartModule,CommonModule]
})
export class DashboardBasicChartsModule { }
