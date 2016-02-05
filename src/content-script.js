import {handlerFactory} from './handlers';
import {textSyncer} from './content-script-tools';

function run() {
  const title = document.title;
  const activeElement = document.activeElement;

  const handler = handlerFactory.handlerFor(activeElement);

  if (!handler) {
    const elemName = activeElement.tagName.toLowerCase();
    console.error(`Atomic Chrome does not support <${elemName}> (yet?)`);
    return;
  }

  handler.load().then(() => {
    textSyncer.linkElem(title, handler);
  });
}

run();
