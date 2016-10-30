import InjectorHandler from './injector';

class CodeMirrorHandler extends InjectorHandler {
  constructor(elem, contentEvents) {
    super(elem, contentEvents, 'codemirror');
  }

  setValue(value, options) {
    options = Object.assign({}, {triggerDOMEvent: false}, options);
    super.setValue(value, options);
  }
}

CodeMirrorHandler.canHandle = function (elem) {
  while (elem) {
    if (elem.classList.contains('CodeMirror')) {
      return true;
    }
    elem = elem.parentElement;
  }
  return false;
};

export default CodeMirrorHandler;
