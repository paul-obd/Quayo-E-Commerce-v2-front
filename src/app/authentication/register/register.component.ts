import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { CustomValidators } from "ngx-custom-validators";
import { environment } from "../../../environments/environment";
import { AuthService } from "../../shared/services/auth.service";
import { AppTranslateService } from "../../shared/services/app-translate.service";
import { SnackBarService } from "../../shared/services/common/snackBarService";
import { LanguageService } from "../../shared/services/common/toolbar.service";

const password = new FormControl("", Validators.required);
const confirmPassword = new FormControl("", CustomValidators.equalTo(password));

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;
  public isBetaVersion = environment.isBetaVersion;
  public isLoading = false;
  dir =  this.languageService.lang == 'en'? 'ltr': this.languageService.lang == 'fr'? 'ltr' : 'rtl'
  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _authService: AuthService,
    private _translateService: AppTranslateService,
    private snackBarService: SnackBarService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      userCode: [null, Validators.compose([Validators.required])],
      userName: [],
      email: [
        null,
        Validators.compose([Validators.required, CustomValidators.email]),
      ],
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
    const regObs = this._authService.register(
      this.form.controls.userCode.value,
      this.form.controls.userName.value,
      this.form.controls.email.value,
      this.form.controls.password.value
    );

    regObs.subscribe(
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
