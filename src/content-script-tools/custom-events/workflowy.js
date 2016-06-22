import string from 'ac-util/string';

export default {
  url: new RegExp('https://workflowy\.com.*', 'i'),
  // override setvalue
  bind: function (window) {
    this.setValue = (value) => {
      this.elem.innerHTML = string.htmlEscape(value);
    };

    this.extractTextFromUnknownElem = (elem, options) => {
      return elem.innerText;
    };
  }
};
