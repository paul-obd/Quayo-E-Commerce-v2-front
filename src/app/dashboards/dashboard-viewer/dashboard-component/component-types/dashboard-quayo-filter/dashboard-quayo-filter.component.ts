import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DemoMaterialModule } from '../../../../../demo-material-module';
import { DashboardComponentsService } from '../../../../../shared/services/dashboard/dashboard-components.service';
import { ReportsService } from '../../../../../shared/services/reports/reports.service';
import { BaseComponentType } from '../BaseComponentType';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DashboardDatasourceService } from '../../../../../shared/services/dashboard/dashboard-datasource.service';
import { DashboardRefreshService } from '../../../../../shared/services/dashboard/dashboard-refresh.service';
import { Moment } from 'moment';
import  moment from 'moment';

export const MY_FORMATS = {
    parse: {
        dateInput: 'YYYY-MM-DD',
    },
    display: {
        dateInput: 'YYYY-MM-DD',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
    selector: 'app-dashboard-quayo-filter',
    templateUrl: './dashboard-quayo-filter.component.html',
    styleUrls: ['./dashboard-quayo-filter.component.css'],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ]
})
export class DashboardQuayoFilterComponent extends BaseComponentType implements OnInit {

    defaultHeight: string = '60px'

    items = new FormControl();
    itemsList: string[];

    dateFromInput: Array<any>;
    dateToInput: Array<any>;
    itemsToInput: Array<any>;

    start: Moment;
    end: Moment;

    constructor(private reportService: ReportsService,
        private dashboardComponentService: DashboardComponentsService,
        private dashboardRefreshService: DashboardRefreshService,
        private dashboardDatasourceService: DashboardDatasourceService) {
        super();
    }

    ngOnInit() {
        this.start = moment();
        this.end = moment();

        let componentRef = this.dashboardComponentService.getComponentReferenceById(this.properties.id);
        setTimeout(() => {
            componentRef.isDefaultStyle = false;
            componentRef.isDefaultBackground = false;
        }, 1);

        this.reportService.getFilterDataIndexedDB('items').then((data) => {
            this.itemsList = data.map(d => {
                let rObj = { code: d.code, description: d.description }
                return rObj;
            })
        });

        let dataAsString = JSON.stringify(this.schema.date_from_as_input);
        let dataAsJson = JSON.parse(dataAsString);
        this.dateFromInput = JSON.parse(dataAsJson) as Array<any>;

        dataAsString = JSON.stringify(this.schema.date_to_as_input);
        dataAsJson = JSON.parse(dataAsString);
        this.dateToInput = JSON.parse(dataAsJson) as Array<any>;

        dataAsString = JSON.stringify(this.schema.items_as_input);
        dataAsJson = JSON.parse(dataAsString);
        this.itemsToInput = JSON.parse(dataAsJson) as Array<any>;
    }

    closeSelect(event: any) {
        if (event == false) {
            this.applyFilter();
        }
    }

    applyFilter() {
        let startDate = this.start.year() + '-' + (this.start.month() + 1).toString() + '-' + this.start.date();
        let endDate = this.end.year() + '-' + (this.end.month() + 1).toString() + '-' + this.end.date();

        this.dateFromInput.forEach(data => {
            this.dashboardDatasourceService.setParameterCodeValue(data.componentId, { Code: data.parameterCode, Value: "'" + startDate + "'" })
        })

        this.dateToInput.forEach(data => {
            this.dashboardDatasourceService.setParameterCodeValue(data.componentId, { Code: data.parameterCode, Value: "'" + endDate + "'" })
        })


        let itemsAsString = '';
        this.items.value.forEach(item => {
            if (itemsAsString == '') {
                itemsAsString = item
            }
            else {
                itemsAsString = itemsAsString + ',' + item
            }
        })

        this.itemsToInput.forEach(data => {
            this.dashboardDatasourceService.setParameterCodeValue(data.componentId, { Code: data.parameterCode, Value: "'" + itemsAsString + "'" })
        })

        this.dateToInput.forEach(data => {
            this.dashboardRefreshService.refreshComponentDatasource(data.componentId, true, true, false);
        })
    }
}

@NgModule({
    declarations: [DashboardQuayoFilterComponent],
    imports: [CommonModule, DemoMaterialModule, FormsModule, ReactiveFormsModule]
})
export class DashboardQuayoFilterModule { }

