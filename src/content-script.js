import {handlerFactory} from './handlers';
import {textSyncer, TextElement} from './content-script-tools';

function run() {
  const title = document.title;
  const activeElement = document.activeElement;

  const handler = handlerFactory.handlerFor(activeElement);

  if (!handler) {
    const elemName = activeElement.tagName.toLowerCase();
    console.error(`Atomic Chrome does not support <${elemName}> (yet?)`);
    return;
  }
  const textElem = new TextElement(handler, activeElement);
  textSyncer.linkElem(title, textElem);
}

run();
