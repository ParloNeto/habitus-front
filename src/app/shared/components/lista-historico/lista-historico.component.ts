import { Component, input, OnInit } from '@angular/core';
import { Historico } from '../../../models/historico.interface';
import { DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-lista-historico',
  imports: [DatePipe, TitleCasePipe],
  templateUrl: './lista-historico.component.html',
  styleUrl: './lista-historico.component.scss'
})
export class ListaHistoricoComponent implements OnInit {

  public listaHistorico = input<Historico[]>();

  ngOnInit(): void {
  }


}
