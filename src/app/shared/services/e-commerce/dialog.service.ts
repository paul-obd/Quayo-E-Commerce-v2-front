import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../../components/dialog/dialog.component";

@Injectable({
  providedIn: "root",
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openDialog(
    description: string,
    action_false: string,
    action_true: string,
    title: string = null,
    extra_text: string = null
  ) {
    return this.dialog.open(DialogComponent, {
      data: {
        description: description,
        action_false: action_false,
        action_true: action_true,
        title: title,
        extra_text: extra_text,
      },
    });
  }
}
