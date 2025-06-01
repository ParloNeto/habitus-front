import { Component, inject, input, OnInit } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { HabitoService } from '../../../services/habito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-lateral-habito',
  imports: [],
  templateUrl: './menu-lateral-habito.component.html',
  styleUrl: './menu-lateral-habito.component.scss',
})
export class MenuLateralHabitoComponent implements OnInit {
  public id = input<string>();

  ngOnInit(): void {}

  private modal = inject(ModalService);
  private snackbar = inject(SnackbarService);
  private habitoService = inject(HabitoService);
  private route = inject(Router);

  public openDeleteHabito() {
    this.modal.showConfirmation(
      'Atenção!',
      'Você tem certeza que deseja deletar esse hábito?',
      'Sim',
      'Não'
    );
    this.modal.confirmState().subscribe((confirmed) => {
      if (confirmed) {
        this.confirmaDeleteHabito();
      } else {
        return;
      }
    });
  }
  private confirmaDeleteHabito() {
    this.habitoService.deleteHabito(this.id()!).subscribe({
      next: () => {
        this.route
          .navigateByUrl('/home')
          .then(() =>
            this.snackbar.showSuccess('Hábito deletado com sucesso!')
          );
      },
    });
  }

  public openEditHabito() {}

  public clickReturnHome(): void {
    this.route.navigateByUrl('/home');
  }
}
