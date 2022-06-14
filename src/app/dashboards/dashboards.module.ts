import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardsRoutes } from './dashboards.routing';
import { TranslateModule } from '@ngx-translate/core';

import { DashboardMainPageComponent } from './dasboard-main-page/dashboard-main-page.component';
import { DashboardComponent } from './dashboard-viewer/dashboard-component/dashboard-component';
import { DashboardViewerComponent } from './dashboard-viewer/dashboard-viewer.component';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    TranslateModule,
    FlexLayoutModule,
    RouterModule.forChild(DashboardsRoutes)
  ],
  declarations: [
    DashboardMainPageComponent,
    DashboardComponent,
    DashboardViewerComponent
  ],
  exports:[CommonModule]
}
)
export class DashboardsModule {
  public testStr: string;
}
