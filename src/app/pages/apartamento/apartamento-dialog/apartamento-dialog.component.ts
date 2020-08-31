import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Apartamento } from '../apartamento.component';

@Component({
  selector: 'app-apartamento-dialog',
  templateUrl: './apartamento-dialog.component.html',
  styleUrls: ['./apartamento-dialog.component.css']
})
export class ApartamentoDialogComponent {
  public apartamento: Apartamento;

  constructor(public dialogRef: MatDialogRef<ApartamentoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Apartamento) {

    this.apartamento = Object.assign({}, data);
  }

  cancelDialog() {
    this.dialogRef.close();
  }

}
