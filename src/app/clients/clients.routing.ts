import { Routes } from "@angular/router";

import { ViewClientComponent } from "./view-client/view-client.component";
import { AddClientComponent } from "./add-client/add-client.component";
import { AuthGuardGuard } from "../shared/guards/auth-guard.guard";

export const TablesRoutes: Routes = [
  {
    path: "",
    canActivate: [AuthGuardGuard],
    children: [
      {
        path: "view-client",
        component: ViewClientComponent,
        data: {
          title: "VIEW CLIENT",
          urls: [
            { title: "Clients", url: "clients/" },
            { title: "VIEW CLIENT" },
          ],
        },
      },
      {
        path: "add-client",
        component: AddClientComponent,
        data: {
          title: "ADD CLIENT",
          urls: [
            { title: "Clients", url: "/clients" },
            { title: "ADD CLIENT" },
          ],
        },
      },
    ],
  },
];
