import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Cliente } from '../cliente.component';

@Component({
  selector: 'app-cliente-dialog',
  templateUrl: './cliente-dialog.component.html',
  styleUrls: ['./cliente-dialog.component.css']
})
export class ClienteDialogComponent {
  public cliente: Cliente;

  constructor(public dialogRef: MatDialogRef<ClienteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Cliente) {

    this.cliente = Object.assign({}, data);
  }

  cancelDialog() {
    this.dialogRef.close();
  }

}
