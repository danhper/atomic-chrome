const events = [{
  url: new RegExp('https://inbox.google.com.*', 'i'),
  bind: function (window) {
    this.once('valueSet', () => window.dispatchEvent(new Event('resize')));
  }
}];

export default {
  bind: (target, window) => {
    const origin = window.location.origin;
    for (const event of events) {
      if (origin.match(event.url)) {
        event.bind.call(target, window);
      }
    }
  }
};
