import "hammerjs";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  AccordionAnchorDirective,
  AccordionLinkDirective,
  AccordionDirective,
} from "./directives";
import { IconButtonComponent } from "./components/icon-button/icon-button.component";

import { MatIconModule } from "@angular/material/icon";
import { MatAnimatedIconComponent } from "./components/mat-animated-icon/mat-animated-icon.component";
import { MatDialogModule } from "@angular/material/dialog";
import { DialogComponent } from "./components/dialog/dialog.component";
import { DemoMaterialModule } from "../demo-material-module";
import { TranslateModule } from "@ngx-translate/core";
import { MatButtonModule } from "@angular/material/button";




@NgModule({
  imports: [
    CommonModule, 
    MatIconModule,
    MatDialogModule,
    TranslateModule,
    MatButtonModule
    ],
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    IconButtonComponent,
    MatAnimatedIconComponent,
    DialogComponent

  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    IconButtonComponent,
    MatAnimatedIconComponent,
    MatDialogModule,
    DialogComponent
  ]
})
export class SharedModule {}
