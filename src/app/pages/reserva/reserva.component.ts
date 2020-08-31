import { RecebimentoDialogComponent } from './../recebimento/recebimento-dialog/recebimento-dialog.component';
import { ReservaDialogComponent } from './reserva-dialog/reserva-dialog.component';
import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../services/reserva.service';
import { MatDialog, MatSnackBar, MatProgressBarModule } from '@angular/material';
import { ErrorDetailComponent } from '../../app.component';
import { ApartamentoService } from '../../services/apartamento.service';
import { Apartamento } from '../apartamento/apartamento.component';
import { Cliente } from '../cliente/cliente.component';
import { ClienteService } from '../../services/cliente.service';
import { RecebimentoService } from '../../services/recebimento.service';
import { Recebimento } from '../recebimento/recebimento.component';

export interface Reserva {
  id: number;
  checkin: string;
  checkout: string;
  hora_checkin: string;
  hora_checkout: string;
  apartamento_id: number;
  cliente_id: number;
  numero_apartamento: number;
  cliente: string;
  recebimento_id: number;
}

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  public displayedColumns = ['nome', 'apartamento', 'checkin', 'checkout', 'options'];
  public dataSource: Array<Reserva> = [];
  public apartamento: Array<Apartamento> = [];
  public cliente: Array<Cliente> = [];

  public inLoding: MatProgressBarModule;
  constructor(private reservaService: ReservaService, 
    private dialog: MatDialog, 
    private snackBar: MatSnackBar,
    private apartamentoService: ApartamentoService,
    private clienteService: ClienteService,
    public recebimentoService: RecebimentoService) { }

  ngOnInit() {
    this.inLoding = true;

    this.reservaService.findAll().subscribe(result => {
      this.dataSource = result;

      for (let i = 0; i < this.dataSource.length; i++) {
        this.apartamento['id'] = this.dataSource[i]['apartamento_id'];
        this.cliente['id'] = this.dataSource[i]['cliente_id'];
        
        this.apartamentoService.findOne(this.apartamento).subscribe(result =>{
          this.apartamento = result;
          this.dataSource[i]['numero_apartamento'] = this.apartamento['numero_apartamento'];
        }, error =>{
          let snackBarError = this.snackBar.open('Ocorreu uma falha ao carregar!', 'Detalhes');
        })

        this.clienteService.findOne(this.cliente).subscribe(result =>{
          this.cliente = result;
          this.dataSource[i]['cliente'] = this.cliente['nome'];
        }, error =>{
          let snackBarError = this.snackBar.open('Ocorreu uma falha ao carregar!', 'Detalhes');
        })
      }
      this.inLoding = false;
    }, error => {
      this.inLoding = false;
      let snackBarError = this.snackBar.open('Ocorreu uma falha ao carregar.', 'Detalhes');
      snackBarError.onAction().subscribe(() => {
        this.dialog.open(ErrorDetailComponent, {
          width: '450px',
          disableClose: true,
          data: error
        })
      })
    });
  }
  showDialog(reserva: Reserva) {
    let dialogRef = this.dialog.open(ReservaDialogComponent, {
      width: '450px',
      disableClose: true,
      data: reserva,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.reservaService.save(result).subscribe(result => {
          this.snackBar.open('Registro salvo com sucesso!', 'Ok', {
            duration: 3000
          });
          this.ngOnInit();
        }, error => {
          let snackBarError = this.snackBar.open('Ocorreu um erro ao salvar o registro!', 'Detalhes');
          snackBarError.onAction().subscribe(() => {
            this.dialog.open(ErrorDetailComponent, {
              width: '450px',
              disableClose: true,
              data: error
            })
          })
        });
      }
    });
  }
  remove(reserva) {
    this.reservaService.delete(reserva)
      .subscribe(result => {
        this.snackBar.open('Registro excluído com sucesso', 'Ok', {
          duration: 3000
        });
        this.ngOnInit();
      }, error => {
        console.log('', error);
      })
  }

  showDialogRecebimento(reserva: Reserva) {
    let dialogRef = this.dialog.open(RecebimentoDialogComponent, {
      width: '450px',
      disableClose: true,
      data: reserva
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let recebimento: Recebimento;
        recebimento = Object.assign({}, result);

        this.recebimentoService.save(recebimento).subscribe(result => {
          reserva.recebimento_id = result['id'];
          this.reservaService.save(reserva).subscribe(result => {
            this.snackBar.open('Registro salvo com sucesso!', 'Ok', {
              duration: 3000
            });
            this.ngOnInit();
          });
        }, error => {
          let snackBarError = this.snackBar.open('Ocorreu um erro ao salvar o registro!', 'Detalhes');
          snackBarError.onAction().subscribe(() => {
            this.dialog.open(ErrorDetailComponent, {
              width: '450px',
              disableClose: true,
              data: error
            })
          })
        });
      }
    });
  }

}
