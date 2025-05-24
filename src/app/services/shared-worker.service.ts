import { Injectable } from '@angular/core';


@Injectable({providedIn: 'root'})
export class SharedWorkerService {
  private worker: SharedWorker | null = null;
  port: MessagePort | null = null;


  constructor() {
    if (typeof SharedWorker !== 'undefined') {
      this.worker = new SharedWorker('/assets/worker.js');
      this.port = this.worker.port;

      this.port.onmessage = (e) => {
        console.log(`[Angular] Message from worker: `, e.data);
      };

      this.port.start();
    } else {
      console.error('SharedWorker not supported in this environment.');
    }
  }

  sendMessage(msg: string) {
    console.log('message sended ', msg)
    this.port?.postMessage(msg);
  }
}
