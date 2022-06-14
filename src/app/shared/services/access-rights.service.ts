import { Injectable } from "@angular/core";
import { AccessRights } from "../models/access-rights.model";
import { Response } from "../models/response.model";
import { ApiRequestService } from "./api-request.service";
import { HttpRequestType } from "../constants/enums.constant";

// general constants
const MENU_SIDE_BAR_CONTROLLER_NAME = "api/MainView/GetMenuSideBarItems";

@Injectable({ providedIn: "root" })
export class AccessRightsService {
  private _accessRightsArray: AccessRights[];
  constructor(private _apiRequestService: ApiRequestService) {
    this._accessRightsArray = JSON.parse(localStorage.getItem("AccessRights"));
  }

  public async GetMenuSideBarItems() {
    return this._apiRequestService
      .SendApiRequest(
        null,
        MENU_SIDE_BAR_CONTROLLER_NAME,
        HttpRequestType.GET,
        null
      )
      .toPromise()
      .catch((error) => {
        const res = new Response();
        res.code = error.error.code;
        res.message = error.error.message;
        res.response = error;
        return res;
      });
  }
  public checkAccessRight(jobID: number): boolean {
    // return true;
    const Job: AccessRights = this._accessRightsArray.filter(
      (x) => x.jobID === jobID
    )[0];
    if (Job == null || !Job.isEnabled) {
      return false;
    } else {
      return Job.isEnabled;
    }
  }
}
