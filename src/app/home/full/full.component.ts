import { FavoriteReportPopupDS } from "./../../shared/models/reports/FavoriteReportPopupDS";
import { ReportsService } from "./../../shared/services/reports/reports.service";
import { AuthService } from "./../../shared/services/auth.service";
import { MediaMatcher } from "@angular/cdk/layout";
import { Router } from "@angular/router";
import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { IsLoadingService } from "@service-work/is-loading";
import { AppTranslateService } from "../../shared/services/app-translate.service";
import swale from "sweetalert2";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";

import { TranslateService } from "@ngx-translate/core";
import { IndexedDBService } from "../../shared/services/indexed-db.service";
import { AccessRightsService } from "../../shared/services/access-rights.service";
import { AppSidebarComponent } from "./sidebar/sidebar.component";
import { PersonalUserInfo } from "../../shared/models/menu-side-bar/personal-user-info.model";
import themes from "devextreme/ui/themes";
import { MatSidenav } from "@angular/material/sidenav";
import { SnackBarService } from "../../shared/services/common/snackBarService";
import { DOCUMENT } from "@angular/common";
import { NotificationModel } from "../../shared/models/common/notification.model";
import { NotificationService } from "../../shared/services/bread-crumb/notification.service";
import { CookieService } from "ngx-cookie-service";
import { LanguageService } from "../../shared/services/common/toolbar.service";

/** @title Responsive sidenav */
@Component({
  selector: "app-full-layout",
  templateUrl: "full.component.html",
  styleUrls: ["./full.component.scss"],
})
export class FullComponent implements OnDestroy, OnInit {
  [x: string]: any;
  elem: any;

