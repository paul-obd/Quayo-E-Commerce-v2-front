import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { QuayoExceptionResponse } from '../../shared/models/quayoExceptionResponse';
import { SnackBarService } from '../../shared/services/common/snackBarService';
import { ItemsService } from '../../shared/services/e-commerce/items.service';
import { LoadingService } from '../../shared/services/e-commerce/loading.service';

@Component({
  selector: 'app-sort-by',
  templateUrl: './sort-by.component.html',
  styleUrls: ['./sort-by.component.css']
})
export class SortByComponent implements OnInit {


  request: Subscription

  constructor(public _itemsService: ItemsService, public _loadService: LoadingService,
    private _snackBarService: SnackBarService) { }

  ngOnInit(): void {
  }

  public async sortItems(){
    this._loadService.loadSpinner = true
    if (this._itemsService.searchVar != null && this._itemsService.searchMode == true) {
      this._itemsService.searchScrolledTimes = 1
      this._itemsService.items = []
      await this.sortSearchedItems()
    }
    else if (this._itemsService.filterAttributeValuesCode.length > 0) {
      this._itemsService.items = []
      this._itemsService.filterScrollerTimes = 1
     await   this.sortItemsByAttributes()

    }
    else {
     await  this.initItems()

    }
  }

  public async sortSearchedItems(){
    this._itemsService.searchScrolledTimes = 1
    this.request = this._itemsService.searchItems().subscribe(
      (res)=>{
        this._itemsService.items = []
        this._itemsService.items = res.response 
        this._itemsService.searchScrolledTimes = 2
        this._loadService.loadSpinner = false
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


  public async sortItemsByAttributes(){
    this._itemsService.filterScrollerTimes = 1
   this.request =  this._itemsService.getItemsByAttributes().subscribe(
      (res)=>{
        this._itemsService.items = []
        this._itemsService.items = res.response 
        this._itemsService.filterScrollerTimes = 2
        this._loadService.loadSpinner = false
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

  public async initItems(){
    this._itemsService.scrolledTimes = 1
    this.request = this._itemsService.getItems().subscribe(
      (res)=>{
        this._itemsService.items = []
        this._itemsService.items = res.response 
        this._itemsService.scrolledTimes = 2
        this._loadService.loadSpinner = false
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
}
