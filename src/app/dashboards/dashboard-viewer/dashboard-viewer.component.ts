import { Component, OnInit, Input } from '@angular/core';
import { DashboardLayout } from '../../shared/models/dashboard/DashboardSchema';

@Component({
  selector: 'app-dashboard-viewer',
  templateUrl: './dashboard-viewer.component.html',
  styleUrls: ['./dashboard-viewer.component.scss']
})
export class DashboardViewerComponent {

  @Input() layouts: Array<DashboardLayout>;

  constructor() { }
}
