import BaseHandler from './base';

// TODO: use same logic as ace to handle changes
class CodeMirrorHandler extends BaseHandler {
  constructor(elem) {
    super(elem);
    this.editor = elem.parentElement.parentElement.CodeMirror;
  }

  setValue(value) {
    this.editor.setValue(value);
  }

  getValue() {
    return this.editor.getValue();
  }
}

CodeMirrorHandler.canHandle = function (elem) {
  return elem.parentElement
    && elem.parentElement.parentElement
    && elem.parentElement.parentElement.CodeMirror;
};

export default CodeMirrorHandler;
