class InjectedHandlerFactory {
  constructor() {
    this.handlers = {};
  }

  registerHandler(name, klass) {
    this.handlers[name] = klass;
  }

  getHandler(name) {
    return this.handlers[name];
  }
}

export default new InjectedHandlerFactory();
