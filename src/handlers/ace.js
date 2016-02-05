import InjectorHandler from './injector';
import injectedHandlerFactory from './injected-factory';
import BaseInjectedHandler from './base-injected';

const name = 'ace';
const aceClassName = 'ace_text-input';

class AceHandler extends InjectorHandler {
  constructor(elem) {
    super(elem, name);
  }
}

class InjectedAceHandler extends BaseInjectedHandler {
  constructor(elem, uuid) {
    super(elem, uuid);
    this.silenced = false;
  }

  load() {
    this.editor = ace.edit(this.elem.parentElement);
    this.editor.$blockScrolling = Infinity;
  }

  getValue() {
    return this.editor.getValue();
  }

  setValue(text) {
    this.executeSilenced(() => this.editor.setValue(text, 1));
  }

  bindChange(f) {
    this.editor.on('change', this.wrapSilence(f));
  }

  unbindChange(f) {
    this.editor.off('change', f);
  }
}

AceHandler.canHandle = function (elem) {
  return elem.classList.contains(aceClassName);
};

injectedHandlerFactory.registerHandler(name, InjectedAceHandler);

export default AceHandler;
