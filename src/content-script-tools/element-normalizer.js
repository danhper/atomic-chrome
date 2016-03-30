import string from 'ac-util/string';

class ElementNormalizer {
  normalize(elem) {
    const tagName = elem.tagName && elem.tagName.toLowerCase();
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
      console.warn('Could not get frame activeElement. Is it cross domain?');
      return elem;
    }
  }
}

export default new ElementNormalizer();
