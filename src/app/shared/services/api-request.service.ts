import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { Response } from "../models/response.model";
import { environment } from "../../../environments/environment";
import { HttpRequestType } from "../constants/enums.constant";
import { AppSettings } from "../../app.settings";

@Injectable({ providedIn: "root" })
export class ApiRequestService {
  private _language: string;
  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _authCookie: CookieService
  ) {
    this._language =
      localStorage.getItem("lang") == null
        ? environment.defaultLanguage
        : localStorage.getItem("lang");
  }

  public SendApiRequest(
    body: any,
    methodName: string,
    requestType: number,
    httpParams: HttpParams
  ) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");
    // headers = headers.set("Access-Control-Allow-Methods", "*");
    // headers = headers.set("Access-Control-Allow-Origin", "*");
    headers = headers.append("loginType", "2");
    headers = headers.append("loginCode", localStorage.getItem("user_code"));
    headers = headers.append("language", this._language);

    // check if token exist
    const token_str = JSON.parse(
      this._authCookie.get("authResponseData")
    ).token;
    if (token_str != null && token_str !== "") {
      headers = headers.append("Authorization", "Bearer " + token_str);
    }

    switch (requestType) {
      case HttpRequestType.POST: {
        return this._http
          .post<any>(AppSettings.getApiUrl() + methodName, body, {
            headers: headers,
            params: httpParams,
          })
          .pipe(
            map((response: Response) => {
              return response;
            }),
            catchError((err, caught) => {
              if (err.status === 401) {
                this._authCookie.delete("authResponseData");
                this._router.navigate(["/auth"]);
                err.message = "Request failed.";
              }

              return throwError(err);
            })
          );
        break;
      }
      case HttpRequestType.GET: {
        return this._http
          .get<any>(AppSettings.getApiUrl() + methodName, {
            headers: headers,
            params: httpParams,
          })
          .pipe(
            map((response: Response) => {
              return response;
            }),
            catchError((error, caught) => {
              if (error.status === 401) {
                this._authCookie.delete("authResponseData");
                this._router.navigate(["/auth"]);
                error.message = "Request failed.";
              }
              return throwError(error);
            })
          );
        break;
      }
      case HttpRequestType.PUT: {
        // statements;
        break;
      }
      case HttpRequestType.DELETE: {
        // statements;
        break;
      }
      default: {
        // statements;
        break;
      }
    }
  }
}
