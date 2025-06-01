import {
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { Habito } from '../../models/habito.interface';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IncrementarDiaComponent } from '../../shared/components/incrementar-dia/incrementar-dia.component';
import { HabitoService } from '../../services/habito.service';
import { Historico } from '../../models/historico.interface';
import { ListaHistoricoComponent } from '../../shared/components/lista-historico/lista-historico.component';
import { MenuLateralHabitoComponent } from '../../shared/components/menu-lateral-habito/menu-lateral-habito.component';

@Component({
  selector: 'app-habito',
  imports: [
    RouterModule,
    CommonModule,
    IncrementarDiaComponent,
    ListaHistoricoComponent,
    MenuLateralHabitoComponent
  ],
  templateUrl: './habito.component.html',
  styleUrl: './habito.component.scss',
})
export class HabitoComponent implements OnInit, OnDestroy {

  public habito = signal<Habito | null>(null);
  public id = signal<string | undefined>(undefined);
  public mensagemMotivacao = signal<string>(
    'Parabéns! Você ainda é um fumante de merda!'
  );

  private intervalId: any;
  private _historicoAtualizadoHoje = signal<boolean>(false);
  private _diferencaHoras = signal<string>('00:00');
  private historicoMaisRecente = signal<Historico | null>(null);

  set historicoAtualizadoHoje(atualizou: boolean) {
    if (atualizou) {
      this._historicoAtualizadoHoje.set(atualizou);
      this.ngOnInit();
    } else {
      return;
    }
  }

  get historicoAtualizadoHoje(): boolean {
    return this._historicoAtualizadoHoje();
  }



  get diaHistoricoMaisRecente(): number | null {
    const historico = this.historicoMaisRecente();
    if (!historico || !historico.data) return null;
    const data =
      typeof historico.data === 'string'
        ? new Date(historico.data)
        : historico.data;
    return data.getDate();
  }

  get diferencaHoras(): string {
    return this._diferencaHoras();
  }

  private route = inject(ActivatedRoute);
  private habitoService = inject(HabitoService);

  ngOnInit(): void {
    this.route.params.subscribe((params) => this.id.set(params['id']));

    if (this.id()) {
      this.habitoService.getHabitoById(this.id()!).subscribe({
        next: (res: Habito) => {
          this.habito.set(res);

          const historicoRecente = res.historico[res.historico.length - 1];

          if (historicoRecente && typeof historicoRecente.data === 'string') {
            historicoRecente.data = new Date(historicoRecente.data);
          }

          this.historicoMaisRecente.set(historicoRecente);
          this.iniciarTemporizador();
        },
      });
    }
  }

  public diaAtualNaoExisteNoHistorico(): boolean {
    const historico = this.historicoMaisRecente();
    if (!historico || !historico.data) return true;

    const dataHistorico = new Date(historico.data);
    const dataAtual = new Date();
    return dataAtual.getDate() !== dataHistorico.getDate();
  }

  public calcularHorasRestantes(): void {
    const agora = new Date();
    const fimDoDia = new Date();
    fimDoDia.setHours(23, 59, 59, 999);

    const diffMs = fimDoDia.getTime() - agora.getTime();

    if (diffMs <= 0) {
      this._diferencaHoras.set('00:00:00');
      clearInterval(this.intervalId);
      return;
    }

    const totalSegundos = Math.floor(diffMs / 1000);
    const horas = Math.floor(totalSegundos / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);
    const segundos = totalSegundos % 60;

    const horasFormatadas = horas.toString().padStart(2, '0');
    const minutosFormatados = minutos.toString().padStart(2, '0');
    const segundosFormatados = segundos.toString().padStart(2, '0');

    const resultado = `${horasFormatadas}:${minutosFormatados}:${segundosFormatados}`;
    this._diferencaHoras.set(resultado);
  }

  public iniciarTemporizador() {
    this.calcularHorasRestantes();

    this.intervalId = setInterval(() => {
      this.calcularHorasRestantes();
    }, 1000);
  }

  public getDiasClass(habito: Habito): string {
    if (habito.dias < 14) {
      return 'dias-error';
    } else if (habito.dias < 45) {
      return 'dias-warning';
    } else {
      return 'dias-success';
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
