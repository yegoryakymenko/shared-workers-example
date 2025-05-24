import { ChangeDetectionStrategy, Component, inject, WritableSignal } from '@angular/core';
import { SharedWorkerService } from './services/shared-worker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  // @ts-ignore
  protected readonly count: WritableSignal<number> = signal(0);
  private readonly sharedWorker = inject(SharedWorkerService);

  constructor() {
    this.sharedWorker.port!.onmessage = (e) => {
      console.log('[Angular] Message from worker:', e.data);
      // You can act on this data
      this.count.set(e.data);
    };

    this.sharedWorker.sendMessage(this.count().toString());
  }

  send() {
    //@ts-ignore
    this.sharedWorker.sendMessage((0).toString());
  }
}
function signal(arg0: number) {
    throw new Error('Function not implemented.');
}

