// StackOveflow custom events
// trigger keypress to update preview

export default {
  url: new RegExp('https?://(?:.*\.)?stackoverflow\.com.*', 'i'),
  bind: function (window) {
    this.on('valueSet', () => {
      const evt = window.document.createEvent('KeyboardEvent');
      evt.initEvent('keypress');
      this.elem.dispatchEvent(evt);
    });
  }
};
