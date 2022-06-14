import { Component, OnInit, Input, NgModule, AfterViewInit } from '@angular/core';
import { BaseComponentType } from '../BaseComponentType';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../../../../../demo-material-module';
import { DxButtonModule, DxCheckBoxModule, DxMapModule } from 'devextreme-angular';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard-map',
  templateUrl: './dashboard-map.component.html',
  styleUrls: ['./dashboard-map.component.scss']
})
export class DashboardMapComponent extends BaseComponentType implements AfterViewInit {

    defaultHeight = '320px';

    constructor() {
      super();
    }

    isMapReady = false;

    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.datasourceChange.subscribe(datasource => {
            this.isMapReady = false;
            this.originalMarkers = [];

            let datasourceAsArray = datasource.Table as Array<any>;

            datasourceAsArray.forEach(pin => {
                this.originalMarkers.push(
                    {
                        location: pin.location_lat + ', ' + pin.location_lng,
                        tooltip: {
                            isShown: pin.tooltip_visibility,
                            text: pin.tooltip_text
                        }
                    })
            })

            this.isMapReady = true;
        });
    }

    mapMarkerUrl = "/assets/images/truck.png";

    originalMarkers;

    showTooltips() {
        this.originalMarkers = this.originalMarkers.map(function (item) {
            let newItem = JSON.parse(JSON.stringify(item));
            newItem.tooltip.isShown = true;
            return newItem;
        });
    }

}

@NgModule({
    declarations: [DashboardMapComponent],
    imports: [CommonModule, BrowserModule, DxMapModule]
})
export class DashboardMapModule { }

