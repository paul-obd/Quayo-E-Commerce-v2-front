import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, NgModule, OnInit } from '@angular/core';
import { DxDataGridModule } from 'devextreme-angular';
import { BaseComponentType } from '../BaseComponentType';

@Component({
  selector: 'app-dashboard-datagrid',
  templateUrl: './dashboard-datagrid.component.html',
  styleUrls: ['./dashboard-datagrid.component.scss']
})
export class DashboardDatagridComponent extends BaseComponentType implements OnInit {
  
  defaultHeight = '200px';

    constructor() {
      super();
  }

    ngOnInit(): void {

    }
}

@NgModule({
  declarations:[DashboardDatagridComponent],
  imports: [DxDataGridModule,CommonModule]
})
export class DashboardDatagridModule { }

