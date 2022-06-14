import { Routes } from "@angular/router";
import { AuthGuardGuard } from "../shared/guards/auth-guard.guard";

import { DashboardMainPageComponent } from "./dasboard-main-page/dashboard-main-page.component";

export const DashboardsRoutes: Routes = [
  {
    path: "",
    canActivate: [AuthGuardGuard],
    children: [
      {
        path: "dashboard/:id",
        canActivate: [AuthGuardGuard],
        component: DashboardMainPageComponent,
        data: {
          title: "Main Dashboard",
          Breadcrumb: false,
          urls: [
            { title: "Dashboard", url: "/dashboard" },
            { title: "Main Dashboard" },
          ],
        },
      },
    ],
  },
];
