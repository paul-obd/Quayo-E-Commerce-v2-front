import { Input, AfterViewInit, EventEmitter } from "@angular/core"
import { Subscription } from "rxjs";
import { DashboardComponentProperties } from "../../../../shared/models/dashboard/DashboardSchema";

export abstract class BaseComponentType implements AfterViewInit {
  @Input() properties: DashboardComponentProperties
  @Input() schema: any
    @Input() datasourceChange: EventEmitter<any> = new EventEmitter();

    datasource: any;

  abstract defaultHeight: string;
  get height(){
    return (this.properties.height == 'default') ? this.defaultHeight : this.properties.height;
  }

  ngAfterViewInit(): void {
      this.datasourceChange.subscribe(data => this.datasource = data);
  }
}
