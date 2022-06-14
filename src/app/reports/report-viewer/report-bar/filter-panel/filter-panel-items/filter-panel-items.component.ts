import { Component, AfterViewInit, Renderer2, Input, ViewChild } from '@angular/core';
import { FilterColumn, Filters, Filter } from '../../../../../shared/models/reports/Filters';
import { FilterData } from '../../../../../shared/models/reports/FiltersResult';
import { ReportViewerHelper } from '../../../../elements/helper/ReportViewerHelper';

@Component({
    selector: 'app-filter-panel-items',
    templateUrl: './filter-panel-items.component.html',
    styleUrls: ['./filter-panel-items.component.scss']
})
/** FilterPanelItems component*/
export class FilterPanelItemsComponent {
/** FilterPanelItems ctor */

  @Input()
  set filters(filters: Filters) {
    this.filtersPip(filters);
  }

  finalPanelFilter: Filters

  selectedData: Array<FilterData> = [];

  constructor() {

  }

  filtersPip(filters: Filters) {
    this.finalPanelFilter = new Filters();
    this.finalPanelFilter.filters = [...filters.filters]
      .filter(item => item.name != 'Start_Date' && item.name != 'End_Date');
  }

  selectedDataChanged(res: FilterData) {
    ReportViewerHelper.addOrUpdateSelectedData(this.selectedData, res);
  }

}
