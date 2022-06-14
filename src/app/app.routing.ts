import { IndexPathComponent } from "./home/full/index-path/index-path.component";
import { Routes } from "@angular/router";
import { FullComponent } from "./home/full/full.component";
import { AppBlankComponent } from "./home/blank/blank.component";
import { AuthGuardGuard } from "./shared/guards/auth-guard.guard";
import { LoginGuardGuard } from "./shared/guards/login-guard.guard";

export const AppRoutes: Routes = [
  {
    path: "",
    canActivate: [AuthGuardGuard],
    component: FullComponent,
    children: [
      {
        path: "",
        canActivate: [AuthGuardGuard],
        redirectTo: "index-path",
        pathMatch: "full",
      },
      {
        path: "index-path",
        canActivate: [AuthGuardGuard],
        component: IndexPathComponent,
      },

      {
        path: "dashboards",
        canActivate: [AuthGuardGuard],
        loadChildren: () =>
          import("./dashboards/dashboards.module").then(
            (m) => m.DashboardsModule
          ),
      },
      {
        path: "reports",
        canActivate: [AuthGuardGuard],
        loadChildren: () =>
          import("./reports/reports.module").then((m) => m.ReportsModule),
      },
      {
        path: "clients",
        canActivate: [AuthGuardGuard],
        loadChildren: () =>
          import("./clients/clients.module").then((m) => m.ClientsModule),
      },
      {
        path: "e-commerce",
        canActivate: [AuthGuardGuard],
        loadChildren: () =>
          import("./e-commerce/e-commerce.module").then((m) => m.ECommerceModule),
      },
    ],
  },
  {
    path: "authentication",
    // canActivate: [LoginGuardGuard],
    loadChildren: () =>
      import("./authentication/authentication.module").then(
        (m) => m.AuthenticationModule
      ),
  },
 
  {
    path: "",
    component: AppBlankComponent,
    children: [
      {
        path: "authentication",
        loadChildren: () =>
          import("./authentication/authentication.module").then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },
  {
    path: "**",
    redirectTo: "authentication/404",
  },
];
