import { Component, ViewChild, ElementRef, Renderer2, Input } from '@angular/core';
import { FilterPanelItemsComponent } from './filter-panel-items/filter-panel-items.component';
import { Filters } from '../../../../shared/models/reports/Filters';
import { ReportBarComponent } from '../report-bar.component';
import { FilterPanelDateActionButtonComponent } from './filter-panel-date-action-button/filter-panel-date-action-button.component';

@Component({
    selector: 'app-filter-panel',
    templateUrl: './filter-panel.component.html',
    styleUrls: ['./filter-panel.component.scss']
})
/** FilterPanel component*/
export class FilterPanelComponent {
/** FilterPanel ctor */
  @Input() reportBarComonent: ReportBarComponent;

  @ViewChild('filterpanelDiv') filterpanelDiv: ElementRef;

  @ViewChild('filterPanelItemsCompnent') filterPanelItemsCompnent: FilterPanelItemsComponent
  @ViewChild('filterPanelDateActionButton') filterPanelDateActionButton: FilterPanelDateActionButtonComponent

  @Input() FiltersData: Filters;

  constructor(private render: Renderer2) {

  }

  show() {
    this.render.removeClass(this.filterpanelDiv.nativeElement, 'filter-panel-hide')
    this.render.addClass(this.filterpanelDiv.nativeElement, 'filter-panel-show')
  }

  hide() {
    this.render.removeClass(this.filterpanelDiv.nativeElement, 'filter-panel-show')
    this.render.addClass(this.filterpanelDiv.nativeElement, 'filter-panel-hide')
  }

}
