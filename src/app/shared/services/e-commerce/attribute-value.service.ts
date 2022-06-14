import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { HttpRequestType } from '../../constants/enums.constant';
import { Attribute } from '../../models/e-commerce/attribute.model';
import { ApiRequestService } from '../api-request.service';
import { ItemsService } from './items.service';

// general constants
const ECOMMERCE_CONTROLLER_NAME = "api/Ecommerce";

@Injectable({
  providedIn: 'root'
})
export class AttributeValueService {

  attributeFilter: string;
  attributes: Attribute[] = [];

  constructor( private itemsService: ItemsService,
    private _apiRequestService: ApiRequestService ) {

  }

  public getAttributes(): Observable<any> {
    const res = this._apiRequestService.SendApiRequest(
      null,
      ECOMMERCE_CONTROLLER_NAME + '/get-attributes',
      HttpRequestType.GET,
      null
    )
    .toPromise()
    .then(async (resData)=>{
      return resData
    })

    return from(res);

  }


  getAttributeValues(attrCode): Observable<any> {
    const httpParams = new HttpParams()
    .set("attrCode", attrCode)
 
    const res = this._apiRequestService.SendApiRequest(
      null,
      ECOMMERCE_CONTROLLER_NAME + '/get-attribute-values',
      HttpRequestType.GET,
      httpParams
    )
    .toPromise()
    .then(async (resData)=>{
      return resData
    })

    return from(res);

  }


  searchAttributeValue(attrCode: string, searchExpr: string): Observable<any> {
    const httpParams = new HttpParams()
    .set("attrCode", attrCode)
    .set("searchExpr", searchExpr)

     const res = this._apiRequestService.SendApiRequest(
       null,
       ECOMMERCE_CONTROLLER_NAME+'/search-attribute-value',
       HttpRequestType.GET,
      httpParams
     )
     .toPromise()
     .then(async (resData)=>{
       return resData;

     })

     return from(res)
  }



}
