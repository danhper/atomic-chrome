import InjectorHandler from './injector';

const aceClassName = 'ace_text-input';

class AceHandler extends InjectorHandler {
  constructor(elem, contentEvents) {
    super(elem, contentEvents, 'ace');
  }
}

AceHandler.canHandle = function (elem) {
  return elem.classList.contains(aceClassName);
};


export default AceHandler;
