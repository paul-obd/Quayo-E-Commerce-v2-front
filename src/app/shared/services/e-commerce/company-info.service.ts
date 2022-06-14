import { Injectable } from "@angular/core";
import { from, Observable } from "rxjs";
import { HttpRequestType } from "../../constants/enums.constant";
import { CompanyInfo } from "../../models/e-commerce/company-info.model";
import { ApiRequestService } from "../api-request.service";

// general constants
const ECOMMERCE_CONTROLLER_NAME = "api/Ecommerce";

@Injectable({
  providedIn: "root",
})
export class CompanyInfoService {
  companyInfo: CompanyInfo;
  markers: any[] = [];

  constructor(private _apiRequestService: ApiRequestService) {}

  getCompanyInfo(): Observable<any> {
    const res = this._apiRequestService
      .SendApiRequest(
        null,
        ECOMMERCE_CONTROLLER_NAME + "/company-info",
        HttpRequestType.GET,
        null
      )
      .toPromise()
      .then(async (resData) => {
        return resData;
      });

    return from(res);
  }
}
