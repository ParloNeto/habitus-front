import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HabitoService } from '../../services/habito.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-cadastrar-habito',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastrar-habito.component.html',
  styleUrl: './cadastrar-habito.component.scss'
})
export class CadastrarHabitoComponent implements OnInit {
  habitoForm!: FormGroup;

  private fb = inject(FormBuilder);
  private route = inject(Router);
  private habitoService = inject(HabitoService);
  private snackbar = inject(SnackbarService);
  private modalService = inject(ModalService);

  ngOnInit(): void {
    this.habitoForm = this.fb.group({
      nome: ['', Validators.required],
      objetivo: this.fb.group({
        nome: ['', Validators.required],
        data: [new Date(), Validators.required]
      })
    });
  }

  onSubmit(): void {
    if (this.habitoForm.valid) {
      this.habitoService.createHabito(this.habitoForm.value)
        .subscribe({
          next: () => {
            this.route.navigateByUrl("/home").then(() => {
            this.snackbar.showSuccess("Hábito cadastrado com sucesso!", 5000)
            });
          },
          error: error => this.modalService.showError(error)
        })
    } else {
      this.habitoForm.markAllAsTouched();
    }
  }
}
