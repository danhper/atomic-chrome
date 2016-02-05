import string from 'ac-util/string';

export default class BaseInjectedHandler {
  constructor(elem, uuid) {
    this.elem = elem;
    this.uuid = uuid;
    this.load();
    this.bindChange(() => this.postToInjector('change'));
  }

  load() {
    // implement in subclass when needed
  }

  handleMessage(data) {
    const method = `on${string.capitalize(data.type)}`;
    if (data.uuid === this.uuid && this[method]) {
      this[method](data.payload);
    }
  }

  onGetValue() {
    this.postToInjector('value', {text: this.getValue()});
  }

  onSetValue(payload) {
    this.setValue(payload.text);
  }

  getValue() {
    throw new Error('not implemented');
  }

  setValue() {
    throw new Error('not implemented');
  }

  bindChange() {
    throw new Error('not implemented');
  }

  executeSilenced(f) {
    this.silenced = true;
    f();
    this.silenced = false;
  }

  wrapSilence(f) {
    return () => {
      if (!this.silenced) {
        f();
      }
    };
  }

  postToInjector(type, payload) {
    const message = {
      type: type,
      uuid: this.uuid,
      payload: payload || {}
    };
    window.postMessage(message, location.origin);
  }
}
