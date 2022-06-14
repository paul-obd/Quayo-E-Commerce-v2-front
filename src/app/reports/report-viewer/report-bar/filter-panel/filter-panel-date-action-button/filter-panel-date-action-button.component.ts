import { Component, Input, AfterViewInit } from '@angular/core';
import { FilterPanelComponent } from '../filter-panel.component';
import {  startWith, tap } from 'rxjs/operators';
import { FilterData, FiltersResult } from '../../../../../shared/models/reports/FiltersResult';
import { ReportViewerHelper } from '../../../../elements/helper/ReportViewerHelper';
import { of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-filter-panel-date-action-button',
    templateUrl: './filter-panel-date-action-button.component.html',
    styleUrls: ['./filter-panel-date-action-button.component.scss']
})
/** FilterPanelDateActionButton component*/
export class FilterPanelDateActionButtonComponent implements AfterViewInit {
/** FilterPanelDateActionButton ctor */

  @Input() filterPanelComponent: FilterPanelComponent;

  hasStartDate: boolean = false;
  hasEndDate: boolean = false;

  dateFrom: FilterData;
  dateTo: FilterData;

  buttonDisabled: boolean = false;

  buttonText: string;

  constructor(private translate: TranslateService) {  }

  ngAfterViewInit(): void {
    let startDateFilterArray = this.filterPanelComponent.FiltersData.filters.filter(item => item.name == 'Start_Date');
    let endDateFilterArray = this.filterPanelComponent.FiltersData.filters.filter(item => item.name == 'End_Date');

    setTimeout(() => {
      of(null)
        .pipe(
          startWith(null),
          tap(() => {
            if (startDateFilterArray.length != 0) { this.hasStartDate = true; }
            if (endDateFilterArray.length != 0) { this.hasEndDate = true; }
          })
        ).subscribe();
    });

    // Apply get the data if there aren't filters
    let hasFilters = (this.filterPanelComponent.reportBarComonent.reportDataComponent._reportSchema.report_filters) ? true : false;
    setTimeout(() =>
    {
      if (!hasFilters) {
        this.translate.get('REFRESH').subscribe((res: string) => {
          this.buttonText = res;
        });
        this.applyFilterButton();
      }
      else {
        this.translate.get('APPLY FILTER').subscribe((res: string) => {
          this.buttonText = res;
        });
      }
    }, 1);

  }

  dateFromChanged(eventData: FilterData) {
    this.dateFrom = eventData;
  }

  dateToChanged(eventData: FilterData) {
    this.dateTo = eventData;
  }

  applyFilterButton() {
    let selectedData = this.filterPanelComponent.filterPanelItemsCompnent.selectedData;

    let filtersResult = new FiltersResult();

    if (this.dateFrom) {
      ReportViewerHelper.addOrUpdateSelectedData(selectedData, this.dateFrom);
    }
    if (this.dateTo) {
      ReportViewerHelper.addOrUpdateSelectedData(selectedData, this.dateTo);
    }

    filtersResult.resultFilterDataArray = selectedData;

    this.filterPanelComponent.reportBarComonent.reportViewerComponent.applyFilter(filtersResult);
  }
}
