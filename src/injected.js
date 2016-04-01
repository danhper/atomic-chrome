import {injectedHandlerFactory} from './handlers/injected';

const handlers = [];

function isSourceTrusted(source) {
  let win;
  for (win = window; win !== window.parent; win = window.parent) {
    if (source === window) {
      return true;
    }
  }
  return win === source;
}

window.addEventListener('message', function (message) {
  if (!isSourceTrusted(message.source)) {
    return;
  }
  if (message.data.type === 'initialize') {
    const handlerName = message.data.payload.name;
    const Handler = injectedHandlerFactory.getHandler(handlerName);
    if (!Handler) {
      console.error(`Atomic Chrome received bad handler name: ${handlerName}`);
      return;
    }
    const handler = new Handler(document.activeElement, message.data.uuid);
    handler.setup().then(() => {
      handlers.push(handler);
      handler.postReady();
    });
  } else {
    for (const handler of handlers) {
      handler.handleMessage(message.data);
    }
  }
});
