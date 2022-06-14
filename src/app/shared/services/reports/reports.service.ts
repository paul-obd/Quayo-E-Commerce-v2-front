import { Response } from "./../../models/response.model";
import { Injectable } from "@angular/core";
import { Observable, of, from } from "rxjs";
import { Filters, Filter } from "../../models/reports/Filters";
import {
  ReportSchema,
  Report_Filters,
} from "../../models/reports/ReportSchema";
import { FiltersResult } from "../../models/reports/FiltersResult";
import { ApiRequestService } from "../api-request.service";
import { HttpRequestType } from "../../constants/enums.constant";
import { openDB } from "idb";
import * as AspNetData from "devextreme-aspnet-data-nojquery";
import { HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { AppSettings } from "../../../app.settings";
import { CustomProcedureParameters } from "../../models/reports/CustomProcedureParameters";

const REPORT_CONTROLLER_NAME = "api/report";
let reportUniqueId = "";

@Injectable({
  providedIn: "root",
})
export class ReportsService {
  constructor(private _apiRequestService: ApiRequestService) {}

  public GetEnabledReports() {
    return this._apiRequestService
      .SendApiRequest(
        null,
        REPORT_CONTROLLER_NAME + "/GetEnabledReports",
        HttpRequestType.GET,
        null
      )
      .toPromise();
  }

  public getReportControllerUrl() {
    return REPORT_CONTROLLER_NAME;
  }

  public getReportSchemaById(reportId: string): Observable<ReportSchema> {
    return this._apiRequestService
      .SendApiRequest(
        null,
        REPORT_CONTROLLER_NAME + "/schema/" + reportId,
        HttpRequestType.GET,
        null
      )
      .pipe(
        map((data) => {
          let reportSchemaData = data as unknown as ReportSchema;
          return reportSchemaData;
        })
      );
  }

  public getFiltersData(
    report_Filter_Array: Array<Report_Filters>
  ): Observable<Filters> {
    const filters = new Filters();
    const filtersObservable = of(filters);

    return filtersObservable.pipe(
      map((filter) => {
        if (report_Filter_Array) {
          for (const report_Filter of report_Filter_Array) {
            this.getFilterItemData(report_Filter).subscribe((data) => {
              filter.filters.push(data);
            });
          }
        }
        return filter;
      })
    );
  }

  private getFilterItemData(
    report_Filters: Report_Filters
  ): Observable<Filter> {
    const filter: Filter = new Filter();
    const filterObservable = of(filter);

    return filterObservable.pipe(
      map((filterData) => {
        filterData.name = report_Filters.report_pre_filter_name;
        filterData.placeholder = report_Filters.description;

        filterData.filterType = report_Filters.pre_filter_type_description;
        // Filter icon added in app.component - svgAdded() - svg-mat-icon-data.ts
        filterData.icon = "custom_icon_filter_" + filterData.name.toLowerCase();

        filterData.filterColumns = [
          { name: "code", label: "Code" },
          { name: "description", label: "Description" },
        ];
        filterData.filterData = null;

        this.getFilterDataIndexedDB(report_Filters.data_source).then((data) => {
          filterData.filterData = data;
        });
        return filterData;
      })
    );
  }

  public async getFilterDataIndexedDB(filterDatasource: string): Promise<any> {
    if (filterDatasource) {
      const db = await openDB("filter_lists_db", 10, {
        upgrade(db) {
          db.createObjectStore(filterDatasource, { keyPath: "Id" });
        },
      });

      const result = await db.getAll(filterDatasource);

      return result;
    } else {
      return null;
    }
  }

  public getUserUniqueIdentifier(): string {
    let userIdentifier = localStorage.getItem("userIdentifier");
    if (userIdentifier == null) {
      userIdentifier =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      localStorage.setItem("userIdentifier", userIdentifier);
    }
    return userIdentifier;
  }

  public getReportData(filtersResult: FiltersResult): Observable<any> {
    const res = this._apiRequestService
      .SendApiRequest(
        filtersResult,
        REPORT_CONTROLLER_NAME + "/generatedata",
        HttpRequestType.POST,
        null
      )
      .toPromise()
      .then(async (resData) => {
        reportUniqueId = filtersResult.timeStamp;

        const dataSource = AspNetData.createStore({
          loadUrl:
            AppSettings.getApiUrl() + REPORT_CONTROLLER_NAME + "/getdata",
          onBeforeSend: function (method, ajaxOptions) {
            ajaxOptions.xhrFields = { withCredentials: true };
          },
          loadParams: { reportuniqueid: reportUniqueId },
        });

        return dataSource;
      });

    return from(res);
  }

  public getReportUniqueId(): string {
    return reportUniqueId === "" ? undefined : reportUniqueId;
  }

  public resetReportUniqueId(): void {
    reportUniqueId = "";
  }

  // tslint:disable-next-line: no-shadowed-variable
  public exportReport(
    reportId: string,
    reportUniqueId: string,
    reportName: string,
    exportFormat: string
  ): Observable<boolean> {
    if (reportUniqueId) {
      const language = localStorage.getItem("lang");
      const url =
        AppSettings.getApiUrl() +
        REPORT_CONTROLLER_NAME +
        "/exportdata?" +
        "reportId=" +
        reportId +
        "&reportUniqueId=" +
        reportUniqueId +
        "&exportFormat=" +
        exportFormat +
        "&language=" +
        language;

      window.open(url, "_self", null);
      return of(true);
    }
  }

  // tslint:disable-next-line: max-line-length no-shadowed-variable
  public exportSpecialReport(
    reportId: string,
    reportUniqueId: string,
    paramsIds: string
  ): Observable<any> {
    if (reportUniqueId) {
      const language = localStorage.getItem("lang");
      // tslint:disable-next-line: max-line-length
      const url =
        AppSettings.getApiUrl() +
        REPORT_CONTROLLER_NAME +
        "/specialexportdata?" +
        "reportId=" +
        reportId +
        "&reportUniqueId=" +
        reportUniqueId +
        "&paramsIds=" +
        paramsIds +
        "&language=" +
        language;
      window.open(url, "_self", null);
      return of(true);
    }
  }

  public moveDatagridBarToReportBar() {
    const datagridTopBar = document.getElementsByClassName(
      "dx-datagrid-header-panel"
    )[0];
    const r = document
      .getElementById("report-space-growth-span")
      .appendChild(datagridTopBar);
  }
  public updateReportFavorite(
    reportID: string,
    isFavorite: boolean
  ): Observable<any> {
    const httpParams = new HttpParams()
      .set("reportId", reportID)
      .set("isFavorite", isFavorite.toString());

    return this._apiRequestService.SendApiRequest(
      null,
      REPORT_CONTROLLER_NAME + "/updatereportfavorite",
      HttpRequestType.POST,
      httpParams
    );
  }
  public getMasterDetails(reportId: string, key: string): any {
    const result = {
      store: AspNetData.createStore({
        loadUrl:
          AppSettings.getApiUrl() +
          REPORT_CONTROLLER_NAME +
          "/getmasterdetails",
        loadParams: {
          reportId: reportId,
          key: key,
        },
        onBeforeSend: function (method, ajaxOptions) {
          ajaxOptions.xhrFields = { withCredentials: true };
        },
      }),
    };
    return result;
  }

  public getImageGalleryData(
    reportId: string,
    ownerCode: string
  ): Observable<any> {
    const httpParams = new HttpParams()
      .set("reportId", reportId)
      .set("ownerCode", ownerCode);

    return this._apiRequestService.SendApiRequest(
      null,
      REPORT_CONTROLLER_NAME + "/getimagegallery",
      HttpRequestType.GET,
      httpParams
    );
  }

  public getImage(imageId: string): Observable<any> {
    const httpParams = new HttpParams().set("Id", imageId);

    return this._apiRequestService.SendApiRequest(
      null,
      REPORT_CONTROLLER_NAME + "/getimage",
      HttpRequestType.GET,
      httpParams
    );
  }
  public executeCustomProcedure(
    customProcedureParameters: CustomProcedureParameters
  ): Observable<any> {
    const res = this._apiRequestService
      .SendApiRequest(
        customProcedureParameters,
        REPORT_CONTROLLER_NAME + "/executecustomprocedure",
        HttpRequestType.POST,
        null
      )
      .toPromise()
      .then(async (resData) => {
        return resData;
      });
    return from(res);
  }

  public async getFavoriteReports() {
    return this._apiRequestService
      .SendApiRequest(
        null,
        REPORT_CONTROLLER_NAME + "/getfavoritereports",
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

  public getReportApiUrl(): string {
    return REPORT_CONTROLLER_NAME;
  }
}
