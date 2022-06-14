import { SideBarAvatarComponent } from "./shared/components/side-bar-avatar/side-bar-avatar.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { AppRoutes } from "./app.routing";
import { AppComponent } from "./app.component";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DemoMaterialModule } from "./demo-material-module";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { MatIconModule } from "@angular/material/icon";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";

import { SharedModule } from "./shared/shared.module";
import { FullComponent } from "./home/full/full.component";
import { AppHeaderComponent } from "./home/full/header/header.component";
import { AppBlankComponent } from "./home/blank/blank.component";
import { AppSidebarComponent } from "./home/full/sidebar/sidebar.component";
import { AppBreadcrumbComponent } from "./home/full/breadcrumb/breadcrumb.component";
import { SpinnerComponent } from "./shared/components/spinner.component";
import {
  DxButtonModule,
  DxDateBoxModule,
  DxLoadPanelModule,
  DxPopupModule,
  DxProgressBarModule,
  DxScrollViewModule,
  DxTreeMapModule,
} from "devextreme-angular";
import { IsLoadingModule } from "@service-work/is-loading";

import { SnackBarService } from "./shared/services/common/snackBarService";
import { SideBarFooterComponent } from "./shared/components/side-bar-footer/side-bar-footer.component";
import { IndexPathComponent } from "./home/full/index-path/index-path.component";
import { ConfirmationDialogService } from "./shared/services/common/confirmation-dialog.service";

import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { IsLoggedInInterceptor } from "./shared/interceptors/is-logged-in.interceptor";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true,
};
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppBlankComponent,
    AppSidebarComponent,
    AppBreadcrumbComponent,
    SideBarAvatarComponent,
    SideBarFooterComponent,
    IndexPathComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: "en",
    }),
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    PerfectScrollbarModule,
    SharedModule,
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule.forRoot(AppRoutes),
    IsLoadingModule,
    DxLoadPanelModule,
    MatIconModule,
    DxTreeMapModule,
    DxPopupModule,
    DxScrollViewModule,
    DxDateBoxModule,
    DxButtonModule,
    DxProgressBarModule,
    InfiniteScrollModule,
   
  ],
  exports: [TranslateModule,
    InfiniteScrollModule
    ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: IsLoggedInInterceptor,
      multi: true
    },
    SnackBarService,
    ConfirmationDialogService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

// platformBrowserDynamic().bootstrapModule(AppModule);
