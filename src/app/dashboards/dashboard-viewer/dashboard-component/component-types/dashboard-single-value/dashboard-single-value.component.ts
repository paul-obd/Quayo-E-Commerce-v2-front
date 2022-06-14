import { Component, OnInit, Input, NgModule } from '@angular/core';
import { BaseComponentType } from '../BaseComponentType';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../../../../../demo-material-module';

@Component({
  selector: 'app-dashboard-single-value',
  templateUrl: './dashboard-single-value.component.html',
  styleUrls: ['./dashboard-single-value.component.scss']
})
export class DashboardSingleValueComponent extends BaseComponentType {

    defaultHeight = '70px';

    constructor() {
      super();
    }

    ngOnInit(): void {

    }
}
@NgModule({
  declarations:[DashboardSingleValueComponent],
  imports: [CommonModule,DemoMaterialModule]
})
export class DashboardSingleValueModule { }

