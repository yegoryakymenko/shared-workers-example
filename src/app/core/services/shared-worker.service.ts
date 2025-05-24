import { inject, Injectable } from '@angular/core';
import { SHARED_WORKER_PORT } from '../tokens/web-worker.token';


@Injectable({providedIn: 'root'})
export class SharedWorkerService {
  readonly port: MessagePort | null = inject(SHARED_WORKER_PORT);

  constructor() {
    this.initWorker();
  }

  sendMessage(msg: string) {
    this.port?.postMessage(msg);
  }

  private initWorker(): void {
    if (this.port !== null) {
      this.port.onmessage = (e) => {
        console.log(`[Angular] Message from worker: `, e.data);
      };

      this.port.start();
    } else {
      console.error('SharedWorker not supported in this environment.');
    }
  }
}
