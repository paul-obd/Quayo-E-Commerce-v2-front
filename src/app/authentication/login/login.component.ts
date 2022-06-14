import { AppTranslateService } from "./../../shared/services/app-translate.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../shared/services/auth.service";
import { QuayoExceptionResponse } from "../../shared/models/quayoExceptionResponse";
import { SnackBarService } from "../../shared/services/common/snackBarService";
import { environment } from "../../../environments/environment";
import { TranslateService } from "@ngx-translate/core";
import { DialogService } from "../../shared/services/e-commerce/dialog.service";
import { LanguageService } from "../../shared/services/common/toolbar.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public isLoading = false;
  public error: string = null;
  public form: FormGroup;
  public err_msg: string;
  public buttonDisabled = false;
  public isBetaVersion = environment.isBetaVersion;
  deviceInfo = null;
  hide = true;
  dir =
    this.languageService.lang == "en"
      ? "ltr"
      : this.languageService.lang == "fr"
      ? "ltr"
      : "rtl";
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _translateService: AppTranslateService,
    private _mainTranslateService: TranslateService,
    private _dialogService: DialogService,
    private snackBarService: SnackBarService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      user_code: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
    });
  }

  onSubmit() {
    this.buttonDisabled = true;
    if (!this.form.valid) {
      this.buttonDisabled = false;
      return;
    }

    const authObs = this.authService.login(
      this.form.controls.user_code.value,
      this.form.controls.password.value,
      this.getBrowserName(),
      this.isMobile() == true ? 2 : 1,
      "E223005.1.0.0.1"
    );

    authObs.subscribe(
      async (loginResponse) => {
        localStorage.setItem("user_code", this.form.controls.user_code.value);
        this.form.reset();
        localStorage.setItem("lang", loginResponse.language);
        localStorage.setItem(
          "defaultDashboardId",
          loginResponse.defaultDashboardId.toString()
        );
        this._mainTranslateService.setDefaultLang(loginResponse.language);
        this._mainTranslateService.use(loginResponse.language);

        localStorage.setItem("isFirstTimeLogIn", "1");
        this.buttonDisabled = false;
        this.router.navigate(["/"]);
      },
      (errorMessage) => {
        this.buttonDisabled = false;
        if (errorMessage.error.ExceptionCode == "AUTH0008") {
          this._dialogService
            .openDialog("ALREADY LOGGED IN MSG", "CANCEL", "YES", "WARNING")
            .afterClosed()
            .subscribe((result) => {
              if (result == "true") {
                const forceLogoutObs = this.authService.forceLogout(
                  this.form.controls.user_code.value
                );

                forceLogoutObs.subscribe((res) => {
                  this.onSubmit();
                });
              }
            });
        } else if (errorMessage.status === 401) {
          this.snackBarService.openSnackBar(
            this._translateService.getTranslation(
              "USER OR PASSWORD IS NOT TRUE!!"
            ),
            "custom_icon_business_exception"
          );
        } else {
          const exception = errorMessage.error as QuayoExceptionResponse;

          let userMessage;
          if (exception.UserMessage) {
            userMessage = exception.UserMessage;
          } else {
            userMessage =
              this._translateService.getTranslation("NO CONNECTION");
          }

          this.snackBarService.openSnackBar(
            userMessage,
            "custom_icon_technical_exception",
            5
          );
        }
      }
    );
  }

  onForget() {
    if (
      this.form.controls.user_code.value === null ||
      this.form.controls.user_code.value === undefined ||
      this.form.controls.user_code.value === ""
    ) {
      this.snackBarService.openSnackBar(
        this._translateService.getTranslation("USER CODE IS EMPTY"),
        "custom_icon_business_exception"
      );

      return;
    }
    localStorage.setItem("user_code", this.form.controls.user_code.value);
    this.router.navigate(["/authentication/forgot"]);
  }

  private getBrowserName(): string {
    const agent = window.navigator.userAgent.toLowerCase();
    const browser =
      agent.indexOf("edge") > -1
        ? "Microsoft Edge"
        : agent.indexOf("edg") > -1
        ? "Chromium-based Edge"
        : agent.indexOf("opr") > -1
        ? "Opera"
        : agent.indexOf("chrome") > -1
        ? "Chrome"
        : agent.indexOf("trident") > -1
        ? "Internet Explorer"
        : agent.indexOf("firefox") > -1
        ? "Firefox"
        : agent.indexOf("safari") > -1
        ? "Safari"
        : "other";

    return browser;
  }
  private isMobile(): boolean {
    return window.navigator.maxTouchPoints > 0;
  }
}
