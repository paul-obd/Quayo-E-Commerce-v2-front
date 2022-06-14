import { Component, OnInit, Input, ViewChild, EventEmitter, AfterViewInit, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { DashboardComponentsService } from '../../../shared/services/dashboard/dashboard-components.service';
import { DashboardComponentProperties } from '../../../shared/models/dashboard/DashboardSchema';
import { DashboardRefreshService } from '../../../shared/services/dashboard/dashboard-refresh.service';
import { DashboardDatasourceService } from '../../../shared/services/dashboard/dashboard-datasource.service';
import { BaseComponentType } from './component-types/BaseComponentType';

@Component({
    selector: 'app-dashboard-component',
    templateUrl: './dashboard-component.html',
    styleUrls: ['./dashboard-component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

    @Input() Properties: DashboardComponentProperties;
    @Input() Schema: any;

    datasourceChange: EventEmitter<any> = new EventEmitter();

    @ViewChild('viewContainerRef', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef

    isDefaultStyle = true;
    isDefaultBackground = true;

    isWhiteBackground = false;

    isDatasourceChangedNotification = false;
    isFirstTime = true;
    isLoading = true;
    isChangeNotificationLock = false;

    isErrorInConnection = false;

    get componentHidden() {
        return (this.isLoading || this.isErrorInConnection);
    }

    constructor(
        private dashboardComponentsService: DashboardComponentsService,
        private dashboardRefreshService: DashboardRefreshService,
        private dashboardDatasourceService: DashboardDatasourceService,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {
    }

    async ngAfterViewInit() {
        await this.loadComponent(this.Properties.typeId);
        this.addTheComponentToServices();
    }

    async loadComponent(componentTypeId: number) {
        let componentType;

        switch (componentTypeId) {
            case 1:
                const { DashboardSingleValueComponent } = await import('./component-types/dashboard-single-value/dashboard-single-value.component');
                componentType = DashboardSingleValueComponent;
                break;
            case 2:
                const { DashboardDatagridComponent } = await import('./component-types/dashboard-datagrid/dashboard-datagrid.component');
                componentType = DashboardDatagridComponent;
                break;
            case 3:
                const { DashboardPieChartComponent } = await import('./component-types/dashboard-pie-chart/dashboard-pie-chart.component');
                componentType = DashboardPieChartComponent;
                break;
            case 4:
                const { DashboardBasicChartsComponent } = await import('./component-types/dashboard-basic-charts/dashboard-basic-charts.component');
                componentType = DashboardBasicChartsComponent;
                break;
            case 5:
                const { DashboardVariationIndicatorComponent } = await import('./component-types/dashboard-variation-indicator/dashboard-variation-indicator.component');
                componentType = DashboardVariationIndicatorComponent;
                break;
            case 6:
                const { DashboardMapComponent } = await import('./component-types/dashboard-map/dashboard-map.component');
                componentType = DashboardMapComponent;
                break;
            case 7:
                const { DashboardDateFilterComponent } = await import('./component-types/dashboard-date-filter/dashboard-date-filter.component');
                componentType = DashboardDateFilterComponent;
                break;
            case 8:
                const { DashboardDatePeriodsChooserComponent } = await import('./component-types/dashboard-date-periods-chooser/dashboard-date-periods-chooser.component');
                componentType = DashboardDatePeriodsChooserComponent;
                break;
            case 9:
                const { DashboardDatePeriodFilterComponent } = await import('./component-types/dashboard-date-period-filter/dashboard-date-period-filter.component');
                componentType = DashboardDatePeriodFilterComponent;
                break;
            case 10:
                const { DashboardSelectItemsComponent } = await import('./component-types/dashboard-select-items/dashboard-select-items.component');
                componentType = DashboardSelectItemsComponent;
                break;
            case 11:
                const { DashboardQuayoFilterComponent } = await import('./component-types/dashboard-quayo-filter/dashboard-quayo-filter.component');
                componentType = DashboardQuayoFilterComponent;
                break;
        }

        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType)
        let componentRef = await this.viewContainerRef.createComponent(componentFactory);

        let componentRefInstance = componentRef.instance as BaseComponentType;

        componentRefInstance.properties = this.Properties;
        componentRefInstance.schema = this.Schema;
        componentRefInstance.datasourceChange = this.datasourceChange;
    }

    ngOnInit(): void {
        if (this.Properties.timeInterval == -1) {
            this.isLoading = false;
        }

        this.datasourceChange.subscribe(() => {
            this.datasourceChangeNotify();
            this.isFirstTime = false;
            this.isLoading = false;
        })

    }

    datasourceChangeNotify() {
        if (!this.isFirstTime && this.isDefaultStyle && !this.isChangeNotificationLock) {
            this.isDatasourceChangedNotification = true;
            this.isDefaultBackground = false;
            this.isWhiteBackground = true;
            setTimeout(() => {
                this.isDefaultBackground = true;
                this.isWhiteBackground = false;
                this.isDatasourceChangedNotification = false;
            }, 1000);

            setTimeout(() => {
                this.isDatasourceChangedNotification = true;
            }, 1500);

            setTimeout(() => {
                this.isDatasourceChangedNotification = false;
            }, 2000);
        }
    }

    private addTheComponentToServices() {
        // Add the component to DashboardComponentsService
        this.dashboardComponentsService.addComponentReference(this);

        // Get the component Datasource from DashboardDatasourceService
        let componentDatasourceObservable = this.dashboardDatasourceService.getComponentDatasourceById(this.Properties.id);

        // Add the component to DashboardRefreshService
        this.dashboardRefreshService.registerComponent(this, componentDatasourceObservable)
        this.dashboardRefreshService.setRefreshStatusByComponentId(this.Properties.id, true);
    }

    public setDatasource(datasource: any) {
        this.datasourceChange.emit(datasource);
    }

    public setLoadingMode(status: boolean) {
        this.isLoading = status;
    }

    public setErrorMode(status: boolean) {
        this.isErrorInConnection = status;
    }

    public setChangeNotoficationLock(status: boolean) {
        this.isChangeNotificationLock = status;
    }

    public retry() {
        this.dashboardRefreshService.refreshComponentDatasource(this.Properties.id, true, true, true);
    }
}
