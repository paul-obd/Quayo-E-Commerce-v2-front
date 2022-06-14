import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-snack-bar-contanier',
  templateUrl: './snack-bar-contanier.component.html',
  styleUrls: ['./snack-bar-contanier.component.scss']
})
export class SnackBarContanierComponent implements OnInit {

  message = '';
  iconSvgName: string;

  constructor() { }

  ngOnInit(): void {
  }

}
