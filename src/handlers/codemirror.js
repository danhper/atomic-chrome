import InjectorHandler from './injector';

class CodeMirrorHandler extends InjectorHandler {
  constructor(elem, contentEvents) {
    super(elem, contentEvents, 'codemirror');
  }
}

CodeMirrorHandler.canHandle = function (elem) {
  return elem.parentElement
    && elem.parentElement.parentElement
    && elem.parentElement.parentElement.classList.contains('CodeMirror');
};

export default CodeMirrorHandler;
