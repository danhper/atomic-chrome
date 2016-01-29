const WS_PORT = 64292;
const WS_URL = `ws://localhost:${WS_PORT}`;

class WSBridge {
  openConnection(port) {
    const queue = [];
    const ws = this.makeWS(port, queue);
    port.onMessage.addListener((msg) => this.sendMessage(ws, queue, msg));
    port.onDisconnect.addListener(() => ws.close());
  }

  makeWS(port, queue) {
    const ws = new WebSocket(WS_URL);
    ws.onopen = () => {
      while (queue.length > 0) {
        ws.send(queue.shift());
      }
    };
    ws.onmessage = (wsMsg) => {
      port.postMessage(JSON.parse(wsMsg.data));
    };
    ws.onclose = (evt) => {
      port.postMessage({type: 'closed', payload: {code: evt.code, reason: evt.reason}});
      port.disconnect();
    };
    return ws;
  }

  sendMessage(ws, queue, msg) {
    msg = JSON.stringify(msg);
    if (ws.readyState === ws.CONNECTING) {
      queue.push(msg);
    } else if (ws.readyState === ws.OPEN) {
      ws.send(msg);
    }
  }
}

export default new WSBridge();
