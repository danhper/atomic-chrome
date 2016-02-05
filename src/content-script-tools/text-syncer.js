const NORMAL_CLOSE_CODE = 1000;

class TextSyncer {
  linkElem(title, handler) {
    const port = chrome.runtime.connect();
    this.register(port, title, handler);
    port.onMessage.addListener(this.makeMessageListener(handler));
    const textChangeListener = this.makeTextChangeListener(port, handler);
    handler.bindChange(textChangeListener, false);
    port.onDisconnect.addListener(() => {
      handler.unbindChange(textChangeListener, false);
    });
  }

  makeMessageListener(handler) {
    return (msg) => {
      if (this[msg.type]) {
        return this[msg.type](handler, msg.payload);
      }
      console.warn('Atomic Chrome received unknown message:', msg);
    };
  }

  updateText(handler, payload) {
    handler.setValue(payload.text);
  }

  closed(handler, payload) {
    const code = payload.code;
    if (code !== NORMAL_CLOSE_CODE) {
      console.warn(`Atomic Chrome connection was closed with code ${code}`);
    }
  }

  makeTextChangeListener(port, handler) {
    return () => {
      handler.getValue().then((text) => {
        this.post(port, 'updateText', {text: text});
      });
    };
  }

  register(port, title, handler) {
    handler.getValue().then((text) => {
      this.post(port, 'register', {title: title, text: text});
    });
  }

  post(port, type, payload) {
    port.postMessage({type: type, payload: payload});
  }
}

export default new TextSyncer();
