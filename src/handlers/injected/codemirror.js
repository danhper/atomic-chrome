import BaseInjectedHandler from './base';
import 'codemirror/mode/meta';
import CodeMirror from 'dummy-codemirror';

// NOTE: keep modes which could conflict or which do not resolve here
const commonModes = {
  css: 'css',
  htmlmixed: 'html',
  html: 'html',
  javascript: 'js'
};

class InjectedCodeMirrorHandler extends BaseInjectedHandler {
  load() {
    this.editor = this.elem.parentElement.parentElement.CodeMirror;
    return Promise.resolve();
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

  getExtension() {
    const currentModeName = this.editor.getMode().name;
    if (commonModes[currentModeName]) {
      return commonModes[currentModeName];
    }
    for (const mode of CodeMirror.modeInfo) {
      if (mode.mode === currentModeName && mode.ext) {
        return mode.ext[0];
      }
    }
    return null;
  }
}

export default InjectedCodeMirrorHandler;
