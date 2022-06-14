import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CarouselImage } from '../../shared/models/e-commerce/carousel-image.model';
import { QuayoExceptionResponse } from '../../shared/models/quayoExceptionResponse';
import { SnackBarService } from '../../shared/services/common/snackBarService';
import { CarouselService } from '../../shared/services/e-commerce/carousel.service';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {


  request: Subscription;

  constructor(public carouselService: CarouselService, private _snackBarService: SnackBarService) { }

  public async ngOnInit() {
   await this.getAllCarouselImages()
  }

  public async getAllCarouselImages(){ 
    this.request = this.carouselService.getAllCarouselImages()
    .subscribe(
     (carouselRes)=>{
     
       this.carouselService.carouselImages = carouselRes
       carouselRes.response.forEach(carouselImg => {
        this.carouselService.carouselImagesFullPath.push(carouselImg.imagePath)
       });
       
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
