import BaseInjectedHandler from './base';

class InjectedAceHandler extends BaseInjectedHandler {
  constructor(elem, uuid) {
    super(elem, uuid);
    this.silenced = false;
  }

  load() {
    return new Promise((resolve) => {
      this.editor = ace.edit(this.elem.parentElement);
      this.editor.$blockScrolling = Infinity;
      if (!ace.config || !ace.config.loadModule) {
        return resolve();
      }
      ace.config.loadModule('ace/ext/modelist', (m) => {
        this.modes = m.modes;
        this.loaded = true;
        resolve();
      });
      // NOTE: no callback when loadModule fails, so add a timeout
      setTimeout(() => {
        if (!this.loaded) {
          resolve();
        }
      }, 3000);
    });
  }

  getExtension() {
    if (!this.modes) {
      return null;
    }
    const session = this.editor.getSession();
    const currentMode = session && session.getMode() && session.getMode().$id;
    if (!currentMode) {
      return null;
    }
    for (const mode of this.modes) {
      if (mode.mode === currentMode) {
        return mode.extensions.split('|')[0];
      }
    }
    return null;
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

export default InjectedAceHandler;
