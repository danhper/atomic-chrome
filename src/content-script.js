import {handlerFactory} from './handlers';
import {textSyncer, contentEvents, elementNormalizer} from './content-script-tools';

function run() {
  const url = document.URL;
  const title = document.title;
  const activeElement = elementNormalizer.normalize(document.activeElement);

  const Handler = handlerFactory.handlerFor(activeElement);

  if (!Handler) {
    const elemName = activeElement.tagName.toLowerCase();
    console.error(`Atomic Chrome does not support <${elemName}> (yet?)`);
    return;
  }

  const handler = new Handler(activeElement, contentEvents);

  handler.load().then((options) => {
    textSyncer.linkElem(url, title, handler, options);
  });
}

run();
