import { Apartamento } from './../../apartamento/apartamento.component';
import { Recebimento } from './../recebimento.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatProgressBarModule, MatSnackBar } from '@angular/material';
import { RecebimentoService } from 'src/app/services/recebimento.service';
import { ApartamentoService } from 'src/app/services/apartamento.service';
import { Reserva } from '../../reserva/reserva.component';

@Component({
  selector: 'app-recebimento-dialog',
  templateUrl: './recebimento-dialog.component.html',
  styleUrls: ['./recebimento-dialog.component.css']
})
export class RecebimentoDialogComponent {
  public recebimento: Array<Recebimento> = [];
  public reserva: Reserva;
  public apartamento: Array<Apartamento> = [];
  public parcelas: string[][];
  public inLoding: MatProgressBarModule;

  constructor(public dialogRef: MatDialogRef<RecebimentoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Reserva,
    private recebimentoService: RecebimentoService,
    private apartamentoService: ApartamentoService,
    private snackBar: MatSnackBar) {

    this.reserva = Object.assign({}, data);
    this.parcelas = [
      ['1','1x'],
      ['2','2x'],
      ['3','3x'],
      ['4','4x'],
      ['5','5x'],
      ['6','6x'],
      ['7','7x'],
      ['8','8x'],
      ['9','9x'],
      ['10','10x']
    ]
  }

  ngOnInit(){
    this.inLoding = true;
    this.apartamento["id"] = this.reserva['apartamento_id'];

    if (this.reserva['recebimento_id']){
      this.recebimento['id'] = this.reserva['recebimento_id'];
    }

    this.apartamentoService.findOne(this.apartamento).subscribe(result => {
      this.apartamento = result;
      this.inLoding = false;
    }, error => {
      this.inLoding = false;
      let snackBarError = this.snackBar.open('Ocorreu ao carregar o registro!', 'Detalhes');
    });

    this.recebimentoService.findOne(this.recebimento).subscribe(result => {
      this.recebimento = result;
    }, error => {
      this.inLoding = false;

      //Calculo de dias;
      let diaCheckin = this.reserva.checkin.substring(0,2);
      let diaCheckout = this.reserva.checkout.substring(0,2);
      let qtdDias =  parseInt(diaCheckout) - parseInt(diaCheckin);

      if (qtdDias == 0){
        qtdDias = 1;
      }
      
      this.recebimento["valor_total"] = qtdDias * this.apartamento["diaria"];
    });
  }



  cancelDialog() {
    this.dialogRef.close();
  }

}

