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
      switch (msg.type) {
        case 'updateText':
          handler.setValue(msg.payload.text);
          break;
        case 'closed':
          const code = msg.payload.code;
          if (code !== NORMAL_CLOSE_CODE) {
            console.warn(`Atomic Chrome connection was closed with code ${code}`);
          }
          break;
        default:
          console.warn('Atomic Chrome received unknown message:', msg);
          break;
      }
    };
  }

  makeTextChangeListener(port, handler) {
    return () => {
      port.postMessage({
        type: 'updateText',
        payload: {
          text: handler.getValue()
        }
      });
    };
  }

  register(port, title, handler) {
    port.postMessage({
      type: 'register',
      payload: {
        title: title,
        text: handler.getValue()
      }
    });
  }
}

export default new TextSyncer();
