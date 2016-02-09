// Google Inbox custom events
// trigger window resize to remove placeholder

export default {
  url: new RegExp('https://inbox\.google\.com.*', 'i'),
  // remove placeholder
  bind: function (window) {
    const handleValueSet = () => {
      if (this.getValue()) {
        window.dispatchEvent(new Event('resize'));
      } else {
        this.once('valueSet', handleValueSet);
      }
    };

    this.once('valueSet', handleValueSet);
  }
};
