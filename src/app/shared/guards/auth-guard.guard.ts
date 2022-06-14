import { Injectable } from "@angular/core";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { Jobs } from "../constants/enums.constant";
import { AccessRightsService } from "../services/access-rights.service";
import { AuthService } from "../services/auth.service";

@Injectable({ providedIn: "root" })
export class AuthGuardGuard {
  constructor(
    private _authCookie: CookieService,
    private _router: Router,
    private _accessRightsService: AccessRightsService,
    private _authService: AuthService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const authResponse = this._authCookie.get("authResponseData");

    if (authResponse && authResponse !== "") {
      const token_str = JSON.parse(
        this._authCookie.get("authResponseData")
      ).token;

      if (token_str) {
        return this.checkUserAuthorization(next.routeConfig.path);
      } else {
        this._router.navigate(["/authentication/login"]);
        return false;
      }
    } else {
      this._router.navigate(["/authentication/login"]);
      return false;
    }
  }

  checkUserAuthorization(targetPath: string) {
    switch (targetPath) {
      case "view-user":
        return this._accessRightsService.checkAccessRight(Jobs.View_User);
      case "add-user":
        return this._accessRightsService.checkAccessRight(Jobs.Add_User);
      case "view-client":
        return this._accessRightsService.checkAccessRight(Jobs.View_Client);
      case "add-client":
        return this._accessRightsService.checkAccessRight(Jobs.Add_Client);
      case "access-rights":
        return this._accessRightsService.checkAccessRight(Jobs.Access_Rights);
      default:
        return true;
    }
  }
}
