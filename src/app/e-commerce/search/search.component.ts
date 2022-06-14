import { animate, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { Item } from '../../shared/models/e-commerce/Item.model';
import { QuayoExceptionResponse } from '../../shared/models/quayoExceptionResponse';
import { SnackBarService } from '../../shared/services/common/snackBarService';
import { AttributeValueService } from '../../shared/services/e-commerce/attribute-value.service';
import { ItemsService } from '../../shared/services/e-commerce/items.service';
import { LoadingService } from '../../shared/services/e-commerce/loading.service';
// import { Item } from '../models/Item.model';
// import { AttributeValueService } from '../services/attribute-value.service';
// import { ItemsService } from '../services/items.service';
// import { LoadingService } from '../services/loading.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [

    trigger('search', [

      transition('* => void', [
        animate(100, style({
          opacity: 0,
          transform: 'translateX(50%)',
        }))
      ]),
      transition('void=> *', [
        animate(100, style({
          opacity: 1,
          transform: 'translateX(-5%)',
        }))
      ]),
    ]),

  ],

})
export class SearchComponent implements OnInit, AfterViewInit {

  @ViewChild('search') searchBox: ElementRef;

  request: Subscription;

  constructor(public itemsService: ItemsService, private loadingService: LoadingService,
    private attributeService: AttributeValueService, private _snackBarService: SnackBarService) { }

  ngAfterViewInit(): void {
    this.initSearchListener()
  }

  ngOnInit(): void {

  }

  async closeSearch(event: Event) {
    this.itemsService.openSearch = false
    this.itemsService.searchMode = false
    this.itemsService.searchVar = '';
    this.loadingService.loadSpinner = true

    await this.getItems()
    event.stopPropagation();
  }


  initSearchListener() {

    const keyups = fromEvent(this.searchBox.nativeElement, 'keyup');

    // wait 1s between keyups to emit current value
    keyups
      .pipe(

        debounceTime(1000)
      )
      .subscribe(async () => {
        this.loadingService.loadSpinner = true
        this.itemsService.items = []

        if (this.itemsService.searchVar == '') {

         await  this.getItems()
        } else {
           await this.searchItems()
        }
      });

  }


  public async searchItems() {
    this.loadingService.loadSpinner = true
    this.itemsService.searchScrolledTimes = 1
    this.request = this.itemsService.searchItems().subscribe(
      (res) => {
        if(res.response.length < 12){
          this.itemsService.endItemsReached = true
        }
        this.itemsService.searchMode = true
        this.itemsService.items = []
        this.itemsService.items = res.response 

        this.itemsService.searchScrolledTimes = 2

        this.loadingService.loadSpinner = false
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
        this.loadingService.loadSpinner = false
      }
    )


  }


  public async getItems() {
    if (this.itemsService.filterAttributeValuesCode.length > 0) {
     await this.getItemsByAttributes()
    } else {

      this.itemsService.scrolledTimes = 1
      this.request = this.itemsService.getItems().subscribe(
        (res) => {
         
          if(res.response.length < 12){
            this.itemsService.endItemsReached = true
          }
          this.itemsService.items = res.response 

          this.loadingService.loadSpinner = false
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
          this.loadingService.loadSpinner = false
        }
      )
    }

  }


  public async getItemsByAttributes() {
    this.itemsService.filterScrollerTimes = 1
    this.request =  this.itemsService.getItemsByAttributes().subscribe(
      (res) => {  
        if(res.response.length < 12){
          this.itemsService.endItemsReached = true
        }
        this.itemsService.items = res.response 
        this.itemsService.filterScrollerTimes = 2;
        this.loadingService.loadSpinner = false
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
        this.loadingService.loadSpinner = false
      }
      )
  }

}




