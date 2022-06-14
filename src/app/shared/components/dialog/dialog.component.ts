import { Component, Inject, Input, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { LanguageService } from "../../services/common/toolbar.service";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.css"],
})
export class DialogComponent implements OnInit {
  @Input() description: string;
  @Input() action_false: string;
  @Input() action_true: string;
  @Input() title: string = null;
  @Input() extra_text: string = null;

  dir =
    this.languageService.lang == "en"
      ? "ltr"
      : this.languageService.lang == "fr"
      ? "ltr"
      : "rtl";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.assignValues();
  }

  assignValues() {
    this.description = this.data.description;
    this.action_false = this.data.action_false;
    this.action_true = this.data.action_true;
    this.title = this.data.title;
    this.extra_text = this.data.extra_text;
  }
}
