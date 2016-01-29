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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _backgroundTools = __webpack_require__(11);

	chrome.browserAction.onClicked.addListener(function () {
	  chrome.tabs.executeScript(null, {
	    file: 'scripts/content-script.js'
	  });
	});

	chrome.runtime.onConnect.addListener(function (port) {
	  _backgroundTools.wsBridge.openConnection(port);
	});

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _wsBridge = __webpack_require__(12);

	Object.defineProperty(exports, 'wsBridge', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_wsBridge).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var WS_PORT = 64292;
	var WS_URL = 'ws://localhost:' + WS_PORT;

	var WSBridge = function () {
	  function WSBridge() {
	    _classCallCheck(this, WSBridge);
	  }

	  _createClass(WSBridge, [{
	    key: 'openConnection',
	    value: function openConnection(port) {
	      var _this = this;

	      var queue = [];
	      var ws = this.makeWS(port, queue);
	      port.onMessage.addListener(function (msg) {
	        return _this.sendMessage(ws, queue, msg);
	      });
	      port.onDisconnect.addListener(function () {
	        return ws.close();
	      });
	    }
	  }, {
	    key: 'makeWS',
	    value: function makeWS(port, queue) {
	      var ws = new WebSocket(WS_URL);
	      ws.onopen = function () {
	        while (queue.length > 0) {
	          ws.send(queue.shift());
	        }
	      };
	      ws.onmessage = function (wsMsg) {
	        port.postMessage(JSON.parse(wsMsg.data));
	      };
	      ws.onclose = function (evt) {
	        port.postMessage({ type: 'closed', payload: { code: evt.code, reason: evt.reason } });
	        port.disconnect();
	      };
	      return ws;
	    }
	  }, {
	    key: 'sendMessage',
	    value: function sendMessage(ws, queue, msg) {
	      msg = JSON.stringify(msg);
	      if (ws.readyState === ws.CONNECTING) {
	        queue.push(msg);
	      } else if (ws.readyState === ws.OPEN) {
	        ws.send(msg);
	      }
	    }
	  }]);

	  return WSBridge;
	}();

	exports.default = new WSBridge();

/***/ }
/******/ ]);