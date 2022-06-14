import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { environment } from "./../../../environments/environment";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppTranslateService } from "../../shared/services/app-translate.service";
import { AuthService } from "../../shared/services/auth.service";
import { SnackBarService } from "../../shared/services/common/snackBarService";
import { CustomValidators } from "ngx-custom-validators";
import { LanguageService } from "../../shared/services/common/toolbar.service";

const password = new FormControl("", Validators.required);
const confirmPassword = new FormControl("", CustomValidators.equalTo(password));

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.css"],
})
export class ChangePasswordComponent implements OnInit {
  public isBetaVersion = environment.isBetaVersion;
  public form: FormGroup;
  public isLoading = false;
  dir =  this.languageService.lang == 'en'? 'ltr': this.languageService.lang == 'fr'? 'ltr' : 'rtl'
  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _authService: AuthService,
    private _translateService: AppTranslateService,
    private snackBarService: SnackBarService,
     private  languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      oldPassword: ["", Validators.compose([Validators.required])],
      password: password,
      confirmPassword: confirmPassword,
    });
  }

  onSubmit() {
    this.isLoading = true;
    if (!this.form.valid) {
      this.isLoading = false;
      return;
    }

    const Obs = this._authService.changePassword(
      localStorage.getItem("user_code"),
      this.form.controls.oldPassword.value,
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
