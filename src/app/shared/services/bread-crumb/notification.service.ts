import { Injectable } from "@angular/core";
import { HttpRequestType } from "../../constants/enums.constant";
import { ApiRequestService } from "../api-request.service";
import { Response } from "./../../models/response.model";

const BREADCRUMB_CONTROLLER_NAME = "api/breadcrumb";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  constructor(private _apiRequestService: ApiRequestService) {}

  public async getNotifications() {
    return this._apiRequestService
      .SendApiRequest(
        null,
        BREADCRUMB_CONTROLLER_NAME + "/getnotifications",
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
}
