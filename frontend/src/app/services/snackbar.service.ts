import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackbar : MatSnackBar) { }
  openSnackBar(message:string,action:string)
  {
    if(action === 'error'){
      this.snackbar.open(message,'',{
        horizontalPosition:'center',
        verticalPosition:'top',
        duration:2000, // 2 secondes
        panelClass : ['black-snackbar']
      });
    }
    if(action === 'supp'){
      this.snackbar.open(message,'',{
        horizontalPosition:'center',
        verticalPosition:'top',
        duration:2000, // 2 secondes
        panelClass : ['red-snackbar']
      });
    }
    else
    {
      this.snackbar.open(message,'',{
        horizontalPosition:'center',
        verticalPosition:'top',
        duration:2000, // 2 secondes
        panelClass : ['green-snackbar']
      });
    }
  }
}
