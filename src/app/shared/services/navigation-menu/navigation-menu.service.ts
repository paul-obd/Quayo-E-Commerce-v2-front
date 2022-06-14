import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestType } from '../../constants/enums.constant';
import { ApiRequestService } from '../api-request.service';

const NAVIGATION_MENU_CONTROLLER_NAME = 'api/navigationmenu';

@Injectable({
  providedIn: 'root'
})
export class NavigationMenuService {

    constructor(private _apiRequestService: ApiRequestService) { }

    searchMenuItem(text: string): Observable<any> {
        return this._apiRequestService
            .SendApiRequest(null, NAVIGATION_MENU_CONTROLLER_NAME + '/search?searchText=' + text, HttpRequestType.GET, null)
    }
}
