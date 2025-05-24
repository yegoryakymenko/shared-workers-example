import { ChangeDetectionStrategy, signal, Component, inject, NgZone } from '@angular/core';
import { SharedWorkerService } from './services/shared-worker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  protected count = signal(0);
  private readonly sharedWorker = inject(SharedWorkerService);

  constructor() {
    this.sharedWorker.port!.onmessage = (e) => {
      console.log('[Angular] Message from worker:', e.data);
      // You can act on this data
      // this.ngZone.run(() => {
        this.count.set(e.data);
      // })
    };

    this.sharedWorker.sendMessage(this.count().toString());
  }

  send() {
    this.sharedWorker.sendMessage((++this.count).toString());
  }
}
function signal(arg0: number) {
    throw new Error('Function not implemented.');
}

