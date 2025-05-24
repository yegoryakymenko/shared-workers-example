let counter = 0;

const ports = [];


onconnect = function (e) {
  const port = e.ports[0]; // Use .ports[0], not .source
  ports.push(port);

  console.log('[SharedWorker] Connected');

  port.onmessage = function (event) {
    counter += parseInt(event.data, 10);


    ports.forEach(p => {
      p.postMessage(counter);
    });
  };

  port.start(); // Important
};

