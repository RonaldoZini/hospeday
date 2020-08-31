import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { MatDialog, MatSnackBar, MatProgressBarModule } from '@angular/material';
import { ClienteDialogComponent } from './cliente-dialog/cliente-dialog.component';
import { ErrorDetailComponent } from '../../app.component';



export interface Cliente {
  id: number;
  celular: string;
  cpf: string;
  rg: string;
  empresa : string;
  codigo: string;
  nome: string;
  email: string;
  endereco: string;
  cidade: string;
  uf: string;
}


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  public displayedColumns = ['nome', 'email', 'contato', 'cidade', 'options'];
  public dataSource: Array<Cliente> = [];

  public inLoding: MatProgressBarModule;
  constructor(private clienteService: ClienteService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.inLoding = true;

    this.clienteService.findAll().subscribe(result => {
      this.dataSource = result;
      this.inLoding = false;
    }, error => {
      this.inLoding = false;
      let snackBarError = this.snackBar.open('Ocorreu um erro ao salvar o registro!', 'Detalhes');
      snackBarError.onAction().subscribe(() => {
        //to-do: mostrar detalhes do erro.
        this.dialog.open(ErrorDetailComponent, {
          width: '450px',
          disableClose: true,
          data: error

        })

      })
    });
  }
  showDialog(cliente: Cliente) {
    let dialogRef = this.dialog.open(ClienteDialogComponent, {
      width: '450px',
      disableClose: true,
      data: cliente
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clienteService.save(result).subscribe(result => {
          this.snackBar.open('Registro salvo com sucesso!', 'Ok', {
            duration: 3000
          });
          this.ngOnInit();
        }, error => {
          let snackBarError = this.snackBar.open('Ocorreu um erro ao salvar o registro!', 'Detalhes');
          snackBarError.onAction().subscribe(() => {
            //to-do: mostrar detalhes do erro.
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
  remove(cliente) {
    this.clienteService.delete(cliente)
      .subscribe(result => {
        this.snackBar.open('Registro excluído com sucesso', 'Ok', {
          duration: 3000
        });
        this.ngOnInit();

      }, error => {
        console.log('Error', error);
      })
  }

}
