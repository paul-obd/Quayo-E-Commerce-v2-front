import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { DxRangeSelectorModule } from 'devextreme-angular';
import { DashboardComponentsService } from '../../../../../shared/services/dashboard/dashboard-components.service';
import { BaseComponentType } from '../BaseComponentType';

@Component({
  selector: 'app-dashboard-date-period-filter',
  templateUrl: './dashboard-date-period-filter.component.html',
  styleUrls: ['./dashboard-date-period-filter.component.css']
})
export class DashboardDatePeriodFilterComponent extends BaseComponentType implements OnInit {

    defaultHeight: string = '150px'

    startValue: Date = new Date(2019, 12, 1);
    endValue: Date = new Date(2020, 12, 1);
    selectedStartValue: Date = new Date(2011, 1, 5);
    selectedEndValue: Date = new Date(2011, 2, 5);

    constructor(private dashboardComponentService: DashboardComponentsService,
    ) { super(); }

    ngOnInit() {
        let componentRef = this.dashboardComponentService.getComponentReferenceById(this.properties.id);
        setTimeout(() => {
            componentRef.isDefaultStyle = false;
            componentRef.isDefaultBackground = false;
        }, 1);

    }
}

@NgModule({
    declarations: [DashboardDatePeriodFilterComponent],
    imports: [CommonModule, DxRangeSelectorModule]
})

export class DashboardDatePeriodFiltertModule { }

