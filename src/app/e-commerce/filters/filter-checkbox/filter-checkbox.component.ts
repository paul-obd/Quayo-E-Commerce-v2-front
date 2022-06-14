import { Component, Input, OnInit } from '@angular/core';
import { AttributeValue } from '../../../shared/models/e-commerce/attribute-value.model';
import { QuayoExceptionResponse } from '../../../shared/models/quayoExceptionResponse';
import { SnackBarService } from '../../../shared/services/common/snackBarService';
import { AttributeValueService } from '../../../shared/services/e-commerce/attribute-value.service';
import { ItemsService } from '../../../shared/services/e-commerce/items.service';
import { LoadingService } from '../../../shared/services/e-commerce/loading.service';


@Component({
  selector: 'app-filter-checkbox',
  templateUrl: './filter-checkbox.component.html',
  styleUrls: ['./filter-checkbox.component.css']
})
export class FilterCheckboxComponent implements OnInit {

  @Input() attrValue: AttributeValue

  checked: boolean = false

  constructor(private itemsService: ItemsService,
      public loadingService: LoadingService,  private _snackBarService: SnackBarService) { }

  ngOnInit(): void {
  }


  getOrRemoveItems(){
   
    if ( this.itemsService.searchMode == true) {
      this.itemsService.openSearch = false
      this.itemsService.searchMode = false
      this.itemsService.searchVar = '';
    }
    this.loadingService.loadSpinner = true
    if (this.checked ==  true ) {
     
        this.itemsService.filterAttributeValuesCode.push(this.attrValue.attributeValueCode)
        
        this.itemsService.items = []
        this.itemsService.scrolledTimes = 1
        this.itemsService.getItemsByAttributes()
        .subscribe(
          (res)=>{
            if(res.response.length < 12){
              this.itemsService.endItemsReached = true
            }
            this.itemsService.items = res.response 
            this.itemsService.scrolledTimes += 1
            this.loadingService.loadSpinner = false
          },
          (error) => {
            const quayoExceptionResponse = error.error as QuayoExceptionResponse;
            if (quayoExceptionResponse.ExceptionType) {
    
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
            
            this.loadingService.loadSpinner = false
          }
        );
        
    }
    else{
   
     var index = this.itemsService.filterAttributeValuesCode.indexOf(this.attrValue.attributeValueCode)
     this.itemsService.filterAttributeValuesCode.splice(index, 1)
     if (this.itemsService.filterAttributeValuesCode.length == 0) {
       this.itemsService.items = []
       this.itemsService.scrolledTimes = 1
       this.itemsService.getItems().subscribe(
         (res)=>{
          if(res.response.length < 12){
            this.itemsService.endItemsReached = true
          }
           this.itemsService.items = res.response 

           this.itemsService.scrolledTimes += 1
           this.loadingService.loadSpinner = false

         },
         (error) => {
          const quayoExceptionResponse = error.error as QuayoExceptionResponse;
          if (quayoExceptionResponse.ExceptionType) {
      
  
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
   
          this.loadingService.loadSpinner = false
        }
      );
       
     }
     else{
       this.itemsService.items = []
       this.itemsService.scrolledTimes = 1
       this.itemsService.getItemsByAttributes().subscribe(
        (res)=>{
          if(res.response.length < 12){
            this.itemsService.endItemsReached = true
          }
          this.itemsService.items = res.response 

          this.itemsService.scrolledTimes += 1
          this.loadingService.loadSpinner = false
        },
        (error) => {
          const quayoExceptionResponse = error.error as QuayoExceptionResponse;
          if (quayoExceptionResponse.ExceptionType) {
    
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
  
          this.loadingService.loadSpinner = false
        }
      );
      
     }
    }
  }
}
