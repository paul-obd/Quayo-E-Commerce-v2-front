import { Component, ElementRef, Input, Renderer2, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-side-bar-avatar',
  templateUrl: './side-bar-avatar.component.html',
  styleUrls: ['./side-bar-avatar.component.scss']
})
export class SideBarAvatarComponent implements AfterViewInit  {
  @Input() imageUrl = 'assets/images/background/male.png';
  @Input() userName = 'Unknown User';
  @Input() level = 'System User';

  @ViewChild('sideBarAvatarContainer') sideBarAvatarContainer: ElementRef;
  constructor(private render: Renderer2) {
  }
  ngAfterViewInit(): void {

  }
}
