export default class BaseHandler {
  canHandle() {
    return false;
  }

  setValue() {
    throw new Error('not implemented');
  }

  getValue() {
    throw new Error('not implemented');
  }
}
