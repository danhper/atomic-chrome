import CodeMirrorHandler from './codemirror';
import AceHandler from './ace';
import ContentEditableHandler from './content-editable';
import TextareaHandler from './textarea';

import handlerFactory from './factory';

handlerFactory.registerHandler(CodeMirrorHandler);
handlerFactory.registerHandler(AceHandler);
handlerFactory.registerHandler(ContentEditableHandler);
handlerFactory.registerHandler(TextareaHandler);

export {handlerFactory as handlerFactory};
export {default as injectedHandlerFactory} from './injected-factory';
