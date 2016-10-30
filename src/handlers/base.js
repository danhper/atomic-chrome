import EventEmitter from 'events';

export default class BaseHandler extends EventEmitter {
  constructor(elem, contentEvents) {
    super();
    this.document = elem.ownerDocument;
    this.window = this.document.defaultView;
    this.elem = elem;
    contentEvents.bind(this, this.window);
  }

  load() {
    return Promise.resolve();
  }

  setValue(value, options) {
    this.emit('valueSet', value, options || {});
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
