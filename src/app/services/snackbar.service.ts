// snackbar.service.ts
import {
  ApplicationRef,
  ComponentRef,
  EnvironmentInjector,
  Injectable,
  createComponent
} from '@angular/core';
import { Subject } from 'rxjs';
import { SnackbarComponent } from '../shared/components/snackbar/snackbar.component';
import { SnackbarState } from '../models/enums/snackbar-state';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private snackbarSubject = new Subject<{ message: string; type: SnackbarState; duration?: number }>();
  public snackbarState$ = this.snackbarSubject.asObservable();
  private snackbarRef: ComponentRef<SnackbarComponent> | null = null;

  constructor(private appRef: ApplicationRef, private environmentInjector: EnvironmentInjector) {}

  private createSnackbarComponent() {
    if (this.snackbarRef) return;

    const ref = createComponent(SnackbarComponent, {
      environmentInjector: this.environmentInjector
    });

    this.appRef.attachView(ref.hostView);
    const domElement = (ref.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElement);
    this.snackbarRef = ref;
  }

  private show(message: string, type: SnackbarState, duration: number = 3000) {
    this.createSnackbarComponent();
    setTimeout(() => {
      this.snackbarSubject.next({ message, type, duration });
    });
  }

  showSuccess(message: string, duration?: number) {
    this.show(message, SnackbarState.Success, duration);
  }

  showError(message: string, duration?: number) {
    this.show(message, SnackbarState.Error, duration);
  }

  showInfo(message: string, duration?: number) {
    this.show(message, SnackbarState.Info, duration);
  }

  showWarning(message: string, duration?: number) {
    this.show(message, SnackbarState.Warning, duration);
  }
}
