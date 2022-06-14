import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { throwError, Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { tap } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { AppSettings } from "../../app.settings";
import { LoginResponse } from "../models/authentication/loginResponse";
import { ThrowStmt } from "@angular/compiler";

const LOGIN_CONTROLLER_NAME = "api/authenticate";
@Injectable({ providedIn: "root" })
export class AuthService {
  private _language: string;

  constructor(private _http: HttpClient, private _authCookie: CookieService) {
    this._language =
      localStorage.getItem("lang") == null
        ? environment.defaultLanguage
        : localStorage.getItem("lang");
  }

  public loggedIn() {
    const helper = new JwtHelperService();
    const token = JSON.parse(this._authCookie.get("authResponseData")).token;
    return helper.isTokenExpired(token!);
  }
  public login(
    LoginCode: string,
    Password: string,
    Browser: string,
    DeviceType: number,
    AppVersion: string
  ) {
    return this.authenticate(
      LoginCode,
      Password,
      Browser,
      DeviceType,
      AppVersion
    );
  }

  public logout(): Observable<any> {
    const token = JSON.parse(this._authCookie.get("authResponseData")).token;
    return this._http.post<any>(
      AppSettings.getApiUrl() + LOGIN_CONTROLLER_NAME + "/logout",
      token,
      {}
    );
  }

  public clearTokenCookie(){
    this._authCookie.delete("authResponseData")
  }

  public forceLogout(LoginCode: string): Observable<any> {
    const login = {
      clientcode: LoginCode,
      password: "",
    };
    return this._http.post<any>(
      AppSettings.getApiUrl() + LOGIN_CONTROLLER_NAME + "/force-logout",
      login,
      {}
    );
  }

  public autoLogout(expirationDuration: number) {}

  public authenticate(
    LoginCode: string,
    Password: string,
    Browser: string,
    DeviceType: number,
    AppVersion: string
  ): Observable<LoginResponse> {
    const login = {
      clientcode: LoginCode,
      password: Password,
      browser: Browser,
      devicetypeid: DeviceType,
      appversion: AppVersion,
    };
    return this._http
      .post<LoginResponse>(
        AppSettings.getApiUrl() + LOGIN_CONTROLLER_NAME + "/login",
        login,
        {}
      )
      .pipe(
        tap((resData) => {
          const authResponse = <LoginResponse>resData;
          this._authCookie.set(
            "authResponseData",
            JSON.stringify(authResponse.authResponse),
            undefined,
            "/"
          );
        })
      );
  }

  public register(
    LoginCode: string,
    UserName: string,
    Email: string,
    Password: string
  ): Observable<any> {
    const registerModel = {
      username: LoginCode,
      usercode: LoginCode,
      email: Email,
      password: Password,
      language: this._language,
      name: UserName,
      level: 9,
      defaultdashboardid: 1,
    };
    return this._http.post<any>(
      AppSettings.getApiUrl() + LOGIN_CONTROLLER_NAME + "/register",
      registerModel,
      {}
    );
  }

  public changePassword(
    LoginCode: string,
    OldPassword: string,
    NewPassword: string
  ): Observable<any> {
    const changePasswordModel = {
      clientcode: LoginCode,
      oldpassword: OldPassword,
      newpassword: NewPassword,
      language: this._language,
    };
    return this._http.post<any>(
      AppSettings.getApiUrl() + LOGIN_CONTROLLER_NAME + "/change-password",
      changePasswordModel,
      {}
    );
  }

  public forgotPassword(userCode: string, Email: string): Observable<any> {
    const forgotPasswordModel = {
      usercode: userCode,
      email: Email,
      language: this._language,
    };
    return this._http.post<any>(
      AppSettings.getApiUrl() + LOGIN_CONTROLLER_NAME + "/forgotpassword",
      forgotPasswordModel,
      {}
    );
  }

  public resetPassword(
    LoginCode: string,
    Token: string,
    NewPassword: string
  ): Observable<any> {
    const resetPasswordModel = {
      usercode: LoginCode,
      token: Token,
      newpassword: NewPassword,
      language: this._language,
    };
    return this._http.post<any>(
      AppSettings.getApiUrl() + LOGIN_CONTROLLER_NAME + "/resetpassword",
      resetPasswordModel,
      {}
    );
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "An unknown error occurred!";
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "This email exists already";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "This email does not exist.";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "This password is not correct.";
        break;
    }
    return throwError(errorMessage);
  }
}
