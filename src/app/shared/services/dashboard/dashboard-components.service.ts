import { Injectable } from '@angular/core';
import { DashboardSchema } from '../../models/dashboard/DashboardSchema';
import { Observable, of } from 'rxjs';
import { DashboardComponent } from '../../../dashboards/dashboard-viewer/dashboard-component/dashboard-component';
import { ApiRequestService } from '../api-request.service';
import { HttpRequestType } from '../../constants/enums.constant';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardComponentsService {
  private components = new Array<DashboardComponent>();
    isLoading: boolean
    constructor(private _apiRequestService: ApiRequestService) {
        this.isLoading = true;
    }

  addComponentReference(component: DashboardComponent) {
    let componentsFilterd = this.components.filter(comp => comp.Properties.id == component.Properties.id)[0];

    if (componentsFilterd) {
      let indexOfComponent = this.components.indexOf(componentsFilterd, 0);
      this.components.splice(indexOfComponent, 1);
    }

    this.components.push(component);
  }

    getComponentReferenceById(Id: number): DashboardComponent {
        let componentsFilterd = this.components.filter(comp => comp.Properties.id == Id)[0];
        return componentsFilterd;
    }

    getDashboardSchemaById(id: number): Observable<DashboardSchema> {

        let result = this._apiRequestService.SendApiRequest(null, 'api/dashboard/' + id, HttpRequestType.GET,null)

        let finalResult = result.pipe(
            map(data => {
                let stringJson = JSON.stringify(data);
                return JSON.parse(stringJson);
            }
                ))
        return finalResult;
    }

}
