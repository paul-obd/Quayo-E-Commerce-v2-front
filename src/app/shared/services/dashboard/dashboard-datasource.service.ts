import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiRequestService } from '../api-request.service';
import { HttpRequestType } from '../../constants/enums.constant';
import { map, mergeMap } from 'rxjs/operators';
import { DashboardRefreshService } from './dashboard-refresh.service';
import { DatasourceParameters, ParameterCodeValue } from '../../models/dashboard/DatasourceParameters';

@Injectable({
    providedIn: 'root'
})
export class DashboardDatasourceService {

    constructor(
        private _apiRequestService: ApiRequestService,
        private _dashboardRefreshService: DashboardRefreshService) {
        this.componentDatasourceParameterArray = [];
    }

    private componentDatasourceParameterArray: Array<DatasourceParameters>

    getComponentDatasourceById(componentId: number): Observable<any> {

        let existComponent = this.componentDatasourceParameterArray.filter(c => c.ComponentId == componentId)[0];
        if (!existComponent) {
            let datasourceParameters: DatasourceParameters = {
                'ComponentId': componentId,
                'DataHashCode': '',
                'ParametersCodeValue': []
            };
            this.componentDatasourceParameterArray.push(datasourceParameters);
        }

        let datasourceObservable = of(componentId).pipe(map(compId => {
            let datasourceParameters = this.componentDatasourceParameterArray.filter(c => c.ComponentId == compId)[0];
            return datasourceParameters;
        }))
            .pipe(mergeMap(data => {
                data.DataHashCode = this._dashboardRefreshService.getComponentDataHashCode(data.ComponentId);
                return this._apiRequestService.SendApiRequest(data, 'api/dashboard/getcomponentdatasource', HttpRequestType.POST, null)
            }));

        return datasourceObservable;
    }

    setParameterCodeValue(componentId: number, parameterCodeValue: ParameterCodeValue) {
        let existComponent = this.componentDatasourceParameterArray.filter(c => c.ComponentId == componentId)[0];

        if (existComponent) {
            let existParameterCodeValue = existComponent.ParametersCodeValue.filter(c => c.Code == parameterCodeValue.Code)[0];

            if (existParameterCodeValue) {
                let indexOfExistParameterCodeValue = existComponent.ParametersCodeValue.indexOf(existParameterCodeValue);
                existComponent.ParametersCodeValue.splice(indexOfExistParameterCodeValue, 1);
            }
            existComponent.ParametersCodeValue.push(parameterCodeValue);
        }
    }

    setParameterCodeValueDefault(componentId: number, parameterCode: string) {
        let existComponent = this.componentDatasourceParameterArray.filter(c => c.ComponentId == componentId)[0];

        if (existComponent) {
            let existParameterCodeValue = existComponent.ParametersCodeValue.filter(c => c.Code == parameterCode)[0];

            if (existParameterCodeValue) {
                let indexOfExistParameterCodeValue = existComponent.ParametersCodeValue.indexOf(existParameterCodeValue);
                existComponent.ParametersCodeValue.splice(indexOfExistParameterCodeValue, 1);
            }
        }
    }

    setParameterCodeValueDefaultAll(componentId: number) {
        let existComponent = this.componentDatasourceParameterArray.filter(c => c.ComponentId == componentId)[0];

        if (existComponent) {
            existComponent.ParametersCodeValue = [];
        }
    }

    removeParameterCodeValueAll() {
        this.componentDatasourceParameterArray = [];
    }
}
