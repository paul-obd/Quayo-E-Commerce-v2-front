import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInput, MatInputModule } from '@angular/material/input';
import { DxLookupModule, DxRangeSelectorModule } from 'devextreme-angular';
import { DashboardComponentsService } from '../../../../../shared/services/dashboard/dashboard-components.service';
import { DashboardDatasourceService } from '../../../../../shared/services/dashboard/dashboard-datasource.service';
import { DashboardRefreshService } from '../../../../../shared/services/dashboard/dashboard-refresh.service';
import { BaseComponentType } from '../BaseComponentType';

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
  selector: 'app-dashboard-date-filter',
  templateUrl: './dashboard-date-filter.component.html',
    styleUrls: ['./dashboard-date-filter.component.css'],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ]
})
export class DashboardDateFilterComponent extends BaseComponentType implements OnInit {

  defaultHeight: string = '150px'

    daysBeforeInput: Array<any>;

    constructor(
        private dashboardComponentService: DashboardComponentsService,
        private dashboardDatasourceService: DashboardDatasourceService,
        private dashboardRefreshService: DashboardRefreshService
    ) {
        super();
    }

    ngOnInit() {
        let componentRef = this.dashboardComponentService.getComponentReferenceById(this.properties.id);
        setTimeout(() => {
            componentRef.isDefaultStyle = false;
            componentRef.isDefaultBackground = false;
        }, 1);

        let dataAsString = JSON.stringify(this.schema.date_as_input);
        let dataAsJson = JSON.parse(dataAsString);
        this.daysBeforeInput = JSON.parse(dataAsJson) as Array<any>;
    }

    datePickerChange(ev: any) {
        this.daysBeforeInput.forEach(data => {
            this.dashboardDatasourceService.setParameterCodeValue(data.componentId, { Code: data.parameterCode, Value: "'" + ev.targetElement.value + "'" })
            this.dashboardRefreshService.refreshComponentDatasource(data.componentId, true, true, false);
        })
    }
}

@NgModule({
    declarations: [DashboardDateFilterComponent],
    imports: [CommonModule, MatDatepickerModule, MatInputModule, DxRangeSelectorModule]
})

export class DashboardDateFilterComponentModule { }
