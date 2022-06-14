import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { DxLookupModule } from 'devextreme-angular';
import { DashboardComponentsService } from '../../../../../shared/services/dashboard/dashboard-components.service';
import { BaseComponentType } from '../BaseComponentType';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { DemoMaterialModule } from '../../../../../demo-material-module';

@Component({
  selector: 'app-dashboard-select-items',
  templateUrl: './dashboard-select-items.component.html',
  styleUrls: ['./dashboard-select-items.component.css']
})
export class DashboardSelectItemsComponent extends BaseComponentType implements OnInit {

    defaultHeight: string = '70px'

    constructor(private dashboardComponentService: DashboardComponentsService) {
        super();
    }

    foods = [
        { value: 'steak-0', viewValue: 'Steak' },
        { value: 'pizza-1', viewValue: 'Pizza' },
        { value: 'tacos-2', viewValue: 'Tacos' }
    ];

    ngOnInit() {
        let componentRef = this.dashboardComponentService.getComponentReferenceById(this.properties.id);
        setTimeout(() => {
            componentRef.isDefaultStyle = false;
            componentRef.isDefaultBackground = false;
        }, 1);
  }

}

@NgModule({
    declarations: [DashboardSelectItemsComponent],
    imports: [CommonModule, DemoMaterialModule]
})

export class DashboardSelectItemsModule { }

