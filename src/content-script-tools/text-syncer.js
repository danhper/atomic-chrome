const NORMAL_CLOSE_CODE = 1000;

class TextSyncer {
  linkElem(url, title, handler, options) {
    const port = chrome.runtime.connect();
    this.register(port, url, title, handler, options);
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

  register(port, url, title, handler, options) {
    options = options || {};
    handler.getValue().then((text) => {
      const payload = {url: url, title: title, text: text};
      let extension = options.extension;
      if (extension) {
        if (extension[0] !== '.') {
          extension = `.${extension}`;
        }
        payload.extension = extension;
      }
      this.post(port, 'register', payload);
    });
  }

  post(port, type, payload) {
    port.postMessage({type: type, payload: payload});
  }
}

export default new TextSyncer();
