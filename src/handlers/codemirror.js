import InjectorHandler from './injector';

class CodeMirrorHandler extends InjectorHandler {
  constructor(elem, contentEvents) {
    super(elem, contentEvents, 'codemirror');
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
