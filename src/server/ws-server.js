const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
let counter = 0;

wss.on('connection', (ws) => {
  console.log('[Server] Client connected');

  // Send current counter on connect with type: init

  ws.on('message', (message) => {
    const text = Buffer.isBuffer(message) ? message.toString('utf-8') : message;
    const value = parseInt(text, 10);

    if (!isNaN(value)) {
      counter += value;
      console.log('[Server] Counter updated to:', counter);

      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'update', value: counter }));
        }
      });
    } else {
      console.warn('[Server] Invalid input, not a number:', text);
    }
  });
});
