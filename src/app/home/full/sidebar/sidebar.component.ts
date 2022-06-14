import { SideBarAvatarComponent } from './../../../shared/components/side-bar-avatar/side-bar-avatar.component';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MediaMatcher } from '@angular/cdk/layout';
import { environment } from '../../../../environments/environment';
import { AppSettings } from '../../../app.settings';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { debounceTime, tap, switchMap, finalize, takeWhile } from 'rxjs/operators';
import { ApiRequestService } from '../../../shared/services/api-request.service';
import { HttpRequestType } from '../../../shared/constants/enums.constant';
import { ReportsService } from '../../../shared/services/reports/reports.service';
import { Router } from '@angular/router';
import { NavigationMenuService } from '../../../shared/services/navigation-menu/navigation-menu.service';
import { MatSidenav } from '@angular/material/sidenav';


export interface BadgeItem {
  type: string;
  value: string;
}
export interface Saperator {
  name: string;
  type?: string;
}
export interface SubChildren {
  state: string;
  name: string;
  type?: string;
}
export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
  child?: SubChildren[];
  visible: boolean;
  id?: number;
  parent?: string;
  isReport?: boolean;
  moduleID?: number;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  saperator?: Saperator[];
  children?: ChildrenItems[];
  visible: boolean;
  moduleID?: number;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class AppSidebarComponent implements OnDestroy, OnInit {
  public searchReportsCtrl = new FormControl();
  public filteredMeunItems: any;
  public isLoading = false;
  public errorMsg: string;

  public userName: string = localStorage.getItem('userName');
  public level: string = localStorage.getItem('userLevel');

  isLoaded = false;
  isBetaVersion = AppSettings.getIsBetaVersion();

   @Input() sideBar: MatSidenav

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private http: HttpClient,
    private _apiRequestService: ApiRequestService,
      private _reportService: ReportsService,
      private _navigationMenuService: NavigationMenuService,
    private _router: Router
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  public menuItems: Menu[];

  public config: PerfectScrollbarConfigInterface = {};
  mobileQuery: MediaQueryList;
  public versionString = ' | Version: ' + environment.version;
  private _mobileQueryListener: () => void;
  status = true;

  itemSelect: number[] = [];
  parentIndex: Number;
  childIndex: Number;

  setClickedRow(i, j) {
    this.parentIndex = i;
    this.childIndex = j;
  }
  subclickEvent() {
    this.status = true;
  }
  scrollToTop() {
    document.querySelector('.page-wrapper').scroll({
      top: 0,
      left: 0,
    });
  }

    ngOnInit() {
        this.getData();

        this.searchReportsCtrl.valueChanges
            .pipe(
                debounceTime(500),
                tap(() => {
                    this.errorMsg = "";
                    this.filteredMeunItems = [];
                    this.isLoading = true;
                }),
                switchMap(value =>
                    this._navigationMenuService.searchMenuItem(value)
                        .pipe(
                            finalize(() => {
                                this.isLoading = false
                            }),
                        )
                )
            )
            .subscribe(data => {
                if (data == undefined) {
                    this.errorMsg = data['Error'];
                    this.filteredMeunItems = [];
                } else {
                    this.errorMsg = "";
                    this.filteredMeunItems = data;
                }
            });
    }

    searchInputOptionSelected(val: any) {
    this._router.navigateByUrl(val)
    this.searchReportsCtrl.setValue('');
  }

  getData() {
    const menuSideBarDS: Menu[] = JSON.parse(
      localStorage.getItem('menuSideBarDS')
    );

    this.menuItems = menuSideBarDS;

    this.isLoaded = true;
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  onSubItemClick(parent: string, isReport: boolean = false) {
      const nodes = document.getElementsByTagName('mat-list-item');
      const selectedNode = <HTMLInputElement>document.getElementById(parent);
      setTimeout(function () {
        for (let i = 0; i < nodes.length; i++) {
          nodes[i].classList.remove('selected');
        }
        selectedNode.classList.add('selected');
      }, 1);
    }

    hideSideNav() {
        this.sideBar.close();
    }
}
