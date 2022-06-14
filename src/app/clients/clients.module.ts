import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TablesRoutes } from './clients.routing';

import { ViewClientComponent } from './view-client/view-client.component';
import { AddClientComponent } from './add-client/add-client.component';

@NgModule({
  declarations: [ViewClientComponent, AddClientComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(TablesRoutes),
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ]
  
})
export class ClientsModule {}
