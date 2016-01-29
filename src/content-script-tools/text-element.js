export default class TextElement {
  constructor(handler, elem) {
    this.handler = handler;
    this.elem = elem;
  }

  set value(value) {
    this.handler.setValue(this.elem, value);
  }

  get value() {
    return this.handler.getValue(this.elem);
  }
}
