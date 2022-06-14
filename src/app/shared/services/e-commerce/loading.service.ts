import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {


  loadBar: boolean =  false;
  loadSpinner: boolean = false;
  paginationLoad: boolean = false

  constructor() { }
}
