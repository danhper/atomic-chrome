export default {
  url: new RegExp('https://workflowy\.com.*', 'i'),
  // override setvalue
  bind: function (window) {
    this.setValue = (value) => {
      this.elem.innerHTML = value;
    };
  }
};
