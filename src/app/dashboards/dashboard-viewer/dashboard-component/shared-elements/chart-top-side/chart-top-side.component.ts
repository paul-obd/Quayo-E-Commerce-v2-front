import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, NgModule, OnInit, Output } from '@angular/core';
import { DemoMaterialModule } from '../../../../../demo-material-module';

@Component({
  selector: 'app-chart-top-side',
  templateUrl: './chart-top-side.component.html',
  styleUrls: ['./chart-top-side.component.css']
})
export class ChartTopSideComponent {

  @Input() title: string;
  @Input() subTitle: string;

  @Output() Refresh: EventEmitter<any> = new EventEmitter();
  @Output() Export: EventEmitter<string> = new EventEmitter();

  constructor() { }

  refresh(){
      this.Refresh.emit();
  }

  export(type: string){
      this.Export.emit(type);
  }
}

@NgModule({
  declarations:[ChartTopSideComponent],
  imports: [CommonModule,DemoMaterialModule]
})
export class ChartTopSideComponentModule { }
