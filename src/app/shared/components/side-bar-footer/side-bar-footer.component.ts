import { Component, ElementRef, Input, Renderer2, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-side-bar-footer',
  templateUrl: './side-bar-footer.component.html',
  styleUrls: ['./side-bar-footer.component.scss']
})
export class SideBarFooterComponent implements AfterViewInit  {
  @Input() version: string;


  @ViewChild('sideBarFooterContainer') sideBarFooterContainer: ElementRef;
  constructor(private render: Renderer2) {
  }
  ngAfterViewInit(): void {

  }
  goToFacebook() {
    window.open(
      'https://www.facebook.com/QUAYOMobility/', '_blank'  );
  }
  goToLinkedIn() {
    window.open(  'https://www.linkedin.com/company/quayo-mobility', '_blank' );
  }
  goToGoogleMap() {
    // tslint:disable-next-line: max-line-length
    window.open( 'https://www.google.com/maps/dir/?api=1&destination=33.8869%2C35.5131&fbclid=IwAR032NqFZCe_-EwILxUztpYC8dc2qrPwC8NXZN4qYP3Vnr_3fLBX4K7fTB4', '_blank'   );

  }
}
