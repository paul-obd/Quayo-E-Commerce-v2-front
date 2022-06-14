import { DemoMaterialModule } from './../demo-material-module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
    MatIconModule
} from '@angular/material/icon';
import {
    MatCardModule,
} from '@angular/material/card';
import {
    MatInputModule
} from '@angular/material/input';
import {
    MatCheckboxModule
} from '@angular/material/checkbox';
import {
    MatButtonModule
} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AuthenticationRoutes } from './authentication.routing';
import { ErrorComponent } from './error/error.component';
import { ForgotComponent } from './forgot/forgot.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TranslateModule } from '@ngx-translate/core';
import { DxLoadPanelModule } from 'devextreme-angular';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        RouterModule.forChild(AuthenticationRoutes),
        MatIconModule,
        MatCardModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        DxLoadPanelModule,
        DemoMaterialModule
    ],
    declarations: [
        ErrorComponent,
        ForgotComponent,
        LockscreenComponent,
        LoginComponent,
        RegisterComponent,
        ChangePasswordComponent,
        ResetPasswordComponent
    ]
})
export class AuthenticationModule { }
