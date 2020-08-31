import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatProgressBarModule, MatSnackBar } from '@angular/material';
import { Reserva } from '../../reserva/reserva.component';
import { Cliente } from '../../cliente/cliente.component';
import { ClienteService } from '../../../services/cliente.service';
import { Apartamento } from '../../apartamento/apartamento.component';
import { ApartamentoService } from '../../../services/apartamento.service';

@Component({
  selector: 'app-reserva-dialog',
  templateUrl: './reserva-dialog.component.html',
  styleUrls: ['./reserva-dialog.component.css']
})
export class ReservaDialogComponent {
  public reserva: Reserva;
  public clientes: Array<Cliente> = [];
  public apartamentos: Array<Apartamento> = [];
  public inLoding: MatProgressBarModule;
  
  constructor(public dialogRef: MatDialogRef<ReservaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Reserva,
    private clienteService: ClienteService,
    private apartamentoService : ApartamentoService,
    private snackBar: MatSnackBar
    ) {
    this.reserva = Object.assign({}, data);
  }

  ngOnInit(){

    this.inLoding = true;

    this.clienteService.findAll().subscribe(result => {
      this.clientes = result;
      this.inLoding = false;
    }, error => {
      this.inLoding = false;
      let snackBarError = this.snackBar.open('Ocorreu ao carregar o registro!', 'Detalhes');
    });

    this.apartamentoService.findAll().subscribe(result => {
      this.apartamentos = result;
      this.inLoding = false;
    }, error => {
      this.inLoding = false;
      let snackBarError = this.snackBar.open('Ocorreu ao carregar o registro!', 'Detalhes');
    });
  } 

  cancelDialog() {
    this.dialogRef.close();
  }

  setHora(tipo: String, event){
    let date = new Date();
    let data = date.getDate().toLocaleString() + '/' + date.getMonth().toLocaleString() + '/' + date.getFullYear().toLocaleString();
    let horas = date.getHours().toLocaleString();
    let minutos = date.getMinutes().toLocaleString();
    
    if(horas.length < 2){
      horas = '0' + horas;
    }

    if(minutos.length < 2){
      minutos = '0'+ minutos;
    }

    if (tipo == 'checkin'){
      this.reserva.hora_checkin = horas + ':' + minutos;
    }else{
      this.reserva.hora_checkout = horas + ':' + minutos;  
    }
  }
}
