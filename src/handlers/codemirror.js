import InjectorHandler from './injector';
import injectedHandlerFactory from './injected-factory';
import BaseInjectedHandler from './base-injected';

const name = 'codeMirror';

class CodeMirrorHandler extends InjectorHandler {
  constructor(elem, contentEvents) {
    super(elem, contentEvents, name);
  }
}

class InjectedCodeMirrorHandler extends BaseInjectedHandler {
  load() {
    this.editor = this.elem.parentElement.parentElement.CodeMirror;
  }

  getValue() {
    return this.editor.getValue();
  }

  setValue(text) {
    this.executeSilenced(() => this.editor.setValue(text));
  }

  bindChange(f) {
    this.editor.on('change', this.wrapSilence(f));
  }

  unbindChange(f) {
    this.editor.off('change', f);
  }
}

CodeMirrorHandler.canHandle = function (elem) {
  return elem.parentElement
    && elem.parentElement.parentElement
    && elem.parentElement.parentElement.classList.contains('CodeMirror');
};

injectedHandlerFactory.registerHandler(name, InjectedCodeMirrorHandler);

export default CodeMirrorHandler;
