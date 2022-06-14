import { NgModule } from '@angular/core';


import { ECommerceRoute } from './e-commerce.routing';
import { ItemsComponent } from './items/items.component';
import { ItemComponent } from './item/item.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';

import { BasketComponent } from './basket/basket.component';
import { BasketItemComponent } from './basket-item/basket-item.component';
import { SortByComponent } from './sort-by/sort-by.component';

import { ItemsTableComponent } from './items-table/items-table.component';
import { TableItemComponent } from './table-item/table-item.component';

import { TranslateModule, TranslateLoader, TranslateService } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient } from "@angular/common/http";
import { DevExtremeModule, DxTemplateModule, DxDataGridModule, DxGalleryModule, DxButtonModule } from 'devextreme-angular';

import { CarouselComponent } from './carousel/carousel.component';
import { CompanyInfoComponent } from './company-info/company-info.component';

import { RouterModule } from '@angular/router';
import { ECommerceMainPageComponent } from './e-commerce-main-page/e-commerce-main-page.component';
import { DemoMaterialModule } from '../demo-material-module';
import { FilterComponent } from './filters/filter/filter.component';
import { FilterAttrComponent } from './filters/filter-attr/filter-attr.component';
import { FilterCheckboxComponent } from './filters/filter-checkbox/filter-checkbox.component';

import { DialogComponent } from '../shared/components/dialog/dialog.component';

import { CommonModule } from '@angular/common';
import { CompanyInfoService } from '../shared/services/e-commerce/company-info.service';
import { CarouselService } from '../shared/services/e-commerce/carousel.service';
import { OrderTotalService } from '../shared/services/e-commerce/order-total.service';
import { ItemsService } from '../shared/services/e-commerce/items.service';
import { LanguageService } from '../shared/services/common/toolbar.service';
import { LoadingService } from '../shared/services/e-commerce/loading.service';
import { AttributeValueService } from '../shared/services/e-commerce/attribute-value.service';
import { ResponsiveService } from '../shared/services/e-commerce/responsive.service';
import { SharedModule } from '../shared/shared.module';
import { HttpLoaderFactory } from '../app.module';




@NgModule({
  declarations: [
    ECommerceMainPageComponent,
    ItemsComponent,
    ItemComponent,
    FilterComponent,
    HomeComponent,
    SearchComponent,
    BasketComponent,
    BasketItemComponent,
    SortByComponent,
    ItemsTableComponent,
    TableItemComponent,
    FilterAttrComponent,
    FilterCheckboxComponent,
    CarouselComponent,
    CompanyInfoComponent
  ],
  imports: [

    CommonModule,
    RouterModule.forChild(ECommerceRoute),
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    DevExtremeModule,
    DxTemplateModule,
    DxDataGridModule,
    DxGalleryModule,
    DxButtonModule,
    TranslateModule,

     
  ],
  providers: [CompanyInfoService,CarouselService,OrderTotalService,
    ItemsService, LanguageService, LoadingService, AttributeValueService, ResponsiveService
  ]

})
export class ECommerceModule { }

