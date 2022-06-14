import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportsService } from '../../../../shared/services/reports/reports.service';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { AppSettings } from '../../../../app.settings';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent {

  dataSource: string[];
  slideshowDelay = 2000;

  constructor(public dialogRef: MatDialogRef<ImageGalleryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _reportService: ReportsService
  )
  {
    let dataSourceArray = Array<string>();

    this._reportService.getImageGalleryData(this.data.reportId, this.data.ownerCode)
      .subscribe(res => {
        for (let image of res) {
          let imageUrl = AppSettings.getApiUrl() + this._reportService.getReportApiUrl() + '/getimage?Id=' + image.reference_id
          dataSourceArray.push(imageUrl);
        }
      });

    this.dataSource = dataSourceArray;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  valueChanged(e) {
    this.slideshowDelay = e.value ? 2000 : 0;
  }

}
