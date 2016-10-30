// trigger keypress when the value is set

export default {
  url: /.*/,
  bind: function (window) {
    this.on('valueSet', (value, options) => {
      if (options && options.triggerDOMEvent === false) {
        return;
      }
      const evt = window.document.createEvent('KeyboardEvent');
      evt.initEvent('keypress');
      this.elem.dispatchEvent(evt);
    });
  }
};
