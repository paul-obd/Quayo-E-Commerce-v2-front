import { Injectable, Injector } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Router } from "@angular/router";
import { catchError } from "rxjs/operators";
import { AuthService } from "../services/auth.service";
import { SnackbarService } from "../services/e-commerce/snackbar.service";

@Injectable()
export class IsLoggedInInterceptor implements HttpInterceptor {
  constructor(private route: Router, private injector: Injector) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const _authService = this.injector.get(AuthService);
    const _snackbar = this.injector.get(SnackbarService);
    let req = request.clone();

    return next.handle(req).pipe(
      catchError((err) => {
        if (err.status == 403) {
          _authService.clearTokenCookie();
          this.route.navigate(["/authentication/login"]);
          _snackbar.openErrSnackBar("You've Been Forced To Logout");
        }
        return throwError(err);
      })
    );
  }
}
