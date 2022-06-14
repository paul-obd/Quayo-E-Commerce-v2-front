import { Routes } from "@angular/router";
import { ChangePasswordComponent } from "./change-password/change-password.component";

import { ErrorComponent } from "./error/error.component";
import { ForgotComponent } from "./forgot/forgot.component";
import { LockscreenComponent } from "./lockscreen/lockscreen.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
export const AuthenticationRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "404",
        component: ErrorComponent,
      },
      {
        path: "forgot",
        component: ForgotComponent,
      },
      {
        path: "lockscreen",
        component: LockscreenComponent,
      },
      {
        path: "login",
        component: LoginComponent,
      },
      {
        path: "register",
        component: RegisterComponent,
      },
      {
        path: "change-password",
        component: ChangePasswordComponent,
      },
      {
        path: "reset-password/:token",
        component: ResetPasswordComponent,
      },
    ],
  },
];
