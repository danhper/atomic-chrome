export default {
  capitalize: function (s) {
    if (!s) {
      return s;
    }
    return s[0].toUpperCase() + s.slice(1);
  }
};
