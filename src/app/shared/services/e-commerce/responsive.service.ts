import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  isMobile: boolean;
  grid: string = 'cards'

  constructor() { }
}
