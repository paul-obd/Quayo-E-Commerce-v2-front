import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Attribute } from '../../../shared/models/e-commerce/attribute.model';
import { QuayoExceptionResponse } from '../../../shared/models/quayoExceptionResponse';
import { SnackBarService } from '../../../shared/services/common/snackBarService';
import { AttributeValueService } from '../../../shared/services/e-commerce/attribute-value.service';
import { ItemsService } from '../../../shared/services/e-commerce/items.service';
import { LoadingService } from '../../../shared/services/e-commerce/loading.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  animations: [
    trigger('fade', [
      transition('* => void', [
        animate(100, style({
          opacity: 0,
          transform: 'translateX(-50%)',
        }))
      ]),
      transition('void=> *', [
        animate(100, style({
          opacity: 1,
          transform: 'translateX(5%)',
        }))
      ]),
    ])
  ]
})
export class FilterComponent implements OnInit {

  @ViewChild('search') searchBox: ElementRef;
  checked: boolean = false

  request: Subscription;

  constructor(public attributeValueService: AttributeValueService,
    public itemsService: ItemsService,
    private _snackBarService: SnackBarService,
    public loadingService: LoadingService) { }

  public async ngOnInit() {
   await this.getAttributes()
  }

  public async getAttributes() {
    this.request = this.attributeValueService.getAttributes()
    .subscribe(
      (attributesRes) => {
        console.log(attributesRes)
        attributesRes.response.forEach(attribute => {
          this.attributeValueService.getAttributeValues(attribute.attributeCode)
          .subscribe(
            (res)=>{
              let newAttribute = new Attribute();
              newAttribute.attributeCode = attribute.attributeCode,
              newAttribute.attributeValues = res.response
              newAttribute.description = attribute.description
              this.attributeValueService.attributes.push(newAttribute)
            }
          )
        
        });
        // this.attributeValueService.attributes = attributesRes.response 
      },
      (error) => {
        const quayoExceptionResponse = error.error as QuayoExceptionResponse;
        if (quayoExceptionResponse.ExceptionType) {
          if (quayoExceptionResponse.ExceptionType === "Buisness") {
            this._snackBarService.openSnackBar(
              quayoExceptionResponse.UserMessage,
              "custom_icon_business_exception"
            );
          }

          if (quayoExceptionResponse.ExceptionType === "Technical") {
            this._snackBarService.openSnackBar(
              quayoExceptionResponse.UserMessage,
              "custom_icon_technical_exception"
            );
          }
        } else {
          this._snackBarService.openSnackBar(
            "NO CONNECTION",
            "custom_icon_technical_exception",
            3,
            true
          );
        }
        
      }

    )
  }

  // public async getAttributeValues(attrCode){
  //   this.request = this.attributeValueService.getAttributeValues(attrCode)
  //      .subscribe(
  //       (res)=>{
  //         let attribute = new Attribute
  //         attribute.attributeCode = attrCode
  //         attribute.attributeValues = res.response
  //         attribute.description = 
  //       }
  //      )
  // }


}
