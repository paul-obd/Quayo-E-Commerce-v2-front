import {  Routes } from '@angular/router';
import { AuthGuardGuard } from '../shared/guards/auth-guard.guard';
import { BasketComponent } from './basket/basket.component';
import { ECommerceMainPageComponent } from './e-commerce-main-page/e-commerce-main-page.component';
import { HomeComponent } from './home/home.component';


export const ECommerceRoute: Routes = [
  {
  
    path: 'e-commerce-main-page', 
    component: ECommerceMainPageComponent,
    canActivate: [AuthGuardGuard],
    data: {
      title: "ECommerce",
      Breadcrumb: false,
      urls: [
        { title: "Ecommerce", url: "/e-commerce" },
        { title: "Ecommerce" },
      ],
    },
    children:[
      {path: 'home', component: HomeComponent, canActivate: [AuthGuardGuard]},
      {path: 'basket', component: BasketComponent, canActivate: [AuthGuardGuard],data: {
        title: "SHOPPING CARD",
        Breadcrumb: false,
        urls: [
          { title: "SHOPPING CARD", url: "/e-commerce" },
          { title: "SHOPPING CARD" },
        ],
      }},
    ]
  },
 
    ]
