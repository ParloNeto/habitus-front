// snackbar.component.ts
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { Subscription, timer } from 'rxjs';
import { SnackbarState } from '../../../models/enums/snackbar-state';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [NgClass, NgIf],
  template: `
    <div class="snackbar-container">
      @if (isVisible) {
      <div class="snackbar snackbar__{{ state() }}">
        <span class="snackbar__message">{{ message }}</span>
      </div>
      }
    </div>
  `,
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent implements OnInit, OnDestroy {
  public state = signal<SnackbarState>(SnackbarState.Info);
  public message: string = '';
  public isVisible = false;
  private subscription = new Subscription();

  constructor(private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.snackbarService.snackbarState$.subscribe(
        ({ message, type, duration }) => {
          this.message = message;
          this.state.set(type);
          this.isVisible = true;

          timer(duration ?? 3000).subscribe(() => (this.isVisible = false));
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