  constructor(
    @Inject(DOCUMENT) private document: any,
    public router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authService: AuthService,
    private translate: TranslateService,
    private _snackBarService: SnackBarService,
    private isLoadingService: IsLoadingService,
    private appTranslation: AppTranslateService,
    private _indexedDBService: IndexedDBService,
    private _accessRightsService: AccessRightsService,
    private _reportService: ReportsService,
    private _authCookie: CookieService,
    private _notificationService: NotificationService,
    private _router: Router,
    private languageService: LanguageService
  ) {
    this.mobileQuery = media.matchMedia("(min-width: 2000px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.loginUserCode = localStorage.getItem("user_code");
  }
  @ViewChild(AppSidebarComponent) appSidebarComponent: AppSidebarComponent;
  mobileQuery: MediaQueryList;
  dir =this.languageService.lang == 'en'? 'ltr': this.languageService.lang == 'fr'? 'ltr' : 'rtl';
  green: boolean;
  blue: boolean;
  dark: boolean;
  minisidebar: boolean;
  boxed: boolean;
  danger: boolean;
  showHide: boolean;
  url: string;
  sidebarOpened;
  status = false;
  loadingVisible = false;
  isSideNav = false;
  myFavoriteReports: FavoriteReportPopupDS[];
  accountNotifications: NotificationModel[];
  primePopupVisible: boolean;
  textMessage: string = "Hello world";
  nowDate = Date.now();

  inProgress = false;
  seconds = 5;
  maxValue = 5;
  intervalId: number;

  public showSearch = false;
  public isSpinnerVisible = true;
  private login_success_msg: string;
  public config: PerfectScrollbarConfigInterface = {};
  private _mobileQueryListener: () => void;
  public isDataEntriesLoaded = false;
  public isReportsLoaded = false;

  public loginUserLevel: string;
  public loginUserCode: string;

  @ViewChild("snav") snavBar: MatSidenav;

  clickEvent() {
    this.status = !this.status;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  async ngOnInit() {
    this.elem = document.documentElement;

    //// to be replaced by prepare notifications
    await this.buildFavoriteReportDS();

    this.loadingVisible = true;

    // store all access rights for menu side-bar
    const menuSideBarDSData = localStorage.getItem("menuSideBarDS");
    const reloadIndexedDB =
      localStorage.getItem("isFirstTimeLogIn") === "1" ? true : false;

    if (menuSideBarDSData) {
      this.isDataEntriesLoaded = true;
      if (reloadIndexedDB) {
        this.getData();
      } else {
        this.loadingVisible = false;
      }
    } else {
      this._indexedDBService
        .StorePersonalUserInfo()
        .then((personalUserInfo) => {
          const pui = personalUserInfo.response as PersonalUserInfo;
          localStorage.setItem("userName", pui.userName);
          localStorage.setItem("userLevel", pui.level);
          this.loginUserLevel = pui.level;
          this._accessRightsService
            .GetMenuSideBarItems()
            .then((menuSideBarResult) => {
              localStorage.setItem(
                "menuSideBarDS",
                JSON.stringify(menuSideBarResult.response)
              );
              this.isDataEntriesLoaded = true;

              if (reloadIndexedDB) {
                this.getData();
              } else {
                this.loadingVisible = false;
              }
            });
        });
    }
    this.applyDarkThemeBasedOnLocalStorage();
  }
  // Dark Theme
  applyDarkThemeBasedOnLocalStorage() {
    const isDarkTheme = localStorage.getItem("isDarkTheme");
    if (isDarkTheme == null) {
      localStorage.setItem("isDarkTheme", "0");
      this.dark = false;
      this.changeDevextremeTheme(false);
    } else {
      const isDarkThemeBoolean = isDarkTheme === "1";
      this.dark = isDarkThemeBoolean;
      this.changeDevextremeTheme(isDarkThemeBoolean);
    }
  }

  changeDevextremeTheme(isDark: boolean) {
    if (isDark) {
      themes.current("material.blue.dark");
      localStorage.setItem("isDarkTheme", "1");
    } else {
      themes.current("material.blue.light");
      localStorage.setItem("isDarkTheme", "0");
    }
  }
  //////////////////////////////////////////////////

  onLogOut() {
    const logoutObs = this.authService.forceLogout(
      localStorage.getItem("user_code")
    );

    logoutObs.subscribe(
      async (res) => {
        localStorage.clear();
        await this._authCookie.delete("authResponseData", "/");
        await this._indexedDBService.ClearIndexedDB();
        await this._router.navigate(["/authentication/login"]);
      },
      (errorMessage) => {
        this.isLoading = false;
        if (errorMessage.status === 0) {
          this._snackBarService.openSnackBar(
            this._translateService.getTranslation("NO CONNECTION"),
            "custom_icon_technical_exception"
          );
        } else {
          this._snackBarService.openSnackBar(
            errorMessage.error.UserMessage,
            "custom_icon_business_exception"
          );
        }
      }
    );
  }
  onChangePasswordClick() {
    this._router.navigate(["/authentication/change-password"]);
  }
  async onRefresh() {
    window.location.reload();
  }

  async getData() {
    this.translate.get("LOGIN SUCCESS MSG").subscribe((res: string) => {
      this.login_success_msg = res;
    });

    const snackBarMessage =
      this.login_success_msg + localStorage.getItem("user_code");
    this._snackBarService.openSnackBar(snackBarMessage, "custom_icon_success");

    this._indexedDBService.version = 0;

    const BrowserValid: boolean = this.checkBrowser();
    if (BrowserValid) {
      this.isLoadingService.remove({ key: ["default", "single"] });

      localStorage.setItem("isFirstTimeLogIn", "0");

      this._snackBarService.openSnackBar(
        "INDEXED DB SUCCESSFULLY STORED",
        "custom_icon_success",
        3,
        true
      );
      localStorage.setItem("isFirstTimeLogIn", "true");

      this.loadingVisible = false;
    } else {
      swale.fire(
        this.appTranslation.getTranslation("WARNING"),
        this.appTranslation.getTranslation("BROWSER NOT SUPPORT INDEXED DB"),
        "warning"
      );
    }
  }
  private checkBrowser(): boolean {
    const agent = window.navigator.userAgent.toLowerCase();
    switch (true) {
      case agent.indexOf("edge") > -1:
        return true;
      case agent.indexOf("chrome") > -1 && !!(<any>window).chrome:
        return true;
      case agent.indexOf("firefox") > -1:
        return true;
      case agent.indexOf("safari") > -1:
        return true;
      default:
        return false;
    }
  }

  // prepare favorite report data source and open popup
  async buildFavoriteReportDS() {
    this.myFavoriteReports = [];
    await this._reportService
      .getFavoriteReports()
      .then((favoriteReportsResult) => {
        if (favoriteReportsResult.code === "0") {
          this.myFavoriteReports =
            favoriteReportsResult.response as FavoriteReportPopupDS[];
        } else {
        }
      });
  }

  // prepare notifications summary data source
  async buildNotificationsDS() {
    this.accountNotifications = [];
    await this._notificationService
      .getNotifications()
      .then((notificationsResult) => {
        if (notificationsResult.code === "0") {
          this.accountNotifications =
            notificationsResult.response as NotificationModel[];
        } else {
        }
      });
  }
  // on click go to the targeted report
  navigateToReport(id) {
    this._router.navigate(["/reports/report/" + id]);
  }

  fullScreenToggle() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }
}
