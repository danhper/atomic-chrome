class HandlerFactory {
  constructor() {
    this.handlers = [];
  }

  registerHandler(handler) {
    this.handlers.push(handler);
  }

  handlerFor(elem) {
    for (const Handler of this.handlers) {
      if (Handler.canHandle(elem)) {
        return new Handler(elem);
      }
    }
    return false;
  }
}

export default new HandlerFactory();
