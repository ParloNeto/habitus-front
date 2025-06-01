import { Component, inject, OnInit, signal } from '@angular/core';
import { Habito } from '../../models/habito.interface';
import { NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HabitoService } from '../../services/habito.service';
import { ModalService } from '../../services/modal.service';
import { SnackbarService } from '../../services/snackbar.service';
import { isSameDay, parseISO } from 'date-fns';

@Component({
  selector: 'app-home',
  imports: [NgClass, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private habitoService = inject(HabitoService);
  private modalService = inject(ModalService);
  private snackbar = inject(SnackbarService);

  ngOnInit(): void {
    this.habitoService.getAllHabitos().subscribe({
      next: (habitos) => {
        // this.modalService.showError('deu bom');
        this.habitos.set(habitos);
      },
      error: (err) => console.error(err),
    });

  }
  public habitos = signal<Habito[]>([]);
  public mostrarHabitoSignal = signal<boolean>(false);

  public mostrarHabito() {
    this.mostrarHabitoSignal.set(true);
  }

  public isHabitoAtivoHoje(habito: Habito): boolean {
  if (!habito.historico || habito.historico.length === 0) return false;

  const ultimoRegistro = habito.historico[habito.historico.length - 1];
  const hoje = new Date();
  const ultimaData = parseISO(ultimoRegistro.data.toString());

  return isSameDay(hoje, ultimaData);
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


