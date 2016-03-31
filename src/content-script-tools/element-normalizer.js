import string from 'ac-util/string';

class ElementNormalizer {
  normalize(elem) {
    const tagName = this._tagName(elem);
    const method = `normalize${string.capitalize(tagName)}`;
    if (this[method]) {
      return this[method](elem);
    }
    return elem;
  }

  normalizeFrame(elem) {
    try {
      return elem.contentDocument.activeElement;
    } catch (e) {
      console.warn(`Could not get ${this._tagName(elem)} activeElement. Is it cross domain?`);
      return elem;
    }
  }

  normalizeIframe(elem) {
    return this.normalizeFrame(elem);
  }

  _tagName(elem) {
    return elem.tagName && elem.tagName.toLowerCase();
  }
}

export default new ElementNormalizer();
