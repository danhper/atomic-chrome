import BaseHandler from './base';
import ace from 'brace';

const aceClassName = 'ace_text-input';

class AceHandler extends BaseHandler {
  constructor(elem) {
    super(elem);
    this.elem = elem.parentElement.parentElement.querySelector('textarea');
    this.editor = ace.edit(elem.parentElement);
    this.editor.$blockScrolling = Infinity;
    this.callback = null;
  }

  setValue(value) {
    this.withoutCallback(() => {
      this.elem.value = value;
      this.editor.getSession().setValue(value, 1);
    });
  }

  getValue() {
    return this.editor.getSession().getValue();
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

  bindChange(f) {
    this.callback = f;
    this.editor.on('change', f);
  }

  unbindChange(f) {
    this.editor.off('change', f);
  }
}

AceHandler.canHandle = function (elem) {
  return elem.classList.contains(aceClassName);
};

export default AceHandler;
