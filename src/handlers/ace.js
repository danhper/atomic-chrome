import BaseHandler from './base';

const aceClassName = 'ace_text-input';

class AceHandler extends BaseHandler {
  constructor(elem) {
    super(elem);
    this.callback = null;
    this.initialized = false;
    // TODO: generate a uuid to allow multiple instances to work together
    this.uuid = null;

    window.addEventListener('message', (message) => {
      if (message.source !== window /* || message.data.uuid !== this.uuid */) {
        return;
      }
      this.emit(message.data.type, message.data.payload);
    });
  }

  load() {
    this.injectScript(() => this.post('initialize'));
    return new Promise((resolve) => this.once('ready', resolve));
  }

  // TODO: check if script is already injected
  // TODO: move this to a parent class
  injectScript(onload) {
    var s = document.createElement('script');
    s.src = chrome.extension.getURL('scripts/injected.js');
    s.onload = function () {
      this.parentNode.removeChild(this);
      if (onload) {
        onload();
      }
    };
    document.body.appendChild(s);
  }

  setValue(value) {
    this.post('setValue', {text: value});
  }

  getValue() {
    this.post('getValue');
    return new Promise((resolve) => {
      this.once('value', (payload) => {
        resolve(payload.text);
      });
    });
  }

  post(type, payload) {
    const message = {
      type: type,
      uuid: this.uuid,
      payload: payload || {}
    };
    // TODO: change '*' to something secure
    window.postMessage(message, '*');
  }

  withoutCallback(action) {
    if (this.callback) {
      this.unbindChange(this.callback);
    }
    action();
    if (this.callback) {
      this.bindChange(this.callback);
    }
  }

  // TODO: not implemented yet
  bindChange(f) {
    // this.callback = f;
    // this.editor.on('change', f);
  }

  unbindChange(f) {
    // this.editor.off('change', f);
  }
}

AceHandler.canHandle = function (elem) {
  return elem.classList.contains(aceClassName);
};

export default AceHandler;
