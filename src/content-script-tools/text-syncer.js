const NORMAL_CLOSE_CODE = 1000;

class TextSyncer {
  linkElem(title, textElem) {
    const port = chrome.runtime.connect();
    this.register(port, title, textElem);
    port.onMessage.addListener(this.makeMessageHandler(textElem));
    const textChangeHandler = this.makeTextChangeHandler(port, textElem);
    textElem.elem.addEventListener('keyup', textChangeHandler, false);
    port.onDisconnect.addListener(() => {
      textElem.elem.removeEventListener('keyup', textChangeHandler, false);
    });
  }

  makeMessageHandler(textElem) {
    return (msg) => {
      switch (msg.type) {
        case 'updateText':
          textElem.value = msg.payload.text;
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

  makeTextChangeHandler(port, textElem) {
    return () => {
      port.postMessage({
        type: 'updateText',
        payload: {
          text: textElem.value
        }
      });
    };
  }

  register(port, title, textElem) {
    port.postMessage({
      type: 'register',
      payload: {
        title: title,
        text: textElem.value
      }
    });
  }
}

export default new TextSyncer();
