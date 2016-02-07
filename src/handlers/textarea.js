import BaseHandler from './base';

class TextareaHandler extends BaseHandler {
  setValue(value) {
    this.elem.value = value;
    super.setValue(value);
  }

  getValue() {
    return Promise.resolve(this.elem.value);
  }
}

TextareaHandler.canHandle = function (elem) {
  return elem.tagName && elem.tagName.toLowerCase() === 'textarea';
};

export default TextareaHandler;
