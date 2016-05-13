// Google Inbox custom events
// removes label when start typing

export default {
  url: new RegExp('https://inbox\.google\.com.*', 'i'),
  // remove placeholder
  bind: function (window) {
    const hideLabel = () => {
      const label = this.elem.previousSibling;
      if (!label || !label.tagName || label.tagName.toLowerCase() !== 'label') {
        return;
      }
      label.innerText = '';
      label.style.display = 'none';
    };

    const handleValueSet = () => {
      if (this.getValue()) {
        hideLabel();
      } else {
        this.once('valueSet', handleValueSet);
      }
    };

    this.once('valueSet', handleValueSet);
  }
};
