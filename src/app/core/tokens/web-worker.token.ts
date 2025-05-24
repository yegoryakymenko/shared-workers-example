import { InjectionToken } from '@angular/core';

export const SHARED_WORKER_PORT : InjectionToken<MessagePort | null> = new InjectionToken('sharedWorkerToken');
