import { CommonModule } from '@angular/common';
import { Component, OnInit, Signal, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TipoObjetivoService } from '../../services/tipo-objetivo.service';
import { TipoObjetivo } from '../../models/tipo-objetivo.interface';

@Component({
  selector: 'app-cadastrar-habito',
  templateUrl: './cadastrar-habito.component.html',
  styleUrls: ['./cadastrar-habito.component.scss'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class CadastrarHabitoComponent implements OnInit {
  habitoForm!: FormGroup;

  tiposObjetivo = signal<Array<TipoObjetivo>>([]);
  subtipos = signal<Array<string>>([]);

  // subtiposDisponiveis: string[] = [];
  selectedTipo = '';

  private tipoObjetoService = inject(TipoObjetivoService);
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.habitoForm = this.fb.group({
      nome: [''],
      objetivo: this.fb.group({
        nome: [''],
        subtipo: [''],
        data: ['']
      })
    });

    this.tipoObjetoService.getAllTiposObjetivo().subscribe({
      next: (res: TipoObjetivo[]) => this.tiposObjetivo.set(res)
    })
  }

  onTipoChange(event: Event): void {
  const selectedValue = (event.target as HTMLSelectElement).value;
  const objetivoSelecionado = this.tiposObjetivo().find((tipoObjetivo) => tipoObjetivo.nome === selectedValue)

  if (objetivoSelecionado)
    this.subtipos.update(() => objetivoSelecionado.subtipos)

  this.selectedTipo = selectedValue;
}


  onSubmit(): void {
    console.log(this.habitoForm.value);
  }
}
