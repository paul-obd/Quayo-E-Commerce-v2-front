import {
  MessageType,
  SnackBarPosition,
} from "./../../constants/enums.constant";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackBarContanierComponent } from "../../components/snack-bar-contanier/snack-bar-contanier.component";
import { AppTranslateService } from "../app-translate.service";

@Injectable({ providedIn: "root" })
export class SnackBarService {
  constructor(
    private _snackBar: MatSnackBar,
    private _translateService: AppTranslateService
  ) {}

  snackBarDurationInSeconds = 4;

  public openSnackBar(
    message: string,
    iconSvgName: string,
    messageType: number = 4,
    autoTranslateMessage: boolean = false,
    position: number = SnackBarPosition.Center,
    duration: number = this.snackBarDurationInSeconds
  ) {
    const n = this._snackBar.openFromComponent(SnackBarContanierComponent, {
      duration: duration * 1000,
      horizontalPosition:
        position === 0 ? "left" : position === 1 ? "center" : "right",
      panelClass: ["custom-snackbar"],
    });
    let finalMessage;
    if (autoTranslateMessage) {
      finalMessage = this._translateService.getTranslation(message);
    } else {
      finalMessage = message;
    }

    n.instance.message = finalMessage;
    n.instance.iconSvgName = iconSvgName;
  }
}
