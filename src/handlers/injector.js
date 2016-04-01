import uuid from 'uuid';

import BaseHandler from './base';

export default class InjectorHandler extends BaseHandler {
  constructor(elem, contentEvents, name) {
    super(elem, contentEvents);
    this.name = name;
    this.uuid = uuid.v4();

    this.window.addEventListener('message', (message) => {
      if (message.source !== this.window || message.data.uuid !== this.uuid) {
        return;
      }
      this.emit(message.data.type, message.data.payload);
    });
  }

  load() {
    this.injectScript(() => this.postToInjected('initialize', {name: this.name}));
    return new Promise((resolve) => this.once('ready', resolve));
  }

  setValue(value) {
    this.postToInjected('setValue', {text: value});
    super.setValue(value);
  }

  getValue() {
    this.postToInjected('getValue');
    return new Promise((resolve) => {
      this.once('value', (payload) => resolve(payload.text));
    });
  }

  injectScript(onload) {
    if (this.document.atomicScriptInjected) {
      return onload && onload();
    }
    this.document.atomicScriptInjected = true;
    this.executeInjectScript(onload);
  }

  executeInjectScript(onload) {
    const s = this.document.createElement('script');
    s.src = chrome.extension.getURL('scripts/injected.js');
    s.onload = function () {
      this.parentNode.removeChild(this);
      if (onload) {
        onload();
      }
    };
    this.document.body.appendChild(s);
  }

  postToInjected(type, payload) {
    const message = {
      type: type,
      uuid: this.uuid,
      payload: payload || {}
    };
    this.window.postMessage(message, this.window.location.origin);
  }

  bindChange(f) {
    this.on('change', f);
  }

  unbindChange(f) {
    this.removeListener('change', f);
  }
}
