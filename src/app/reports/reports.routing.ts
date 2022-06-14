import { Routes } from "@angular/router";

import { ReportMainPageComponent } from "./report-main-page/report-main-page.component";
import { ReportLauncherComponent } from "./report-viewer/report-launcher/report-launcher.component";

export const ReportsRoutes: Routes = [
  {
    path: "report/:id",
    component: ReportMainPageComponent,
    data: {
      title: "Reports",
      Breadcrumb: false,
      urls: [{ title: "Reports", url: "/reports" }, { title: "Reports" }],
    },
  },
  {
    path: "report-launcher",
    component: ReportLauncherComponent,
    data: {
      title: "REPORTS",
      urls: [{ title: "REPORTS", url: "/reports" }, { title: "REPORTS" }],
    },
  },
];
