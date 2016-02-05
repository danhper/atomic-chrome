import EventEmitter from 'events';

export default class BaseHandler extends EventEmitter {
  constructor(elem) {
    super();
    this.elem = elem;
  }

  load() {
    return Promise.resolve();
  }

  setValue() {
    throw new Error('not implemented');
  }

  getValue() {
    throw new Error('not implemented');
  }

  bindChange(f) {
    this.elem.addEventListener('keyup', f, false);
    this.elem.addEventListener('change', f, false);
  }

  unbindChange(f) {
    this.elem.removeEventListener('keyup', f, false);
    this.elem.removeEventListener('change', f, false);
  }
}
