import { Component, Input, AfterViewInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-icon-button',
    templateUrl: './icon-button.component.html',
    styleUrls: ['./icon-button.component.scss']
})
/** IconButton component*/
export class IconButtonComponent implements AfterViewInit {
/** IconButton ctor */

  @Input() iconSvg: string;
  @Input() iconMat: string;
  @Input() text: string;
  @Input() arrow: string;
  @Input() cursor = 'default';

  @ViewChild('iconButtonContainer') iconButtonContainer: ElementRef;
  @ViewChild('iconDiv') iconElement: ElementRef;
  @ViewChild('arrowDiv') arrowElement: ElementRef;

  constructor(private render: Renderer2) {
  }

  ngAfterViewInit(): void {
    this.render.setStyle(this.iconButtonContainer.nativeElement, 'cursor', this.cursor);
  }

}
