import contentEditableHandler from './content-editable';
import textareaHandler from './textarea';

import handlerFactory from './factory';

handlerFactory.registerHandler(contentEditableHandler);
handlerFactory.registerHandler(textareaHandler);

export {handlerFactory as handlerFactory};
