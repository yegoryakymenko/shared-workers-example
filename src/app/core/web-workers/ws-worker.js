let socket = null;
const ports = new Set();

console.log('[SharedWorker] WebSocket Worker Loaded');

onconnect = function (e) {
  const port = e.ports[0];
  ports.add(port);

  console.log('[SharedWorker] Connected');

  port.onmessage = function (event) {
    const { type, data } = JSON.parse(event.data);

    if (type === 'destroy' && ports.has(port)) {
      ports.delete(port);
      console.warn('[SharedWorker] WebSocket Redundant Port Deleted');
    }

    if (!socket) {
      socket = new WebSocket('ws://localhost:8080');

      socket.onopen = () => {
        console.log('[SharedWorker] WebSocket Opened');
      };

      socket.onerror = (err) => {
        console.error('[SharedWorker] WebSocket Error', err);
      };

      socket.onclose = () => {
        console.log('[SharedWorker] WebSocket Closed');
      };
    }
      socket.onopen = () => {
        console.log('[SharedWorker] WebSocket Opened');
      };

      socket.onmessage = ({ data }) => {

        try {
          const { value } = JSON.parse(data);

          for (const port of ports) {
            port.postMessage(value);
          }
        } catch (e) {
          console.warn('[SharedWorker] Invalid websocket message:', data);
        }
      };


    if (type === 'update' && socket?.readyState === WebSocket.OPEN) {
      console.log('[SharedWorker] Sent to socket', data)
      socket.send(data);
    }
  };

  port.start();
};
