import {handlerFactory} from './handlers';
import {textSyncer, contentEvents} from './content-script-tools';

function run() {
  const title = document.title;
  const activeElement = document.activeElement;

  const Handler = handlerFactory.handlerFor(activeElement);

  if (!Handler) {
    const elemName = activeElement.tagName.toLowerCase();
    console.error(`Atomic Chrome does not support <${elemName}> (yet?)`);
    return;
  }

  const handler = new Handler(activeElement, contentEvents);

  handler.load().then(() => {
    textSyncer.linkElem(title, handler);
  });
}

run();
