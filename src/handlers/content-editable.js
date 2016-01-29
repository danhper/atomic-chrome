import BaseHandler from './base';

class ContentEditableHandler extends BaseHandler {
  canHandle(elem) {
    return elem.isContentEditable;
  }

  getValue(elem, options) {
    options = options || {};
    return Array.from(elem.childNodes).map((child, i) => {
      if (child.wholeText) {
        return child.wholeText;
      }
      const tag = child.tagName.toLowerCase();
      switch (tag) {
        case 'div':
          return this.getValue(child) + '\n';
        case 'br':
          return (i === elem.childNodes.length - 1) ? '' : '\n';
        default:
          return child.outerHTML;
      }
    }).join('');
  }

  setValue(elem, value) {
    const htmlValue = value.split('\n').map((v) => {
      if (v.trim().length === 0) {
        return '<br>';
      }
      return '<div>' + v + '</div>';
    }).join('');
    elem.innerHTML = htmlValue;
  }
}

export default new ContentEditableHandler();
