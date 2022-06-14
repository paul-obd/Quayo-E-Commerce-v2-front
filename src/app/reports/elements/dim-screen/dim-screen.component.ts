import { Component, ViewChild, ElementRef, Renderer2, Input, Directive } from '@angular/core';

@Component({
    selector: 'app-dim-screen',
    templateUrl: './dim-screen.component.html',
    styleUrls: ['./dim-screen.component.scss']
})
/** DimScreen component*/
export class DimScreenComponent {
    /** DimScreen ctor */
  @ViewChild('dimScreenElement') dimScreenDiv: ElementRef;

  constructor(private render: Renderer2) {

  }

  show() {
    this.render.removeClass(this.dimScreenDiv.nativeElement, 'hidden')
    this.render.removeClass(this.dimScreenDiv.nativeElement, 'dim-screen-hide')
    this.render.addClass(this.dimScreenDiv.nativeElement, 'dim-screen-show')
  }

  hide() {
    this.render.removeClass(this.dimScreenDiv.nativeElement, 'dim-screen-show')
    this.render.addClass(this.dimScreenDiv.nativeElement, 'dim-screen-hide')
  }

}
