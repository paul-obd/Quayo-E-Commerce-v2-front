import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CustomValidators } from "ngx-custom-validators";
import { environment } from "../../../environments/environment";
import { AppTranslateService } from "../../shared/services/app-translate.service";
import { AuthService } from "../../shared/services/auth.service";
import { SnackBarService } from "../../shared/services/common/snackBarService";
import { LanguageService } from "../../shared/services/common/toolbar.service";

const password = new FormControl("", [Validators.required]);
const confirmPassword = new FormControl("", CustomValidators.equalTo(password));

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.css"],
})
export class ResetPasswordComponent implements OnInit {
  public form: FormGroup;
  public isBetaVersion = environment.isBetaVersion;
  public isLoading = false;
  public generatedToken = "";
  dir =  this.languageService.lang == 'en'? 'ltr': this.languageService.lang == 'fr'? 'ltr' : 'rtl'
  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _authService: AuthService,
    private _translateService: AppTranslateService,
    private snackBarService: SnackBarService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      password: password,
      confirmPassword: confirmPassword,
    });

    this._route.params.subscribe(
      (param) => {
        this.generatedToken = param["token"];
      },
      (errorMessage) => {
        console.log("Error: " + errorMessage);
      }
    );
  }

  onSubmit() {
    console.log(this.form);
    if (
      localStorage.getItem("user_code") === undefined ||
      localStorage.getItem("user_code") === null ||
      localStorage.getItem("user_code") === ""
    ) {
      this.snackBarService.openSnackBar(
        this._translateService.getTranslation("USER CODE IS EMPTY"),
        "custom_icon_business_exception"
      );

      return;
    }
    this.isLoading = true;
    if (!this.form.valid) {
      this.isLoading = false;
      return;
    }

    if (
      this.generatedToken === undefined ||
      this.generatedToken === "" ||
      this.generatedToken === null
    ) {
      this.isLoading = false;
      this.snackBarService.openSnackBar(
        this._translateService.getTranslation("INVALID TOKEN"),
        "custom_icon_business_exception"
      );
      return;
    }
    const Obs = this._authService.resetPassword(
      localStorage.getItem("user_code"),
      this.generatedToken,
      this.form.controls.password.value
    );

    Obs.subscribe(
      async (res) => {
        this.snackBarService.openSnackBar(res.message, "custom_icon_success");
        this.isLoading = false;
        this._router.navigate(["/authentication/login"]);
      },
      (errorMessage) => {
        this.isLoading = false;
        if (errorMessage.status === 0) {
          this.snackBarService.openSnackBar(
            this._translateService.getTranslation("NO CONNECTION"),
            "custom_icon_technical_exception"
          );
        } else {
          this.snackBarService.openSnackBar(
            errorMessage.error.UserMessage,
            "custom_icon_business_exception"
          );
        }
      }
    );
  }
}
