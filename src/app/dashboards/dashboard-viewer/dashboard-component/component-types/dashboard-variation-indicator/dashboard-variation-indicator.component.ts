import { Component, OnInit, Input, NgModule, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterViewInit } from '@angular/core';
import { BaseComponentType } from '../BaseComponentType';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../../../../../demo-material-module';

@Component({
    selector: 'app-dashboard-variation-indicator',
    templateUrl: './dashboard-variation-indicator.component.html',
    styleUrls: ['./dashboard-variation-indicator.component.scss']
})
export class DashboardVariationIndicatorComponent extends BaseComponentType implements AfterViewInit {

    defaultHeight = '120px';

    @ViewChild('chartTopSideContainer', { read: ViewContainerRef }) chartTopSideContainer: ViewContainerRef;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
      super();
    }

    ngOnInit(): void {

    }

    async ngAfterViewInit() {
        super.ngAfterViewInit();
    }
}
@NgModule({
    declarations: [DashboardVariationIndicatorComponent],
  imports: [CommonModule,DemoMaterialModule]
})
export class DashboardVariationIndicatorComponentModule { }

