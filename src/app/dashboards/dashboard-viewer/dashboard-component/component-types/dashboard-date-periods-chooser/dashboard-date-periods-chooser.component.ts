import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit, Renderer2, ViewChild } from '@angular/core';
import { number } from 'ngx-custom-validators/src/app/number/validator';
import { DashboardComponentsService } from '../../../../../shared/services/dashboard/dashboard-components.service';
import { DashboardDatasourceService } from '../../../../../shared/services/dashboard/dashboard-datasource.service';
import { DashboardRefreshService } from '../../../../../shared/services/dashboard/dashboard-refresh.service';
import { BaseComponentType } from '../BaseComponentType';

@Component({
  selector: 'app-dashboard-date-periods-chooser',
  templateUrl: './dashboard-date-periods-chooser.component.html',
  styleUrls: ['./dashboard-date-periods-chooser.component.css']
})
export class DashboardDatePeriodsChooserComponent extends BaseComponentType implements OnInit {

    defaultHeight: string = '15px'
    activeButtonOrder: number = 1;

    dateInput: Array<any>;

    @ViewChild('todayButton') todayButton: HTMLElement;

    constructor(
        private dashboardComponentService: DashboardComponentsService,
        private dashboardDatasourceService: DashboardDatasourceService,
        private dashboardRefreshService: DashboardRefreshService) {
        super();
    }

    ngOnInit() {
        let componentRef = this.dashboardComponentService.getComponentReferenceById(this.properties.id);
        setTimeout(() => {
            componentRef.isDefaultStyle = false;
            componentRef.isDefaultBackground = false;
        }, 1);

        let dataAsString = JSON.stringify(this.schema.days_before_as_input);
        let dataAsJson = JSON.parse(dataAsString);
        this.dateInput = JSON.parse(dataAsJson) as Array<any>;
    }

    clickOnPeriod(status: string) {
        let date = new Date()

        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        switch (status) {
            case 'today':
                this.activeButtonOrder = 1
                break;
            case 'last7days':
                this.activeButtonOrder = 2
                date.setDate(date.getDate() - 7)

                year = date.getFullYear();
                month = date.getMonth() + 1;
                day = date.getDate();

                break;
            case 'mtd':
                this.activeButtonOrder = 3
                day = 1;
                break;
            case 'qtd':
                this.activeButtonOrder = 4
                month = Math.floor((date.getMonth()) / 3);
                month = (month * 3) + 1;

                day = 1;
                break;
            case 'ytd':
                this.activeButtonOrder = 5
                month = 1;
                day = 1;
                break;
        }

        let dateValue = year.toString() + '-' + month.toString() + '-' + day.toString();
        this.dataChange(dateValue);
    }

    dataChange(date: string) {
        this.dateInput.forEach(data => {
            this.dashboardDatasourceService.setParameterCodeValue(data.componentId, { Code: data.parameterCode, Value: "'" + date + "'" })
            this.dashboardRefreshService.refreshComponentDatasource(data.componentId, true, true, false);
        });
    }

}

@NgModule({
    declarations: [DashboardDatePeriodsChooserComponent],
    imports: [CommonModule]
})

export class DashboardDatePeriodsChooserComponentModule { }

