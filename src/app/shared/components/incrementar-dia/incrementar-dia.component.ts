import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { HabitoService } from '../../../services/habito.service';
import { ActivatedRoute } from '@angular/router';
import { Habito } from '../../../models/habito.interface';
import { CommonModule } from '@angular/common';
import { Historico } from '../../../models/historico.interface';

@Component({
  selector: 'app-incrementar-dia',
  imports: [CommonModule],
  templateUrl: './incrementar-dia.component.html',
  styleUrl: './incrementar-dia.component.scss',
})
export class IncrementarDiaComponent implements OnInit {
  @Input()
  public id!: string | null;
  public disponivelParaIncrementar = signal<boolean>(true);
  public historicoDiaAtual = signal<Date>(new Date());

  ngOnInit(): void {
   const localDate = new Date();
   this.historicoDiaAtual.set(new Date(localDate.getTime() - (localDate.getTimezoneOffset() * 60000)))
  }

  private habitoService = inject(HabitoService);

  public incrementarDia() {
    if (this.id === null) return;
    this.habitoService.patchHistoricoByHabito(
      this.id,
     {
      data:  this.historicoDiaAtual().toISOString()
     }
    ).subscribe();
  }
}
