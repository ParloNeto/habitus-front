import { Component, inject, OnInit, signal } from '@angular/core';
import { Habito } from '../../../models/habito.interface';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IncrementarDiaComponent } from '../../../shared/components/incrementar-dia/incrementar-dia.component';
import { HabitoService } from '../../../services/habito.service';

@Component({
  selector: 'app-habito',
  imports: [RouterModule, CommonModule, IncrementarDiaComponent],
  templateUrl: './habito.component.html',
  styleUrl: './habito.component.scss',
})
export class HabitoComponent implements OnInit {
  public habito = signal<Habito | null>(null);
  public id = signal<string | null>(null);
  public mensagemMotivacao = signal<string>(
    'Parabéns! Você ainda é um fumante de merda!'
  );

  private route = inject(ActivatedRoute);
  private habitoService = inject(HabitoService);

  ngOnInit(): void {
    this.route.params.subscribe((params) => this.id.set(params['id']));

    if (this.id()) {
      this.habitoService.getHabitoById(this.id()!).subscribe({
        next: (res: Habito) => this.habito.set(res),
      });
    }
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
}
