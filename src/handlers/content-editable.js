import BaseHandler from './base';

class ContentEditableHandler extends BaseHandler {
  getValue(options) {
    options = options || {};
    return Array.from(this.elem.childNodes).map((child, i) => {
      if (child.wholeText) {
        return child.wholeText;
      }
      const tag = child.tagName.toLowerCase();
      switch (tag) {
        case 'div':
          return this.getValue(child) + '\n';
        case 'br':
          return (i === this.elem.childNodes.length - 1) ? '' : '\n';
        default:
          return child.outerHTML;
      }
    }).join('');
  }

  setValue(value) {
    const htmlValue = value.split('\n').map((v) => {
      if (v.trim().length === 0) {
        return '<br>';
      }
      return '<div>' + v + '</div>';
    }).join('');
    this.elem.innerHTML = htmlValue;
  }
}

ContentEditableHandler.canHandle = function (elem) {
  return elem.isContentEditable;
};

export default ContentEditableHandler;
