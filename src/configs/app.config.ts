import { SHARED_WORKER_PORT } from '../app/core/tokens/web-worker.token';
import { ApplicationConfig } from '@angular/core';
import { sharedWorkerFactory } from '../app/core/factories/web-worker.factory';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: SHARED_WORKER_PORT,
      useFactory: sharedWorkerFactory
    }
  ]
}
