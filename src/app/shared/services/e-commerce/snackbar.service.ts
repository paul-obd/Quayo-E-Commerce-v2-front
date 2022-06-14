import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }


  openSnackbar(message: any){
    this.snackBar.open(message, 'Ok',{
      duration: 3000
    })
  }

  openErrSnackBar(message: any){
    this.snackBar.open(message, 'Ok', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'red',
      duration: 3000
    })
  }

  openSuccessSnackBar(message: any){
    this.snackBar.open(message, 'Ok', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'green',
      duration: 3000
    })
  }
}
