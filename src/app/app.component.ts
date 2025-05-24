import { ChangeDetectionStrategy, Component, HostListener, inject, signal, WritableSignal } from '@angular/core';
import { SharedWorkerService } from './core/services/shared-worker.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class AppComponent {
  protected readonly count: WritableSignal<number> = signal(0);
  private readonly sharedWorker = inject(SharedWorkerService);

  constructor() {
    this.subscribeToWorker();
  }

  private subscribeToWorker(): void {
    this.sharedWorker.port!.onmessage = (e) => {
      console.log('[Angular] Message from worker:', e.data);
      this.count.set(e.data);
    };

    this.sharedWorker.sendMessage(this.stringifyRequest({ type: 'update', data: this.count()}));
  }

  @HostListener('window:beforeunload')
  @HostListener('window:pagehide')
  onPageUnload(): void {
    this.sharedWorker.sendMessage(this.stringifyRequest({ type: 'destroy' }))
  }

  send() {
    console.log('[Angular] data sent to worker', this.count() + 1);
    this.sharedWorker.sendMessage(this.stringifyRequest({ type: 'update', data: this.count() + 1}));
  }

  private stringifyRequest(data: any): string {
    return JSON.stringify(data);
  }
}
