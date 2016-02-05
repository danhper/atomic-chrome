// TODO: make this abstract and create the ace version
class MessageHandler {
  constructor(elem, uuid) {
    this.elem = elem;
    this.uuid = uuid;
    this.editor = ace.edit(elem.parentElement);
    this.editor.$blockScrolling = Infinity;
  }

  handleMessage(data) {
    if (data.uuid !== this.uuid) {
      return;
    }
    if (this[data.type]) {
      this[data.type](data.payload);
    }
  }

  getValue() {
    this.post('value', {text: this.editor.getValue()});
  }

  setValue(payload) {
    this.editor.setValue(payload.text, 1);
  }

  post(type, payload) {
    const message = {
      type: type,
      uuid: this.uuid,
      payload: payload || {}
    };
    window.postMessage(message, '*');
  }
}

const handlers = [];

window.addEventListener('message', function (message) {
  if (message.source !== window) {
    return;
  }
  if (message.data.type === 'initialize') {
    const handler = new MessageHandler(document.activeElement, message.data.uuid);
    handlers.push(handler);
    handler.post('ready');
  } else {
    for (const handler of handlers) {
      handler.handleMessage(message.data);
    }
  }
});
