import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomValidators } from "ngx-custom-validators";
import { environment } from "../../../environments/environment";
import { AppTranslateService } from "../../shared/services/app-translate.service";
import { AuthService } from "../../shared/services/auth.service";
import { SnackBarService } from "../../shared/services/common/snackBarService";
import { LanguageService } from "../../shared/services/common/toolbar.service";

@Component({
  selector: "app-forgot",
  templateUrl: "./forgot.component.html",
  styleUrls: ["./forgot.component.scss"],
})
export class ForgotComponent implements OnInit {
  public form: FormGroup;
  public isBetaVersion = environment.isBetaVersion;
  public isLoading = false;
  dir =  this.languageService.lang == 'en'? 'ltr': this.languageService.lang == 'fr'? 'ltr' : 'rtl'
  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private _translateService: AppTranslateService,
    private snackBarService: SnackBarService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: [
        null,
        Validators.compose([Validators.required, CustomValidators.email]),
      ],
    });
  }

  onSubmit() {
    this.isLoading = true;
    if (!this.form.valid) {
      this.isLoading = false;
      return;
    }
    const forgotObs = this._authService.forgotPassword(
      localStorage.getItem("user_code"),
      this.form.controls.email.value
    );

    forgotObs.subscribe(
      async (res) => {
        this.snackBarService.openSnackBar(res.message, "custom_icon_success");
        this.isLoading = false;
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
