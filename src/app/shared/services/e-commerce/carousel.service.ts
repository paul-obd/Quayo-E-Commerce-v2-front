import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { HttpRequestType } from '../../constants/enums.constant';
import { CarouselImage } from '../../models/e-commerce/carousel-image.model';
import { ApiRequestService } from '../api-request.service';


// general constants
const ECOMMERCE_CONTROLLER_NAME = "api/Ecommerce";

@Injectable({
  providedIn: 'root'
})
export class CarouselService {


  carouselImages: CarouselImage[] = []

  carouselImagesFullPath: string[] = []

  constructor( private _apiRequestService: ApiRequestService) { }

  // getAllCarouselImages(){
  //   return this.http.get<CarouselImage[]>(   'Carousel/carouesl-images'); 
  // }

  getAllCarouselImages(): Observable<any>{
    const res = this._apiRequestService.SendApiRequest(
      null,
      ECOMMERCE_CONTROLLER_NAME+ '/carouesl-images',
      HttpRequestType.GET,
      null
      )
      .toPromise()
      .then(async (resData)=>{
        return resData
      })
      return from(res);
  }

}
