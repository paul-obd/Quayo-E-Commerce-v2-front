import { Injectable } from "@angular/core";
import { AppTranslateService } from "../app-translate.service";
import { custom } from "devextreme/ui/dialog";

@Injectable({ providedIn: "root" })
export class ConfirmationDialogService {
  public response: boolean = false;
  constructor(private _appTranslationService: AppTranslateService) {}

  public open(body: string) {
    let myDialog = custom({
      showTitle: false,
      dragEnabled: false,

      messageHtml:
        "<b>" + this._appTranslationService.getTranslation(body) + "</b>",
      buttons: [
        {
          text: this._appTranslationService.getTranslation("YES"),
          type: "success",
          onClick: (e) => {
            return "Yes";
          },
        },
        {
          text: this._appTranslationService.getTranslation("NO"),
          type: "danger",
          onClick: (e) => {
            return "No";
          },
        },
      ],
    });
    myDialog.show().then((dialogResult) => {
      if (dialogResult === "Yes") this.response = true;
      else this.response = false;
    });
  }
}
