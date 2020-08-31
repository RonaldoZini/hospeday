import { Component, OnInit, Inject } from '@angular/core';
import { MatProgressBarModule, MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApartamentoService } from '../../services/apartamento.service';
import { ApartamentoDialogComponent } from './apartamento-dialog/apartamento-dialog.component';

export interface Apartamento {
  id: number;
  descricao: string;
  numero_apartamento: number;
  telefone: string;
  cama_solteiro: number;
  cama_casal: number;
  qtd_cama_solteiro: number;
  qtd_cama_casal: number;
  diaria: number;
}

@Component({
  selector: 'app-apartamento',
  templateUrl: './apartamento.component.html',
  styleUrls: ['./apartamento.component.css']
})
export class ApartamentoComponent implements OnInit {

  public displayedColumns = ['numero_apartamento', 'descricao', 'telefone','qtd_cama_casal','qtd_cama_solteiro','diaria', 'options'];
  public dataSource: Array<Apartamento> = [];

  public inLoding: MatProgressBarModule;
  constructor(private apartamentoService: ApartamentoService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.inLoding = true;

    this.apartamentoService.findAll().subscribe(result => {
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
  showDialog(apartamento: Apartamento) {
    let dialogRef = this.dialog.open(ApartamentoDialogComponent, {
      width: '450px',
      disableClose: true,
      data: apartamento
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result['cama_solteiro'])
        this.apartamentoService.save(result).subscribe(result => {
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
  remove(apartamento) {
    this.apartamentoService.delete(apartamento)
      .subscribe(result => {
        this.snackBar.open('Registro excluído com sucesso', 'Ok', {
          duration: 3000
        });
        this.ngOnInit();

      }, error => {
        console.log('Pau', error);
      })
  }

}

@Component({
  template: `
  <h1 mat-dialog-title color="warn"> Ocorreu um erro! </h1>
  <div mat-dialog-content>
    <p>{{ data }}</p>
  </div>
  <div mat-dialog-actions>
    <span class="span-spacer"></span>
    <button mat-button (click)="closeDialog()" color="warn">Fechar</button>
  </div>
  `
})

export class ErrorDetailComponent {
  constructor(public dialogRef: MatDialogRef<ErrorDetailComponent>,
    @Inject(MAT_DIALOG_DATA) private data) { }

  closeDialog() {
    this.dialogRef.close();
  }
}
