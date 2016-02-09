import injectedHandlerFactory from './factory';

import InjectedAceHandler from './ace';
import InjectedCodeMirrorHandler from './codemirror';

injectedHandlerFactory.registerHandler('ace', InjectedAceHandler);
injectedHandlerFactory.registerHandler('codemirror', InjectedCodeMirrorHandler);

export {injectedHandlerFactory as injectedHandlerFactory};
