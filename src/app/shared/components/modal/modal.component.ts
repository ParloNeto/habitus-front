import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { ModalState } from '../../../models/enums/modal-state';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgClass, NgIf],
  template: `
    <div class="modal" [ngClass]="{ show: isOpen }" (click)="onClose()">
      <div
        class="modal-content modal-content__{{ state() }}"
        (click)="$event.stopPropagation()"
      >
        <div class="modal-header">
          <span class="close" (click)="onClose()">&times;</span>
          <h2 class="modal-title modal-title__{{ state() }}">{{ title() }}</h2>
          <img src="../../../../assets/icons/{{ state() }}.png" alt="" />
        </div>
        <div class="modal-body">
          @if (message) {
          <p class="modal-body__message">{{ message }}</p>
          }
          <ng-content></ng-content>
        </div>

        <div class="modal-footer" *ngIf="isConfirmation">
          @if (isConfirmation) {
          <button class="btn-primary-red-modal" (click)="onConfirm()">
            {{ confirmButtonText }}
          </button>
          <button class="btn-primary-white-modal" (click)="onCancel()">
            {{ cancelButtonText }}
          </button>
          } @else {
          <button
            class="btn-modal-close btn-modal__{{ state() }}"
            (click)="onClose()"
          >
            Fechar
          </button>
          }
        </div>
      </div>
    </div>
  `,
})
export class ModalComponent implements OnInit, OnDestroy {
  public title = signal<string | null>(null);
  public state = signal<ModalState>(ModalState.Confirmation);

  message: string | null = null;
  isConfirmation: boolean = false;
  confirmButtonText: string = 'Prosseguir';
  cancelButtonText: string = 'Cancelar';
  isOpen = false;

  private subscription: Subscription = new Subscription();

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.subscription.add(
      this.modalService.modalState$.subscribe((state) => {
        this.state.set(state.type);
        this.handleModalState(state);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private handleModalState(state: any) {
    switch (state.type) {
      case 'success':
        this.title.set('Sucesso');
        this.message = state.message;
        this.isConfirmation = false;
        this.openModal();
        break;
      case 'error':
        this.title.set('Erro');
        this.message = state.message;
        this.isConfirmation = false;
        this.openModal();
        break;
      case 'confirmation':
        this.message = state.message;
        this.title.set(state.title);
        this.isConfirmation = true;
        this.confirmButtonText = state.confirmText || 'Prosseguir';
        this.cancelButtonText = state.cancelText || 'Cancelar';

        this.openModal();
        break;
      case 'close':
        this.closeModal();
        break;
    }
  }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
    this.message = null;
    this.title.set(null);
  }

  onConfirm() {
    this.modalService.confirmAction(true);
  }

  onCancel() {
    this.modalService.confirmAction(false);
  }

  onClose() {
    this.closeModal();
  }
}
