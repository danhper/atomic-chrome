export default {
  capitalize: function (s) {
    if (!s) {
      return s;
    }
    return s[0].toUpperCase() + s.slice(1);
  },

  htmlEscape: function (s) {
    if (!s) {
      return s;
    }
    return s
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
};
