import { Component, OnInit } from '@angular/core';
import * as CanvasJS from 'node_modules/canvasjs-2.2/canvasjs.min';
import { RecebimentoService } from '../../services/recebimento.service';
import { MatSnackBar, MatProgressBarModule } from '@angular/material';

export interface Recebimento {
  id: number;
  parcela: number;
  valor_total: number;
  tipo_recebimento: string;
}

@Component({
  selector: 'app-recebimento',
  templateUrl: './recebimento.component.html',
  styleUrls: ['./recebimento.component.css']
})
export class RecebimentoComponent implements OnInit {

  public recebimento: Array<Recebimento> = [];

  constructor(
    private recebimentosService: RecebimentoService,
    private snackBar: MatSnackBar,
    public inLoding: MatProgressBarModule) { }

  ngOnInit() {
    this.inLoding = true;

    this.recebimentosService.findAll().subscribe(result =>{
      
      this.inLoding = false;

      let valorTotalDinheiro = 0;
      let valorTotalCartao = 0;
      this.recebimento = result;
      for (let i = 0; i < this.recebimento.length; i++) {
        let recebimento = this.recebimento[i];
        
        recebimento.valor_total
        
        if (recebimento.tipo_recebimento == "dinheiro"){
          valorTotalDinheiro += recebimento.valor_total;
        }else{
          valorTotalCartao += recebimento.valor_total;
        }
      }

      let chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "Receitas"
        },
        data: [{
          type: "column",
          dataPoints: [
            { y: valorTotalDinheiro, label: "Dinheiro" },
            { y: valorTotalCartao, label: "Cartão" }
          ]
        }]
      });
      chart.render();
    }, error =>{
      let snackBarError = this.snackBar.open('Ocorreu uma falha ao carregar!', 'Detalhes');
    })
  }

}
