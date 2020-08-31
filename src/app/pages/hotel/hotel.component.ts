import { ErrorDetailComponent } from './../../app.component';
import { HotelService } from './../../services/hotel.service';
import { Component, OnInit } from '@angular/core';
import { MatProgressBarModule, MatSnackBar, MatDialog } from '@angular/material';

export interface Hotel {
  id: number;
  razao_social: string;
  cnpj: string;
  endereco: string;
  numero_endereco: string;
  bairro: string;
  cidade: string;
  uf: string;
  telefone: string;
}

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {

  public hotel : Hotel;

  constructor(
    private hotelService: HotelService,
    private inLoding: MatProgressBarModule,
    private snackBar: MatSnackBar,
    private dialog: MatDialog){
   }

  ngOnInit() {
    
    this.inLoding = true;

    this.hotelService.findAll().subscribe(result => {

      for (let i = 0; i < result.length; i++) {
        const element = result[i];

        this.hotel = element;
      }
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

  save() {
    console.log(this.hotel);
      this.hotelService.save(this.hotel).subscribe(result => {
        this.snackBar.open('Dados salvo com sucesso!', 'Ok', {
          duration: 3000
        });
        this.ngOnInit();
      }, error => {
        let snackBarError = this.snackBar.open('Ocorreu um erro ao salvar!', 'Detalhes');
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
  }

