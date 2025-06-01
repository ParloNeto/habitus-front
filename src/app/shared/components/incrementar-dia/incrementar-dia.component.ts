import {
  Component,
  computed,
  EventEmitter,
  inject,
  Input,
  input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { HabitoService } from '../../../services/habito.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-incrementar-dia',
  imports: [CommonModule],
  templateUrl: './incrementar-dia.component.html',
  styleUrl: './incrementar-dia.component.scss',
  standalone: true,
})
export class IncrementarDiaComponent implements OnInit {
  @Output()
  public historicoAtualizadoHoje: EventEmitter<boolean> =
    new EventEmitter<boolean>();


  public id = input<string>();

  @Input() set disponivelParaIncrementar(v: boolean) {
    this._disponivelParaIncrementar.set(v);
  }

  get disponivelParaIncrementar(): boolean {
    return this._disponivelParaIncrementar();
  }

  get foiIncrementadoHoje(): boolean {
    return this._foiIncrementadoHoje();
  }

  public _disponivelParaIncrementar = signal<boolean>(false);
  public historicoDiaAtual = signal<Date>(new Date());
  private _foiIncrementadoHoje = signal<boolean>(false);

  private habitoService = inject(HabitoService);

  ngOnInit(): void {
    const localDate = new Date();
    this.historicoDiaAtual.set(
      new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000)
    );
  }

  public btnClass = computed(() => {
  let baseClass = 'btn-incrementa';

  if (!this._disponivelParaIncrementar() || this._foiIncrementadoHoje()) {
    baseClass += '__error';
  }

  if (this._foiIncrementadoHoje()) {
    baseClass += ' btn-incrementa__success';
  }

  return baseClass;
});

  public incrementarDia() {
    if (this.id === null) return;
    this.habitoService
      .patchHistoricoByHabito(this.id()!, {
        data: this.historicoDiaAtual().toISOString(),
      })
      .subscribe({
        next: () => {
          this._foiIncrementadoHoje.set(true);
          this.historicoAtualizadoHoje.emit(true);
        },
      });
  }
}
