export function sharedWorkerFactory(): MessagePort | null {
  if (typeof SharedWorker === 'undefined') {
    console.warn('SharedWorker is not supported in this environment');
    return null;
  }

  try {
    const worker = new SharedWorker(new URL('../web-workers/ws-worker.js', import.meta.url));
    worker.port.start();
    return worker.port;
  } catch (error) {
    console.error('Failed to create SharedWorker:', error);
    return null;
  }
}
