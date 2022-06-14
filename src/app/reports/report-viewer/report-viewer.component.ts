import { Component, ViewChild, AfterViewInit, Input, EventEmitter, Output} from '@angular/core';
import { ReportDataComponent } from './report-data/report-data.component';
import { ReportBarComponent } from './report-bar/report-bar.component';
import { Filters } from '../../shared/models/reports/Filters';
import { FiltersResult } from '../../shared/models/reports/FiltersResult';
import { ReportSchema } from '../../shared/models/reports/ReportSchema';
import { ReportsService } from '../../shared/services/reports/reports.service';

@Component({
    selector: 'app-report-viewer',
    templateUrl: './report-viewer.component.html',
  styleUrls: ['./report-viewer.component.scss'],
})
/** ReportViewer component*/
export class ReportViewerComponent implements AfterViewInit {
/** ReportViewer ctor */

  @ViewChild('reportbarComponent') reportbarComponent: ReportBarComponent
  @ViewChild('reportdataComponent') reportdataComponent: ReportDataComponent

  @Input() FiltersData: Filters;
  @Input() reportSchema: ReportSchema;

  @Output() applyFilterAction = new EventEmitter<FiltersResult>()

  enableToCreate: boolean = true;

  constructor(private reportService: ReportsService) {
  }


  refreshComponent() {
    this.enableToCreate = false;

    setTimeout(() => {
      this.enableToCreate = true;
    }, 1);

    setTimeout(() => {
      this.reportbarComponent.showPanel();
    }, 2);
  }

  ngAfterViewInit(): void {
      setTimeout(() => {
        this.reportbarComponent.showPanel();
      }, 1);
  }

  // All Methods of Apply Filter Button are in FilterPanelDateActionButtonComponent
  applyFilter(filtersResult: FiltersResult) {
    return this.applyFilterAction.emit(filtersResult);
  }

  setDataSource(datasource: any) {
    this.reportdataComponent.setDataSource(datasource);

  }
}
