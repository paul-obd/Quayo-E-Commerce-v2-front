import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { CompanyInfo } from "../../shared/models/e-commerce/company-info.model";
import { QuayoExceptionResponse } from "../../shared/models/quayoExceptionResponse";
import { SnackBarService } from "../../shared/services/common/snackBarService";
import { LanguageService } from "../../shared/services/common/toolbar.service";
import { CompanyInfoService } from "../../shared/services/e-commerce/company-info.service";

@Component({
  selector: "app-company-info",
  templateUrl: "./company-info.component.html",
  styleUrls: ["./company-info.component.css"],
})
export class CompanyInfoComponent implements OnInit {
  companyInfo: CompanyInfo = new CompanyInfo();

  request: Subscription;

  constructor(
    public languageService: LanguageService,
    public companyInfoService: CompanyInfoService,
    private _snackBarService: SnackBarService
  ) {}

  public async ngOnInit() {
    await this.getCompanyInfo();
  }

  public async getCompanyInfo() {
    this.request = this.companyInfoService.getCompanyInfo().subscribe(
      (companyInfoRes) => {
        console.log(companyInfoRes);
        this.companyInfoService.companyInfo = companyInfoRes;
        companyInfoRes.response.forEach((attribute) => {
          switch (attribute.attributeCode) {
            case "Company Name":
              this.companyInfo.companyName = attribute.attributeValue;

            case "Phone 1":
              this.companyInfo.phone1 = attribute.attributeValue;

            case "Phone 2":
              this.companyInfo.phone2 = attribute.attributeValue;

            case "Email":
              this.companyInfo.email = attribute.attributeValue;

            case "Facebook Link":
              this.companyInfo.facebookLink = attribute.attributeValue;

            case "Linkedin Link":
              this.companyInfo.linkedinLink = attribute.attributeValue;

            case "Twitter Link":
              this.companyInfo.twitterLink = attribute.attributeValue;

            case "Address":
              this.companyInfo.address = attribute.attributeValue;

            case "Longitude":
              this.companyInfo.longitude = attribute.attributeValue;

            case "Latitude":
              this.companyInfo.latitude = attribute.attributeValue;
            case "Bio":
              this.companyInfo.bio = attribute.attributeValue;

            default:
              break;
          }
        });

        this.companyInfoService.markers = [
          {
            location: [
              parseFloat(this.companyInfo.latitude),
              parseFloat(this.companyInfo.longitude),
            ],
            tooltip: {
              isShown: false,
            },
          },
        ];
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
    );
  }
}
