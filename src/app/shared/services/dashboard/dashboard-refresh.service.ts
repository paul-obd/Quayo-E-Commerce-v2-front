import { EventEmitter, Injectable } from '@angular/core';
import { RefreshComponentFacade } from './RefreshComponentFacade';
import { of, Observable } from 'rxjs';
import { DashboardComponentsService } from './dashboard-components.service';
import { DashboardComponent } from '../../../dashboards/dashboard-viewer/dashboard-component/dashboard-component';

@Injectable({
    providedIn: 'root'
})
export class DashboardRefreshService {

    private refreshComponentFacadeArray: Array<RefreshComponentFacade> = [];

    constructor(private dashboardComponentService: DashboardComponentsService) { }

    registerComponent(component: DashboardComponent, datasourceObservable: Observable<any>) {
        let refreshComponent = new RefreshComponentFacade(component, datasourceObservable, 'Initial');
        let refreshComponentFacadeFilterd = this.refreshComponentFacadeArray.filter(c => c.getComponent().Properties.id == component.Properties.id)[0];

        if (refreshComponentFacadeFilterd) {
            let indexOfRefreshFacade = this.refreshComponentFacadeArray.indexOf(refreshComponentFacadeFilterd, 0);
            this.refreshComponentFacadeArray.splice(indexOfRefreshFacade, 1);
        }

        this.refreshComponentFacadeArray.push(refreshComponent);
    }

    refreshComponentDatasource(componentId: number, withLoadingSpinner: boolean, withErrorMode: boolean, withChangeNotification: boolean): EventEmitter<any> {
        let refreshComponentFacadeFilterd = this.refreshComponentFacadeArray.filter(c => c.getComponent().Properties.id == componentId)[0];

        if (refreshComponentFacadeFilterd) {
           return refreshComponentFacadeFilterd.invokeDatasource(withLoadingSpinner, withErrorMode, withChangeNotification);
        }
    }

    setRefreshStatusByComponentId(componentId: number, isRefresh: boolean) {
        let refreshComponentFacadeFilterd = this.refreshComponentFacadeArray.filter(c => c.getComponent().Properties.id == componentId)[0];

        if (refreshComponentFacadeFilterd) {
            refreshComponentFacadeFilterd.setIsContinuous(isRefresh);
        }
    }

    setRefreshStatusByDashboardId(dashboardId: number, isRefresh: boolean) {
        this.dashboardComponentService.getDashboardSchemaById(dashboardId).subscribe(dashboard => {

            dashboard.layouts.forEach(layout => {
                layout.components.forEach(component => {
                    this.setRefreshStatusByComponentId(component.properties.id, isRefresh);
                });
            });
        });
    }

    setRefreshStatusAll(status: boolean) {
        this.refreshComponentFacadeArray.forEach(component => component.setIsContinuous(status));
    }

    getComponentDataHashCode(componentId: number) {
        let refreshComponentFacade = this.refreshComponentFacadeArray.filter(c => c.getComponent().Properties.id == componentId)[0];

        if (refreshComponentFacade) {
            return refreshComponentFacade.getComponentDataHashCode();
        }
    }
}
