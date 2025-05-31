import { Component, inject, OnInit, signal } from '@angular/core';
import { Habito } from '../../models/habito.interface';
import { NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HabitoService } from '../../services/habito.service';

@Component({
  selector: 'app-home',
  imports: [NgClass, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {

  private habitoService = inject(HabitoService);

  ngOnInit(): void {
    this.habitoService.getAllHabitos().subscribe({
      next: ((habitos) => this.habitos.set(habitos)),
      error: ((err) => console.error(err))
    })
  }
  public habitos = signal<Habito[]>([]);
  public mostrarHabitoSignal = signal<boolean>(false);


  public mostrarHabito() {
    this.mostrarHabitoSignal.set(true);
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
