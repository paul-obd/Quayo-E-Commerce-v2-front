import { Component, Input, ViewChild, ElementRef, Output, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { TextMenuTableComponent } from './text-menu-table/text-menu-table.component';
import { EventEmitter } from '@angular/core';
import { FilterColumn } from '../../../../../../shared/models/reports/Filters';
import { FilterData, ReportFilterResultData } from '../../../../../../shared/models/reports/FiltersResult';
import { MatMenuTrigger } from '@angular/material/menu';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
    selector: 'app-filter-item',
    templateUrl: './filter-item.component.html',
  styleUrls: ['./filter-item.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
/** FilterItem component*/
export class FilterItemComponent implements AfterViewInit {

  @ViewChild('inputElement') inputElement: ElementRef;
  @ViewChild('menuTable') textMenuTableComponent: TextMenuTableComponent;
  @ViewChild('matFormField') matFormField: MatMenuTrigger;

  @Input() name = 'defaultFilterName';
  @Input() placeholder: string;
  @Input() type: string;
  @Input() matIcon: string;
  @Input() filterData: any;
  @Input() filterDataColumns: Array<FilterColumn>;

  @Output() filterDataRecivedEvent = new EventEmitter<FilterData>();

  ngAfterViewInit(): void {
    this.setNowDateToStartEndDate();
  }

  focusOnFilterInput() {
    // Focus if there are data
    if (this.type === 'Data Grid' && this.filterData) {
      this.textMenuTableComponent.setFocusAtFilterInput();
    }
  }

  selectedDataChanged(data: Array<any>) {
    const selectedData = new FilterData();
    selectedData.dataType = 'Data Grid';
    selectedData.data = data.map(item => {
      const resultData = new ReportFilterResultData(item.code, item.description);
      return resultData;
    });
      selectedData.filterItemName = this.name;

    this.filterDataRecivedEvent.emit(selectedData);
    this.printCountOfSelectedData(selectedData);
  }

  textChange(eventData: any) {
    const textData = new FilterData();
    textData.dataType = 'Free Text';
    textData.data = [new ReportFilterResultData('0', eventData.target.value)];
    textData.filterItemName = this.name;

    this.filterDataRecivedEvent.emit(textData);
  }

  datePickerChange(eventDate: any) {

    if (eventDate) {
      const date = new FilterData();
      date.dataType = 'Date';
      date.data = [new ReportFilterResultData('0', eventDate.targetElement.value)];
      date.filterItemName = this.name;

      this.filterDataRecivedEvent.emit(date);
    }
  }

  printCountOfSelectedData(selectedData: FilterData) {

    const count: number = selectedData.data.length;
    let resultString: string;

    if (count === 0) {
      resultString = '';
    } else {
      resultString = `( ${count} ${this.placeholder} Selected )`;
    }

    this.inputElement.nativeElement.value = resultString;
  }

  setNowDateToStartEndDate() {
    const d = new Date();
    const DateNow = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);

    const eventData = {
      targetElement: { value: DateNow }};

    setTimeout(() => {
      document.getElementsByName('Start_Date').forEach(i => {
        const m = i as HTMLInputElement;
        m.value = DateNow;
        this.datePickerChange(eventData);
      });
    }, 1);

    setTimeout(() => {
      document.getElementsByName('End_Date').forEach(i => {
        const m = i as HTMLInputElement;
        m.value = DateNow;
        this.datePickerChange(eventData);
      });
    }, 1);
  }
}
