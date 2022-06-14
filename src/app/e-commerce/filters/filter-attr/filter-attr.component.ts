import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {  fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AttributeValue } from '../../../shared/models/e-commerce/attribute-value.model';
import { Attribute } from '../../../shared/models/e-commerce/attribute.model';
import { AttributeValueService } from '../../../shared/services/e-commerce/attribute-value.service';
import { ItemsService } from '../../../shared/services/e-commerce/items.service';
import { LoadingService } from '../../../shared/services/e-commerce/loading.service';
// import { AttributeValue } from '../models/attribute-value.model';
// import { Attribute } from '../models/attribute.model';
// import { Item } from '../models/Item.model';
// import { AttributeValueService } from '../services/attribute-value.service';
// import { ItemsService } from '../services/items.service';
// import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-filter-attr',
  templateUrl: './filter-attr.component.html',
  styleUrls: ['./filter-attr.component.css']
})
export class FilterAttrComponent implements OnInit {

  @ViewChild('search') searchBox: ElementRef;

  @Input() attribute: Attribute
  @Input() attributeValues: AttributeValue[] = []

  searchValue: string;
  searchAttributeValuesResult: AttributeValue[] = []

  showShortDesciption: boolean= true

  request: Subscription;

  constructor(private itemsService: ItemsService, private attributeValueService: AttributeValueService, 
    public loadingService: LoadingService) { }

  ngOnInit(): void {
   
  }

   initSearchListener() {

    const keyups = fromEvent(this.searchBox.nativeElement, 'keyup');

    // wait 0.5s between keyups to emit current value
    keyups
      .pipe(

        debounceTime(500)
      )
      .subscribe(async () => {
      
        if (this.searchValue == '' || this.searchValue  == null) {
          this.getAttributes()
        }else{
          await this.searchAttributeValues()
        }
        
      });
  }


  public async searchAttributeValues(){
    this.request= this.attributeValueService.searchAttributeValue(
      this.attribute.attributeCode,
       this.searchValue
       )
       .subscribe(
      (res)=>{
        this.attributeValues = res.response
      }
    )
  }


  getAttributes() {
    this.attributeValues = this.attribute.attributeValues
  }

  emptyFilter(){
    this.itemsService.filterAttributeValuesCode = []
  }




}
