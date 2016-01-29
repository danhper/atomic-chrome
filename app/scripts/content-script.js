/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _handlers = __webpack_require__(3);

	var _contentScriptTools = __webpack_require__(8);

	function run() {
	  var title = document.title;
	  var activeElement = document.activeElement;

	  var handler = _handlers.handlerFactory.handlerFor(activeElement);

	  if (!handler) {
	    var elemName = activeElement.tagName.toLowerCase();
	    console.error('Atomic Chrome does not support <' + elemName + '> (yet?)');
	    return;
	  }
	  var textElem = new _contentScriptTools.TextElement(handler, activeElement);
	  _contentScriptTools.textSyncer.linkElem(title, textElem);
	}

	run();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.handlerFactory = undefined;

	var _contentEditable = __webpack_require__(4);

	var _contentEditable2 = _interopRequireDefault(_contentEditable);

	var _textarea = __webpack_require__(6);

	var _textarea2 = _interopRequireDefault(_textarea);

	var _factory = __webpack_require__(7);

	var _factory2 = _interopRequireDefault(_factory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_factory2.default.registerHandler(_contentEditable2.default);
	_factory2.default.registerHandler(_textarea2.default);

	exports.handlerFactory = _factory2.default;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _base = __webpack_require__(5);

	var _base2 = _interopRequireDefault(_base);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ContentEditableHandler = function (_BaseHandler) {
	  _inherits(ContentEditableHandler, _BaseHandler);

	  function ContentEditableHandler() {
	    _classCallCheck(this, ContentEditableHandler);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(ContentEditableHandler).apply(this, arguments));
	  }

	  _createClass(ContentEditableHandler, [{
	    key: 'canHandle',
	    value: function canHandle(elem) {
	      return elem.isContentEditable;
	    }
	  }, {
	    key: 'getValue',
	    value: function getValue(elem, options) {
	      var _this2 = this;

	      options = options || {};
	      return Array.from(elem.childNodes).map(function (child, i) {
	        if (child.wholeText) {
	          return child.wholeText;
	        }
	        var tag = child.tagName.toLowerCase();
	        switch (tag) {
	          case 'div':
	            return _this2.getValue(child) + '\n';
	          case 'br':
	            return i === elem.childNodes.length - 1 ? '' : '\n';
	          default:
	            return child.outerHTML;
	        }
	      }).join('');
	    }
	  }, {
	    key: 'setValue',
	    value: function setValue(elem, value) {
	      var htmlValue = value.split('\n').map(function (v) {
	        if (v.trim().length === 0) {
	          return '<br>';
	        }
	        return '<div>' + v + '</div>';
	      }).join('');
	      elem.innerHTML = htmlValue;
	    }
	  }]);

	  return ContentEditableHandler;
	}(_base2.default);

	exports.default = new ContentEditableHandler();

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BaseHandler = function () {
	  function BaseHandler() {
	    _classCallCheck(this, BaseHandler);
	  }

	  _createClass(BaseHandler, [{
	    key: 'canHandle',
	    value: function canHandle() {
	      return false;
	    }
	  }, {
	    key: 'setValue',
	    value: function setValue() {
	      throw new Error('not implemented');
	    }
	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      throw new Error('not implemented');
	    }
	  }]);

	  return BaseHandler;
	}();

	exports.default = BaseHandler;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _base = __webpack_require__(5);

	var _base2 = _interopRequireDefault(_base);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TextareaHandler = function (_BaseHandler) {
	  _inherits(TextareaHandler, _BaseHandler);

	  function TextareaHandler() {
	    _classCallCheck(this, TextareaHandler);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(TextareaHandler).apply(this, arguments));
	  }

	  _createClass(TextareaHandler, [{
	    key: 'canHandle',
	    value: function canHandle(elem) {
	      return elem.tagName && elem.tagName.toLowerCase() === 'textarea';
	    }
	  }, {
	    key: 'setValue',
	    value: function setValue(elem, value) {
	      elem.value = value;
	    }
	  }, {
	    key: 'getValue',
	    value: function getValue(elem) {
	      return elem.value;
	    }
	  }]);

	  return TextareaHandler;
	}(_base2.default);

	exports.default = new TextareaHandler();

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var HandlerFactory = function () {
	  function HandlerFactory() {
	    _classCallCheck(this, HandlerFactory);

	    this.handlers = [];
	  }

	  _createClass(HandlerFactory, [{
	    key: "registerHandler",
	    value: function registerHandler(handler) {
	      this.handlers.push(handler);
	    }
	  }, {
	    key: "handlerFor",
	    value: function handlerFor(elem) {
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = this.handlers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var handler = _step.value;

	          if (handler.canHandle(elem)) {
	            return handler;
	          }
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      return false;
	    }
	  }]);

	  return HandlerFactory;
	}();

	exports.default = new HandlerFactory();

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _textSyncer = __webpack_require__(9);

	Object.defineProperty(exports, 'textSyncer', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_textSyncer).default;
	  }
	});

	var _textElement = __webpack_require__(10);

	Object.defineProperty(exports, 'TextElement', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_textElement).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NORMAL_CLOSE_CODE = 1000;

	var TextSyncer = function () {
	  function TextSyncer() {
	    _classCallCheck(this, TextSyncer);
	  }

	  _createClass(TextSyncer, [{
	    key: 'linkElem',
	    value: function linkElem(title, textElem) {
	      var port = chrome.runtime.connect();
	      this.register(port, title, textElem);
	      port.onMessage.addListener(this.makeMessageHandler(textElem));
	      var textChangeHandler = this.makeTextChangeHandler(port, textElem);
	      textElem.elem.addEventListener('keyup', textChangeHandler, false);
	      port.onDisconnect.addListener(function () {
	        textElem.elem.removeEventListener('keyup', textChangeHandler, false);
	      });
	    }
	  }, {
	    key: 'makeMessageHandler',
	    value: function makeMessageHandler(textElem) {
	      return function (msg) {
	        switch (msg.type) {
	          case 'updateText':
	            textElem.value = msg.payload.text;
	            break;
	          case 'closed':
	            var code = msg.payload.code;
	            if (code !== NORMAL_CLOSE_CODE) {
	              console.warn('Atomic Chrome connection was closed with code ' + code);
	            }
	            break;
	          default:
	            console.warn('Atomic Chrome received unknown message:', msg);
	            break;
	        }
	      };
	    }
	  }, {
	    key: 'makeTextChangeHandler',
	    value: function makeTextChangeHandler(port, textElem) {
	      return function () {
	        port.postMessage({
	          type: 'updateText',
	          payload: {
	            text: textElem.value
	          }
	        });
	      };
	    }
	  }, {
	    key: 'register',
	    value: function register(port, title, textElem) {
	      port.postMessage({
	        type: 'register',
	        payload: {
	          title: title,
	          text: textElem.value
	        }
	      });
	    }
	  }]);

	  return TextSyncer;
	}();

	exports.default = new TextSyncer();

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TextElement = function () {
	  function TextElement(handler, elem) {
	    _classCallCheck(this, TextElement);

	    this.handler = handler;
	    this.elem = elem;
	  }

	  _createClass(TextElement, [{
	    key: "value",
	    set: function set(value) {
	      this.handler.setValue(this.elem, value);
	    },
	    get: function get() {
	      return this.handler.getValue(this.elem);
	    }
	  }]);

	  return TextElement;
	}();

	exports.default = TextElement;

/***/ }
/******/ ]);