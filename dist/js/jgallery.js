/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var defaultOptions = {
    style: {},
    children: [],
};
function default_1(html, options) {
    var element = (new DOMParser().parseFromString(html, 'text/html').body.firstChild);
    options = __assign({}, defaultOptions, options);
    Object.assign(element.style, options.style);
    options.children.forEach(function (child) { return element.appendChild(child); });
    return element;
}
exports.default = default_1;
;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Component = /** @class */ (function () {
    function Component() {
    }
    Component.prototype.getElement = function () {
        return this.element;
    };
    Component.prototype.appendStyle = function (style) {
        Object.assign(this.element.style, style);
    };
    return Component;
}());
exports.default = Component;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Layer = /** @class */ (function () {
    function Layer(_a) {
        var _b = _a.width, width = _b === void 0 ? 0 : _b, _c = _a.height, height = _c === void 0 ? 0 : _c, _d = _a.translateX, translateX = _d === void 0 ? 0 : _d, _e = _a.translateY, translateY = _e === void 0 ? 0 : _e, _f = _a.centerX, centerX = _f === void 0 ? 0 : _f, _g = _a.centerY, centerY = _g === void 0 ? 0 : _g, _h = _a.fillStyle, fillStyle = _h === void 0 ? '' : _h, _j = _a.alpha, alpha = _j === void 0 ? 1 : _j;
        this.width = width;
        this.height = height;
        this.translateX = translateX;
        this.translateY = translateY;
        this.centerX = centerX;
        this.centerY = centerY;
        this.fillStyle = fillStyle;
        this.alpha = alpha;
        this.layers = [];
    }
    Layer.prototype.add = function (layer) {
        this.layers.push(layer);
    };
    Layer.prototype.remove = function (layer) {
        var layers = this.layers;
        var index = layers.indexOf(layer);
        if (index > -1) {
            layers.splice(index, 1);
        }
    };
    Layer.prototype.clearLayers = function () {
        this.layers.length = 0;
    };
    return Layer;
}());
exports.default = Layer;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var create_element_1 = __webpack_require__(0);
var withTooltip = function (element, params) {
    params = __assign({ content: '', style: {} }, params);
    var tooltip = create_element_1.default("<span class=\"j-gallery-tooltip\">" + params.content + "</span>", {
        style: __assign({ padding: '.3em .6em', left: '0', bottom: '100%', opacity: '.85', fontSize: '.85em', whiteSpace: 'pre', position: 'absolute', display: 'none' }, params.style),
    });
    element.style.position = 'relative';
    element.appendChild(tooltip);
    element.addEventListener('mouseenter', function () { return tooltip.style.display = 'block'; });
    element.addEventListener('mouseleave', function () { return tooltip.style.display = 'none'; });
    return element;
};
exports.default = withTooltip;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Animation = /** @class */ (function () {
    function Animation(_a) {
        var _b = _a.initialValue, initialValue = _b === void 0 ? 0 : _b, _c = _a.finalValue, finalValue = _c === void 0 ? 0 : _c, _d = _a.onChange, onChange = _d === void 0 ? function () { } : _d, _e = _a.onComplete, onComplete = _e === void 0 ? function () { } : _e, _f = _a.duration, duration = _f === void 0 ? 500 : _f, _g = _a.easingFunction, easingFunction = _g === void 0 ? function (t) { return 1 + (--t) * t * t * t * t; } : _g;
        this.initialValue = initialValue;
        this.currentValue = initialValue;
        this.finalValue = finalValue;
        this.duration = duration;
        this.easingFunction = easingFunction;
        this.onComplete = onComplete;
        this.currentTime = 0;
        this.onChange = onChange;
        this.completed = false;
        this.start = this.start.bind(this);
    }
    Animation.prototype.start = function () {
        this.goToNextFrame();
        if (!this.completed) {
            this.animationFrame = requestAnimationFrame(this.start);
        }
    };
    Animation.prototype.pause = function () {
        cancelAnimationFrame(this.animationFrame);
    };
    Animation.prototype.setValue = function (value) {
        this.currentValue = value;
    };
    Animation.prototype.reset = function () {
        this.pause();
        this.currentTime = 0;
        this.currentValue = this.initialValue;
        this.completed = false;
    };
    Animation.prototype.goToNextFrame = function () {
        this.currentTime += 16 / this.duration;
        this.currentValue = this.initialValue + (this.finalValue - this.initialValue) * this.easingFunction(this.currentTime);
        if (this.currentTime < 1) {
            this.onChange(this.currentValue);
        }
        else {
            this.currentValue = this.finalValue;
            this.onChange(this.currentValue);
            this.completed = true;
            this.onComplete();
        }
    };
    Animation.prototype.addCompleteListener = function (fn) {
        var onComplete = this.onComplete;
        this.onComplete = function () {
            onComplete();
            fn();
        };
    };
    Animation.prototype.cancel = function () {
        this.goToNextFrame = function () { };
    };
    return Animation;
}());
exports.default = Animation;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cancellablePromise = function (executor) {
    var cancelListeners = [];
    var cancel;
    var onCancel = function (listener) { return cancelListeners.push(listener); };
    var promise = new Promise(function (resolve, reject) {
        executor(resolve, reject, onCancel);
        cancel = function () {
            resolve();
            cancelListeners.forEach(function (fn) { return fn(); });
        };
    });
    promise.cancel = cancel;
    return promise;
};
exports.default = cancellablePromise;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(0);
var defaultIconStyle = {
    display: 'inline-flex',
    cursor: 'pointer',
    width: '32px',
    height: '24px',
    verticalAlign: 'middle',
    alignItems: 'center',
    boxSizing: 'border-box',
    justifyContent: 'center',
};
var dot = function (style) {
    if (style === void 0) { style = {}; }
    return index_1.default("<span class=\"j-gallery-dot-icon\" style=\"width: 4px; height: 4px; display: inline-block; margin: 1px\"></span>", { style: style });
};
exports.iconPlay = function (_a, style) {
    var color = _a.color;
    if (style === void 0) { style = {}; }
    return index_1.default("<span class=\"j-gallery-play-icon\"></span>", {
        style: __assign({}, defaultIconStyle, style),
        children: [index_1.default("<span></span>", {
                style: {
                    border: 'solid',
                    borderColor: "transparent transparent transparent " + color,
                    borderWidth: '.4em 0 .4em .7em',
                }
            })]
    });
};
exports.iconScreen = function (_a, style) {
    var color = _a.color;
    if (style === void 0) { style = {}; }
    return index_1.default("<span class=\"j-gallery-screen-icon\"></span>", {
        style: __assign({}, defaultIconStyle, style),
        children: [index_1.default("<span></span>", {
                style: {
                    width: '1em',
                    height: '.8em',
                    border: "solid " + color,
                    borderWidth: '.2em .1em',
                    boxSizing: 'border-box',
                }
            })]
    });
};
exports.iconEllipsisHorizontal = function (_a, style) {
    var color = _a.color;
    if (style === void 0) { style = {}; }
    return index_1.default("<span class=\"j-gallery-ellipsis-horizontal-icon\"></span>", {
        style: __assign({}, defaultIconStyle, style),
        children: [dot({ background: color }), dot({ background: color }), dot({ background: color })]
    });
};
exports.iconPause = function (_a, style) {
    var color = _a.color;
    if (style === void 0) { style = {}; }
    return index_1.default("<span class=\"j-gallery-pause-icon\"></span>", {
        style: __assign({}, defaultIconStyle, { justifyContent: 'center' }, style),
        children: [dot({ width: '.35em', height: '.9em', background: color }), dot({ width: '.35em', height: '.9em', background: color })]
    });
};
exports.iconGrid = function (_a, style) {
    var color = _a.color;
    if (style === void 0) { style = {}; }
    return index_1.default("<span class=\"j-gallery-grid-icon\"></span>", {
        style: __assign({}, defaultIconStyle, { height: 'auto', flexWrap: 'wrap', padding: '7px' }, style),
        children: [
            dot({ background: color }), dot({ background: color }), dot({ background: color }),
            dot({ background: color }), dot({ background: color }), dot({ background: color }),
            dot({ background: color }), dot({ background: color }), dot({ background: color }),
        ]
    });
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(0);
var component_1 = __webpack_require__(1);
var Loading = /** @class */ (function (_super) {
    __extends(Loading, _super);
    function Loading(params) {
        if (params === void 0) { params = { color: '#fff' }; }
        var _this = _super.call(this) || this;
        params = __assign({ style: {} }, params);
        var color = params.color;
        _this.element = index_1.default("\n            <span class=\"j-gallery-loading\" style=\"display: inline-flex\">\n            </span>\n        ", {
            style: params.style,
            children: [
                item({ animationDelay: '-.375s', background: color }),
                item({ animationDelay: '-.250s', background: color }),
                item({ animationDelay: '-.125s', background: color }),
                item({ background: color }),
                item({ background: color }),
                item({ animationDelay: '-.125s', background: color }),
                item({ animationDelay: '-.250s', background: color }),
                item({ animationDelay: '-.375s', background: color }),
            ],
        });
        return _this;
    }
    return Loading;
}(component_1.default));
exports.default = Loading;
var item = function (style) {
    if (style === void 0) { style = {}; }
    return index_1.default("<span/>", {
        style: __assign({ width: '1em', height: '1em', animation: 'jGalleryLoading .5s linear infinite alternate', display: 'inline-block' }, style),
    });
};
var style = document.createElement('style');
style.innerHTML = "\n    @keyframes jGalleryLoading {\n        0% {\n            transform: scaleX(0);\n            opacity: 1;\n        }\n\n        100% {\n            transform: scaleX(1);\n            opacity: 1;\n        }\n    }\n";
if (typeof document !== 'undefined') {
    document.querySelector('head').appendChild(style);
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Queue = /** @class */ (function () {
    function Queue() {
        var tasks = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tasks[_i] = arguments[_i];
        }
        this.tasks = tasks.slice();
        this.run = this.run.bind(this);
    }
    Queue.prototype.run = function () {
        var task = this.tasks.shift();
        if (task) {
            this.currentProcess = task();
            this.currentProcess.then(this.run);
        }
        else {
            this.currentProcess = null;
        }
    };
    Queue.prototype.cancel = function () {
        this.tasks.length = 0;
        this.currentProcess && this.currentProcess.cancel && this.currentProcess.cancel();
    };
    return Queue;
}());
exports.default = Queue;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (src) {
    return typeof src === 'string' ? loadImg(src) : loadElement(src);
});
var loadImg = function (src) { return new Promise(function (resolve, reject) {
    var img = new Image;
    img.src = src;
    img.onload = function () { return resolve(); };
    img.onerror = reject;
}); };
var loadElement = function (element) { return Promise.all([element, Array.from(element.querySelectorAll('*'))]
    .reduce(function (paths, element) {
    if (element instanceof Image) {
        paths.push(loadImg(element.getAttribute('src')));
    }
    return paths;
}, [])); };


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(11);
if (typeof window !== 'undefined' && !window.JGallery) {
    window.JGallery = index_1.default;
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(0);
var component_1 = __webpack_require__(1);
var index_2 = __webpack_require__(12);
var transition_effect_1 = __webpack_require__(16);
var index_3 = __webpack_require__(7);
var with_albums_menu_1 = __webpack_require__(17);
var with_preview_size_changer_1 = __webpack_require__(19);
var with_browser_history_1 = __webpack_require__(20);
var index_4 = __webpack_require__(21);
var swipe_1 = __webpack_require__(22);
var cancellable_promise_1 = __webpack_require__(5);
var queue_1 = __webpack_require__(8);
var defaults_1 = __webpack_require__(23);
var with_slideshow_1 = __webpack_require__(24);
var with_thumbnails_1 = __webpack_require__(26);
var with_navigation_on_preview_click_1 = __webpack_require__(29);
var id = 1;
var Gallery = /** @class */ (function (_super) {
    __extends(Gallery, _super);
    function Gallery(albums, params) {
        if (params === void 0) { params = {}; }
        var _this = _super.call(this) || this;
        _this.params = params;
        _this.albums = albums;
        _this.album = albums[params.autostartAtAlbum - 1];
        _this.loading = new index_3.default({ color: params.textColor });
        _this.goToItem = _this.goToItem.bind(_this);
        _this.next = _this.next.bind(_this);
        _this.prev = _this.prev.bind(_this);
        var style = document.createElement('style');
        style.innerHTML = "\n            .j-gallery-" + id + " ::-webkit-scrollbar {\n                height: 1em;\n                background: transparent;\n                top: 0;\n                left: 0;\n                right: 0;\n                position: absolute;\n            }\n\n            .j-gallery-" + id + " *::-webkit-scrollbar-thumb {\n                background: " + params.textColor + ";\n            }\n        ";
        if (typeof document !== 'undefined') {
            document.querySelector('head').appendChild(style);
        }
        _this.title = index_1.default('<div class="j-gallery-title"></div>', {
            style: {
                paddingRight: '10px',
                order: '1',
                textAlign: 'right',
                flexGrow: '1',
            }
        });
        _this.controlsElement = index_1.default("<div class=\"j-gallery-controls\"></div>", {
            style: {
                padding: '5px 0',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                zIndex: '1',
            },
            children: [_this.title],
        });
        _this.preview = new index_4.default;
        _this.previewElement = index_1.default("<div class=\"j-gallery-preview-container\"></div>", {
            style: {
                flex: '1',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
            },
            children: [_this.preview.getElement(), _this.controlsElement]
        });
        (new swipe_1.default({
            element: _this.previewElement,
            onSwipeLeft: _this.next,
            onSwipeRight: _this.prev,
        })).activate();
        _this.loading.appendStyle({
            top: '50%',
            left: '50%',
            transform: 'translateX(-50%) translateY(-50%)',
            position: 'absolute',
            zIndex: '1',
        });
        _this.element = index_1.default("\n            <div class=\"j-gallery j-gallery-" + id++ + "\"></div>", {
            children: [
                _this.previewElement,
            ],
            style: {
                height: '100vh',
                padding: '10px',
                background: params.backgroundColor,
                color: params.textColor,
                boxSizing: 'border-box',
                position: 'relative',
                flexDirection: 'column',
                userSelect: 'none',
                display: 'flex',
            },
        });
        window.addEventListener('resize', function () { return _this.refreshTransitionCanvasDimensions(); });
        requestAnimationFrame(function () {
            _this.initialize();
        });
        return _this;
    }
    Gallery.prototype.initialize = function () {
        this.transitionCanvas = new index_2.default({
            width: this.element.clientWidth,
            height: this.element.clientHeight
        });
        Object.assign(this.transitionCanvas.element.style, {
            width: '100%',
            height: '100%',
            top: '0',
            left: '0',
            position: 'absolute',
        });
        this.goToItemByCurrentHash();
    };
    Gallery.create = function (albums, params) {
        if (params === void 0) { params = {}; }
        var decorators = [];
        params = __assign({}, defaults_1.default, params);
        if (params.navigationOnPreviewClick)
            decorators.push(with_navigation_on_preview_click_1.default);
        if (params.browserHistory)
            decorators.push(with_browser_history_1.default);
        if (params.slideShow)
            decorators.push(with_slideshow_1.default);
        if (params.thumbnails)
            decorators.push(with_thumbnails_1.default);
        if (params.canChangePreviewSize)
            decorators.push(with_preview_size_changer_1.default);
        if (albums.length > 1)
            decorators.push(with_albums_menu_1.default);
        return new (compose(decorators, Gallery))(albums, params);
    };
    Gallery.createElement = function (html) {
        return index_1.default(html);
    };
    Gallery.prototype.goToItemByCurrentHash = function () {
        var item = this.findItemByCurrentHash();
        return this.goToAlbum(this.albums.indexOf(this.findAlbumByAlbumItem(item)), item);
    };
    Gallery.prototype.findAlbumByAlbumItem = function (item) {
        return this.albums.find(function (album) { return !!album.items.includes(item); });
    };
    Gallery.prototype.findItemByCurrentHash = function () {
        return this.findItemByHash(location.hash.replace('#', '')) || this.album.items[this.params.autostartAtItem - 1];
    };
    Gallery.prototype.appendControlsElements = function (elements) {
        var _this = this;
        elements.forEach(function (element) {
            Object.assign(element.style, { margin: '0 .25em' });
            _this.controlsElement.appendChild(element);
        });
    };
    Gallery.prototype.getItems = function () {
        return this.albums.reduce(function (items, album) { return items.concat(album.items); }, []);
    };
    Gallery.prototype.findItemByHash = function (hash) {
        return this.getItems().find(function (item) { return item.hash === hash; });
    };
    Gallery.prototype.next = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, album, item, items, next;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this, album = _a.album, item = _a.item;
                        items = album.items;
                        next = items[items.indexOf(item) + 1];
                        if (!next) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.goToItem(next)];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.goToItem(items[0])];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Gallery.prototype.prev = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, album, item, items, prev;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this, album = _a.album, item = _a.item;
                        items = album.items;
                        prev = items[items.indexOf(item) - 1];
                        if (!prev) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.goToItem(prev)];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.goToItem(items[items.length - 1])];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Gallery.prototype.showTransitionCanvas = function () {
        this.previewElement.appendChild(this.transitionCanvas.element);
    };
    Gallery.prototype.hideTransitionCanvas = function () {
        if (this.previewElement.contains(this.transitionCanvas.element)) {
            this.previewElement.removeChild(this.transitionCanvas.element);
        }
    };
    Gallery.prototype.refreshTransitionCanvasDimensions = function () {
        this.transitionCanvas.setDimensions(this.element.clientWidth, this.element.clientHeight);
        this.transitionCanvas.redraw();
    };
    Gallery.prototype.showLoading = function () {
        this.previewElement.appendChild(this.loading.getElement());
    };
    Gallery.prototype.hideLoading = function () {
        if (this.previewElement.contains(this.loading.getElement())) {
            this.previewElement.removeChild(this.loading.getElement());
        }
    };
    Gallery.prototype.goToItem = function (item) {
        var _this = this;
        var options = {
            backgroundColor: this.params.backgroundColor,
            duration: this.params.transitionDuration,
            details: this.params.transitionDetails,
            xAxis: this.params.transitionXAxis,
            yAxis: this.params.transitionYAxis,
            originX: this.params.transitionOriginX,
            originY: this.params.transitionOriginY,
        };
        this.changingItem && this.changingItem.cancel();
        this.changingItem = cancellable_promise_1.default(function (resolve, reject, onCancel) {
            var queue = new queue_1.default(function () {
                _this.showTransitionCanvas();
                _this.params.onChange({ prevItem: _this.item, item: item, album: _this.album });
                return _this.item ? transition_effect_1.default(_this.transitionCanvas, options) : Promise.resolve();
            }, function () {
                _this.showLoading();
                _this.params.itemOnHide({ item: _this.item, album: _this.album });
                return _this.preview.setItem(item);
            }, function () {
                _this.params.itemOnLoad({ item: item, album: _this.album });
                _this.title.innerHTML = item.title || '';
                _this.hideLoading();
                _this.transitionCanvas.clearLayers();
                return transition_effect_1.default(_this.transitionCanvas, __assign({}, options, { reverse: true }));
            }, function () {
                _this.params.itemOnShow({ item: item, album: _this.album });
                _this.transitionCanvas.clearLayers();
                _this.hideTransitionCanvas();
                _this.item = item;
                resolve();
                return Promise.resolve();
            });
            queue.run();
            onCancel(function () {
                queue.cancel();
                _this.transitionCanvas.clearLayers();
                _this.hideTransitionCanvas();
                _this.hideLoading();
            });
        });
        return this.changingItem;
    };
    Gallery.prototype.goToAlbum = function (value, item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.album = this.albums[value];
                return [2 /*return*/, this.goToItem(item || this.album.items[0])];
            });
        });
    };
    return Gallery;
}(component_1.default));
exports.Gallery = Gallery;
var compose = function (decorators, constructor) {
    return decorators.reduce(function (constructor, decorator) { return decorator(constructor); }, constructor);
};
exports.default = Gallery;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(0);
var animations_1 = __webpack_require__(13);
var layer_1 = __webpack_require__(2);
var path_1 = __webpack_require__(14);
var circle_1 = __webpack_require__(15);
var Canvas = /** @class */ (function (_super) {
    __extends(Canvas, _super);
    function Canvas(_a) {
        var width = _a.width, height = _a.height;
        var _this = _super.call(this, {}) || this;
        _this.layers = [];
        _this.animations = new animations_1.default({
            onChange: function () {
                _this.clear();
                _this.draw();
            }
        });
        _this.translateX = 0;
        _this.translateY = 0;
        _this.element = index_1.default('<canvas></canvas>');
        _this.element.width = width;
        _this.element.height = height;
        _this.ctx = _this.element.getContext("2d");
        return _this;
    }
    Canvas.prototype.setDimensions = function (width, height) {
        var element = this.element;
        var widthRatio = width / element.width;
        var heightRatio = height / element.height;
        element.width = width;
        element.height = height;
        this.getLayersRecursive().forEach(function (layer) {
            layer.width *= widthRatio;
            layer.height *= heightRatio;
        });
    };
    Canvas.prototype.containsLayer = function (layer) {
        return this.layers.indexOf(layer) > -1;
    };
    Canvas.prototype.addAnimations = function (animations) {
        this.animations.add(animations);
    };
    Canvas.prototype.addLayers = function (layers) {
        var _this = this;
        layers.forEach(function (layer) {
            if (!_this.containsLayer(layer)) {
                _this.layers.push(layer);
            }
        });
    };
    Canvas.prototype.removeLayers = function (layers) {
        var _this = this;
        layers.forEach(function (layer) {
            if (_this.containsLayer(layer)) {
                _this.layers.splice(_this.layers.indexOf(layer), 1);
            }
        });
    };
    Canvas.prototype.clearLayers = function () {
        this.layers.length = 0;
    };
    Canvas.prototype.redraw = function () {
        this.clear();
        this.draw();
    };
    Canvas.prototype.getLayersRecursive = function () {
        return getLayersRecursive(this);
    };
    Canvas.prototype.applyPathMask = function (path) {
        if (path === void 0) { path = new path_1.default([]); }
        var ctx = this.ctx;
        var points = path.points;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        points.slice(1).forEach(function (point) { return ctx.lineTo(point.x, point.y); });
        ctx.closePath();
        ctx.clip();
    };
    Canvas.prototype.applyCircleMask = function (_a) {
        var _b = _a.circle, circle = _b === void 0 ? new circle_1.default({}) : _b, _c = _a.translateX, translateX = _c === void 0 ? 0 : _c, _d = _a.translateY, translateY = _d === void 0 ? 0 : _d;
        var ctx = this.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(translateX + circle.translateX, translateY + circle.translateY);
        ctx.arc(translateX + circle.translateX, translateY + circle.translateY, circle.radius, circle.startAngle, circle.endAngle);
        ctx.closePath();
        ctx.clip();
    };
    Canvas.prototype.drawPath = function (_a) {
        var _b = _a.path, path = _b === void 0 ? new path_1.default([]) : _b, _c = _a.translateX, translateX = _c === void 0 ? 0 : _c, _d = _a.translateY, translateY = _d === void 0 ? 0 : _d;
        var ctx = this.ctx;
        var points = path.points;
        ctx.fillStyle = path.fillStyle;
        ctx.beginPath();
        ctx.moveTo(points[0].x + translateX, points[0].y + translateY);
        points.slice(1).forEach(function (point) { return ctx.lineTo(point.x + translateX, point.y + translateY); });
        ctx.closePath();
        ctx.fill();
    };
    Canvas.prototype.draw = function () {
        this.drawLayer({ layer: this });
    };
    Canvas.prototype.drawLayer = function (_a) {
        var _this = this;
        var _b = _a.layer, layer = _b === void 0 ? new layer_1.default({}) : _b, _c = _a.translateX, translateX = _c === void 0 ? 0 : _c, _d = _a.translateY, translateY = _d === void 0 ? 0 : _d;
        var ctx = this.ctx;
        translateX += layer.translateX + layer.centerX * layer.width;
        translateY += layer.translateY + layer.centerY * layer.height;
        ctx.globalAlpha = layer.alpha;
        if (layer.mask instanceof path_1.default) {
            this.applyPathMask(layer.mask);
        }
        else if (layer.mask instanceof circle_1.default) {
            this.applyCircleMask({ circle: layer.mask, translateX: translateX, translateY: translateY });
        }
        if (layer instanceof path_1.default) {
            this.drawPath({ path: layer, translateX: translateX, translateY: translateY });
        }
        else if (layer.fillStyle) {
            ctx.fillStyle = layer.fillStyle;
            ctx.fillRect(translateX, translateY, layer.width, layer.height);
        }
        if (layer.mask) {
            ctx.restore();
        }
        layer.layers.forEach(function (layer) { return _this.drawLayer({ layer: layer, translateX: translateX, translateY: translateY }); });
    };
    Canvas.prototype.clear = function () {
        this.ctx.clearRect(0, 0, innerWidth, innerHeight);
    };
    return Canvas;
}(layer_1.default));
var getLayersRecursive = function (layer) {
    return layer.layers.concat(layer.layers.reduce(function (layers, layer) {
        return layers.concat(getLayersRecursive(layer));
    }, []));
};
exports.default = Canvas;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Animations = /** @class */ (function () {
    function Animations(_a) {
        var onChange = _a.onChange;
        this.items = [];
        this.onChange = onChange;
        this.goToNextFrames = this.goToNextFrames.bind(this);
    }
    Animations.prototype.play = function () {
        if (!this.rendering) {
            this.goToNextFrames();
        }
    };
    Animations.prototype.add = function (animations) {
        var _a;
        (_a = this.items).push.apply(_a, animations);
        this.play();
    };
    Animations.prototype.remove = function (animation) {
        var items = this.items;
        var index = items.indexOf(animation);
        if (index > -1) {
            items.splice(index, 1);
        }
    };
    Animations.prototype.count = function () {
        return this.items.length;
    };
    Animations.prototype.cancelAll = function () {
        this.items.forEach(function (animation) { return animation.cancel(); });
    };
    Animations.prototype.clear = function () {
        this.items.length = 0;
    };
    Animations.prototype.goToNextFrames = function () {
        this.rendering = true;
        this.items.forEach(function (animation) { return animation.goToNextFrame(); });
        this.onChange();
        this.removeCompleted();
        if (this.count()) {
            requestAnimationFrame(this.goToNextFrames);
        }
        else {
            this.rendering = false;
        }
    };
    Animations.prototype.getCompleted = function () {
        return this.items.filter(function (animation) { return animation.completed; });
    };
    Animations.prototype.removeCompleted = function () {
        var _this = this;
        this.getCompleted().forEach(function (animation) { return _this.remove(animation); });
    };
    return Animations;
}());
exports.default = Animations;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var layer_1 = __webpack_require__(2);
var Path = /** @class */ (function (_super) {
    __extends(Path, _super);
    function Path(points) {
        var _this = _super.call(this, {}) || this;
        _this.points = points;
        return _this;
    }
    Path.prototype.clone = function () {
        return new Path(this.points.map(function (point) { return point.clone(); }));
    };
    Path.prototype.move = function (vector) {
        this.points.forEach(function (point) { return point.move(vector); });
    };
    return Path;
}(layer_1.default));
exports.default = Path;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var layer_1 = __webpack_require__(2);
var PI = Math.PI;
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(_a) {
        var _b = _a.translateX, translateX = _b === void 0 ? 0 : _b, _c = _a.translateY, translateY = _c === void 0 ? 0 : _c, _d = _a.radius, radius = _d === void 0 ? 0 : _d, _e = _a.startAngle, startAngle = _e === void 0 ? 0 : _e, _f = _a.endAngle, endAngle = _f === void 0 ? 2 * PI : _f;
        var _this = _super.call(this, { translateX: translateX, translateY: translateY }) || this;
        _this.radius = radius;
        _this.startAngle = startAngle;
        _this.endAngle = endAngle;
        return _this;
    }
    return Circle;
}(layer_1.default));
exports.default = Circle;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var animation_1 = __webpack_require__(4);
var layer_1 = __webpack_require__(2);
var cancellable_promise_1 = __webpack_require__(5);
var defaults = {
    reverse: false,
    backgroundColor: '#000',
    duration: 500,
    details: 1,
    originX: .5,
    originY: .5,
    xAxis: true,
    yAxis: true,
};
var transitionEffect = function (canvas, params) {
    if (params === void 0) { params = {}; }
    params = __assign({}, defaults, params);
    var sliceSize = 20 * (1 / params.details);
    var sliceSizeX = params.xAxis ? sliceSize : canvas.element.width;
    var sliceSizeY = params.yAxis ? sliceSize : canvas.element.height;
    return cancellable_promise_1.default(function (resolve, reject, onCancel) {
        var layers = [];
        var animation = new animation_1.default({
            initialValue: +params.reverse,
            finalValue: 1 - +params.reverse,
            duration: params.duration,
            onChange: function (value) {
                var _a = canvas.element, width = _a.width, height = _a.height;
                value *= sliceSize;
                params.xAxis && layers.forEach(function (layer) {
                    layer.width = value + Math.abs(layer.translateX - width * params.originX) / width * value;
                });
                params.yAxis && layers.forEach(function (layer) {
                    layer.height = value + Math.abs(layer.translateY - height * params.originY) / height * value;
                });
            },
            onComplete: function () {
                resolve();
            }
        });
        for (var x = 0; x < canvas.element.width; x += sliceSizeX) {
            for (var y = 0; y < canvas.element.height; y += sliceSizeY) {
                layers.push(new layer_1.default({
                    translateX: x + (sliceSizeX >> 1),
                    centerX: -.5,
                    height: canvas.element.height,
                    translateY: y + (sliceSizeY >> 1),
                    centerY: -.5,
                    width: canvas.element.width,
                    fillStyle: params.backgroundColor,
                }));
            }
        }
        canvas.addLayers(layers);
        canvas.addAnimations([animation]);
        onCancel(function () { return animation.cancel(); });
    });
};
exports.default = transitionEffect;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(18);
var with_tooltip_1 = __webpack_require__(3);
var create_element_1 = __webpack_require__(0);
var withAlbumsMenu = function (constructor) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1(albums, params) {
            var _this = _super.call(this, albums, params) || this;
            var container = create_element_1.default('<span class="j-gallery-albums-drop-down"/>');
            _this.dropdown = new index_1.default({
                items: _this.albums.map(function (album) { return album.title; }),
                textColor: params.textColor,
                backgroundColor: params.backgroundColor,
                onChange: function (value) {
                    _this.goToAlbum(value);
                }
            });
            container.appendChild(_this.dropdown.getElement());
            with_tooltip_1.default(container, {
                style: {
                    color: params.backgroundColor,
                    background: params.textColor,
                },
                content: params.tooltipSeeOtherAlbums,
            });
            _this.appendControlsElements([container]);
            return _this;
        }
        class_1.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this.dropdown.setActive(this.albums.indexOf(this.album));
        };
        return class_1;
    }(constructor));
};
exports.default = withAlbumsMenu;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(0);
var component_1 = __webpack_require__(1);
var Dropdown = /** @class */ (function (_super) {
    __extends(Dropdown, _super);
    function Dropdown(_a) {
        var items = _a.items, backgroundColor = _a.backgroundColor, textColor = _a.textColor, _b = _a.onChange, onChange = _b === void 0 ? function () { } : _b;
        var _this = _super.call(this) || this;
        _this.element = index_1.default("<select class=\"j-gallery-drop-down\" style=\"padding: 10px; background: " + backgroundColor + "; font-size: 1em; color: " + textColor + "; border: 0; outline: none; vertical-align: middle;\"></select>");
        _this.options = items.map(function (item, i) {
            var htmlElement = index_1.default("<option value=\"" + i + "\">" + item + "</option>");
            _this.element.appendChild(htmlElement);
            return htmlElement;
        });
        _this.element.addEventListener('change', function () {
            onChange(+_this.element.value);
        });
        return _this;
    }
    Dropdown.prototype.setActive = function (index) {
        var option = this.options[index];
        if (option) {
            option.setAttribute('selected', 'true');
        }
    };
    return Dropdown;
}(component_1.default));
exports.default = Dropdown;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var icons_1 = __webpack_require__(6);
var with_tooltip_1 = __webpack_require__(3);
var withPreviewSizeChanger = function (constructor) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1(albums, params) {
            var _this = _super.call(this, albums, params) || this;
            _this.changePreviewSizeIcon = with_tooltip_1.default(icons_1.iconScreen({ color: params.textColor }), {
                style: {
                    color: params.backgroundColor,
                    background: params.textColor,
                    transform: 'translateY(-8px)',
                },
                content: params.tooltipChangeSize,
            });
            _this.changePreviewSizeIcon.addEventListener('click', function () { return _this.changePreviewSize(); });
            _this.appendControlsElements([_this.changePreviewSizeIcon]);
            return _this;
        }
        class_1.prototype.goToItem = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var _a, result;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, (_a = _super.prototype.goToItem).call.apply(_a, [this].concat(args))];
                        case 1:
                            result = _b.sent();
                            this.changePreviewSizeIcon.style.display = this.preview.hasImage ? 'inline-flex' : 'none';
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        class_1.prototype.changePreviewSize = function () {
            var preview = this.preview;
            switch (preview.size) {
                case 'cover':
                    preview.setSize('contain');
                    break;
                default:
                    preview.setSize('cover');
            }
        };
        return class_1;
    }(constructor));
};
exports.default = withPreviewSizeChanger;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var withBrowserHistory = function (constructor) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1(albums, params) {
            var _this = _super.call(this, albums, params) || this;
            var goToItem = _this.goToItem.bind(_this);
            var onhashchange = window.onhashchange || (function () { });
            window.onhashchange = function (event) {
                onhashchange(event);
                goToItem(_this.findItemByCurrentHash());
            };
            return _this;
        }
        class_1.prototype.initialize = function () {
            var _this = this;
            _super.prototype.initialize.call(this);
            var goToItem = this.goToItem.bind(this);
            this.goToItem = function (item) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    history.pushState({ jgallery: true }, '', "#" + item.hash);
                    return [2 /*return*/, goToItem(item)];
                });
            }); };
        };
        return class_1;
    }(constructor));
};
exports.default = withBrowserHistory;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(0);
var cancellable_promise_1 = __webpack_require__(5);
var queue_1 = __webpack_require__(8);
var index_2 = __webpack_require__(9);
var component_1 = __webpack_require__(1);
var Preview = /** @class */ (function (_super) {
    __extends(Preview, _super);
    function Preview() {
        var _this = _super.call(this) || this;
        _this.size = 'cover';
        _this.element = index_1.default("<div class=\"j-gallery-preview\"/>", {
            style: {
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                display: 'flex',
                flex: '1',
            }
        });
        return _this;
    }
    Preview.prototype.setItem = function (item) {
        var _this = this;
        var element = this.element;
        var content = index_1.default(item.element ?
            item.element.outerHTML :
            "<div class=\"j-gallery-preview-content\" style=\"\n                height: 100%;\n                background: center center url(" + item.url + ") no-repeat;\n                background-size: " + this.size + ";\n                flex: 1;\n            \"/>");
        this.hasImage = !item.element;
        this.item = item;
        element.innerHTML = '';
        return cancellable_promise_1.default(function (resolve, reject, onCancel) {
            var queue = new queue_1.default(function () { return index_2.default(_this.hasImage ? item.url : content); }, function () {
                element.appendChild(content);
                resolve();
                return Promise.resolve();
            });
            queue.run();
            onCancel(function () { return queue.cancel(); });
        });
    };
    Preview.prototype.setSize = function (size) {
        this.size = size;
        if (this.hasImage) {
            this.element.firstChild.style.backgroundSize = this.size;
        }
    };
    return Preview;
}(component_1.default));
exports.default = Preview;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var touchSupport = 'ontouchstart' in window || navigator.msMaxTouchPoints;
var Swipe = /** @class */ (function () {
    function Swipe(_a) {
        var element = _a.element, onSwipeRight = _a.onSwipeRight, onSwipeLeft = _a.onSwipeLeft;
        this.element = element;
        this.onSwipeLeft = onSwipeLeft;
        this.onSwipeRight = onSwipeRight;
        this.startPoint = {
            x: 0,
            y: 0
        };
        this.onTouchMove = this.onTouchMove.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
    }
    Swipe.prototype.activate = function () {
        this.element.addEventListener(touchSupport ? 'touchstart' : 'mousedown', touchSupport ? this.onTouchStart : this.onMouseDown);
    };
    Swipe.prototype.deactivate = function () {
        this.element.removeEventListener(touchSupport ? 'touchstart' : 'mousedown', touchSupport ? this.onTouchStart : this.onMouseDown);
    };
    Swipe.prototype.onTouchStart = function (event) {
        var touch = event.touches[0];
        this.start({ x: touch.pageX, y: touch.pageY });
    };
    Swipe.prototype.onMouseDown = function (event) {
        this.start({ x: event.pageX, y: event.pageY });
    };
    Swipe.prototype.start = function (point) {
        this.startPoint = point;
        this.element.addEventListener(touchSupport ? 'touchmove' : 'mousemove', touchSupport ? this.onTouchMove : this.onMouseMove);
        this.element.addEventListener(touchSupport ? 'touchend' : 'mouseup', this.end.bind(this));
    };
    Swipe.prototype.onTouchMove = function (event) {
        var touch = event.touches[0];
        this.swipe({ x: touch.pageX, y: touch.pageY });
    };
    Swipe.prototype.onMouseMove = function (event) {
        this.swipe({ x: event.pageX, y: event.pageY });
    };
    Swipe.prototype.swipe = function (point) {
        if (this.startPoint.x + 100 < point.x) {
            this.onSwipeRight();
            this.end();
        }
        else if (point.x < this.startPoint.x - 100) {
            this.onSwipeLeft();
            this.end();
        }
    };
    Swipe.prototype.end = function () {
        this.element.removeEventListener(touchSupport ? 'touchmove' : 'mousemove', touchSupport ? this.onTouchMove : this.onMouseMove);
    };
    return Swipe;
}());
exports.default = Swipe;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var defaults = {
    autostartAtAlbum: 1,
    autostartAtItem: 1,
    backgroundColor: '#000',
    browserHistory: true,
    canChangePreviewSize: true,
    canMinimalizeThumbnails: true,
    itemOnHide: function () { },
    itemOnLoad: function () { },
    itemOnShow: function () { },
    navigationOnPreviewClick: true,
    onChange: function () { },
    slideShow: true,
    slideShowAutoStart: false,
    slideShowInterval: 4000,
    textColor: '#fff',
    thumbnailHeight: '64px',
    thumbnailHeightOnFullScreen: '128px',
    thumbnailWidth: '64px',
    thumbnailWidthOnFullScreen: '128px',
    thumbnails: true,
    thumbnailsFullScreen: true,
    thumbnailsPosition: 'bottom',
    thumbnailsVisible: true,
    tooltipChangeSize: 'Change size',
    tooltipSeeAllItems: 'See all items',
    tooltipSeeOtherAlbums: 'See other albums',
    tooltipSlideShowPause: 'Pause slide show',
    tooltipSlideShowStart: 'Start slide show',
    tooltipThumbnailsToggle: 'Toogle whumbnails',
    transitionDetails: 1,
    transitionDuration: 500,
    transitionOriginX: .5,
    transitionOriginY: .5,
    transitionXAxis: true,
    transitionYAxis: false,
};
exports.default = defaults;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(0);
var progress_bar_1 = __webpack_require__(25);
var icons_1 = __webpack_require__(6);
var with_tooltip_1 = __webpack_require__(3);
var withSlideShow = function (constructor) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1(albums, params) {
            var _this = _super.call(this, albums, params) || this;
            _this.slideShowRunning = false;
            _this.playSlideShowIcon = with_tooltip_1.default(icons_1.iconPlay({ color: params.textColor }), {
                style: {
                    color: params.backgroundColor,
                    background: params.textColor,
                    transform: 'translateY(-8px)',
                },
                content: params.tooltipSlideShowStart,
            });
            _this.playSlideShowIcon.addEventListener('click', function () { return _this.playSlideShow(); });
            _this.pauseSlideShowIcon = with_tooltip_1.default(icons_1.iconPause({ color: params.textColor }), {
                style: {
                    color: params.backgroundColor,
                    background: params.textColor,
                    transform: 'translateY(-8px)',
                },
                content: params.tooltipSlideShowPause,
            });
            _this.pauseSlideShowIcon.addEventListener('click', function () { return _this.pauseSlideShow(); });
            _this.progressBar = new progress_bar_1.default({
                duration: params.slideShowInterval,
                color: params.textColor,
                onEnd: function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.progressBar.pause();
                                this.progressBar.setValue(0);
                                return [4 /*yield*/, this.next()];
                            case 1:
                                _a.sent();
                                this.progressBar.reset();
                                if (this.slideShowRunning) {
                                    this.progressBar.start();
                                }
                                return [2 /*return*/];
                        }
                    });
                }); },
                style: {
                    position: 'absolute',
                    top: '2px',
                    left: '0',
                    right: '0',
                },
            });
            [_this.left, _this.right].forEach(function (element) { return element && element.addEventListener('click', function () { return _this.stopSlideShow(); }); });
            _this.slideShowIcons = index_1.default('<span class="j-gallery-slide-show-icon"/>', {
                children: [_this.playSlideShowIcon]
            });
            _this.appendControlsElements([
                _this.slideShowIcons,
                _this.progressBar.getElement(),
            ]);
            _this.progressBar.getElement().style.padding = '0';
            return _this;
        }
        class_1.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            if (this.params.slideShowAutoStart) {
                this.playSlideShow();
            }
        };
        class_1.prototype.playSlideShow = function () {
            if (!this.slideShowRunning) {
                this.slideShowIcons.replaceChild(this.pauseSlideShowIcon, this.playSlideShowIcon);
                this.progressBar.start();
                this.slideShowRunning = true;
            }
        };
        class_1.prototype.pauseSlideShow = function () {
            if (this.slideShowRunning) {
                this.slideShowIcons.replaceChild(this.playSlideShowIcon, this.pauseSlideShowIcon);
                this.progressBar.pause();
                this.slideShowRunning = false;
            }
        };
        class_1.prototype.goToAlbum = function (arg) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.stopSlideShow();
                    return [2 /*return*/, _super.prototype.goToAlbum.apply(this, [arg].concat(args))];
                });
            });
        };
        class_1.prototype.stopSlideShow = function () {
            this.pauseSlideShow();
            this.progressBar.reset();
        };
        return class_1;
    }(constructor));
};
exports.default = withSlideShow;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(0);
var component_1 = __webpack_require__(1);
var animation_1 = __webpack_require__(4);
var ProgressBar = /** @class */ (function (_super) {
    __extends(ProgressBar, _super);
    function ProgressBar(_a) {
        var duration = _a.duration, onEnd = _a.onEnd, color = _a.color, _b = _a.style, style = _b === void 0 ? {} : _b;
        var _this = _super.call(this) || this;
        _this.duration = duration;
        _this.onEnd = onEnd;
        _this.element = index_1.default("\n            <div class=\"j-gallery-progress-bar\"></div>\n        ");
        _this.appendStyle(__assign({ height: '1px', background: color }, style));
        _this.animation = new animation_1.default({
            initialValue: _this.value,
            finalValue: 1,
            duration: _this.duration,
            easingFunction: function (x) { return x; },
            onChange: function (value) { return _this.setValue(value); },
            onComplete: _this.onEnd,
        });
        _this.setValue(0);
        return _this;
    }
    ProgressBar.prototype.start = function () {
        this.animation.start();
    };
    ProgressBar.prototype.pause = function () {
        this.animation.pause();
    };
    ProgressBar.prototype.reset = function () {
        this.animation.reset();
        this.setValue(0);
    };
    ProgressBar.prototype.setValue = function (value) {
        this.appendStyle({
            width: value * 100 + "%",
        });
        this.animation.setValue(value);
        this.value = value;
    };
    return ProgressBar;
}(component_1.default));
exports.default = ProgressBar;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(27);
var icons_1 = __webpack_require__(6);
var with_tooltip_1 = __webpack_require__(3);
var withThumbnails = function (constructor) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1(albums, params) {
            var _this = _super.call(this, albums, params) || this;
            _this.thumbnailsVisible = true;
            _this.thumbnails = new index_1.default({
                thumbnailWidth: params.thumbnailWidth,
                thumbnailHeight: params.thumbnailHeight,
                textColor: params.textColor,
                thumbOnClick: function (item) {
                    if (_this.stopSlideShow) {
                        _this.stopSlideShow();
                    }
                    if (_this.fullScreenThumbnails) {
                        _this.disableFullScreenThumbnails();
                    }
                    _this.goToItem(item);
                }
            });
            _this.thumbnails.appendStyle({
                position: 'relative',
                paddingLeft: _this.params.thumbnailsPosition === 'right' ? '10px' : '0',
                paddingRight: _this.params.thumbnailsPosition === 'left' ? '10px' : '0',
            });
            _this.thumbnails.setAlbum(_this.album);
            _this.toggleThumbnailsIcon = with_tooltip_1.default(icons_1.iconEllipsisHorizontal({ color: params.textColor }), {
                style: {
                    color: params.backgroundColor,
                    background: params.textColor,
                    transform: 'translateY(-8px)',
                },
                content: params.tooltipThumbnailsToggle,
            });
            _this.toggleThumbnailsIcon.addEventListener('click', function () { return _this.toggleThumbnails(); });
            _this.toggleFullScreenThumbnailsIcon = with_tooltip_1.default(icons_1.iconGrid({ color: params.textColor }), {
                style: {
                    color: params.backgroundColor,
                    background: params.textColor,
                    transform: 'translateY(-4px)',
                },
                content: params.tooltipSeeAllItems,
            });
            _this.toggleFullScreenThumbnailsIcon.addEventListener('click', function () { return _this.toggleFullScreenThumbnails(); });
            if (_this.params.thumbnailsFullScreen) {
                _this.appendControlsElements([_this.toggleFullScreenThumbnailsIcon]);
            }
            if (_this.params.canMinimalizeThumbnails) {
                _this.appendControlsElements([
                    _this.toggleThumbnailsIcon,
                ]);
            }
            return _this;
        }
        class_1.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            if (this.params.thumbnailsVisible) {
                this.showThumbnails();
            }
            if (['left', 'right'].includes(this.params.thumbnailsPosition)) {
                this.element.style.flexDirection = 'row';
                this.thumbnails.setContentStyle({
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                });
            }
        };
        class_1.prototype.goToItem = function (item) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.thumbnails.setActive(this.album.items.indexOf(item));
                    return [2 /*return*/, _super.prototype.goToItem.call(this, item)];
                });
            });
        };
        class_1.prototype.goToAlbum = function (value) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.thumbnails.setAlbum(this.albums[value]);
                    return [2 /*return*/, _super.prototype.goToAlbum.apply(this, [value].concat(args))];
                });
            });
        };
        class_1.prototype.disableFullScreenThumbnails = function () {
            this.fullScreenThumbnails = false;
            this.thumbnails.setThumbnailSize({
                width: this.params.thumbnailWidth,
                height: this.params.thumbnailHeight,
            });
            this.previewElement.style.display = 'flex';
            if (['left', 'right'].includes(this.params.thumbnailsPosition)) {
                this.thumbnails.setContentStyle({
                    flexDirection: ['left', 'right'].includes(this.params.thumbnailsPosition) ? 'column' : 'row',
                });
                this.thumbnails.getElement().style.flexBasis = 'auto';
            }
            this.thumbnails.disableWrap();
        };
        class_1.prototype.toggleFullScreenThumbnails = function () {
            this.fullScreenThumbnails ? this.disableFullScreenThumbnails() : this.enableFullScreenThumbnails();
        };
        class_1.prototype.enableFullScreenThumbnails = function () {
            if (this.stopSlideShow) {
                this.stopSlideShow();
            }
            this.fullScreenThumbnails = true;
            this.thumbnails.setThumbnailSize({
                width: this.params.thumbnailWidthOnFullScreen,
                height: this.params.thumbnailHeightOnFullScreen,
            });
            this.previewElement.style.display = 'none';
            if (['left', 'right'].includes(this.params.thumbnailsPosition)) {
                this.thumbnails.getElement().style.flexBasis = '100%';
                this.thumbnails.setContentStyle({
                    flexDirection: 'row',
                });
            }
            this.showThumbnails();
            this.thumbnails.enableWrap();
        };
        class_1.prototype.hideThumbnails = function () {
            this.thumbnailsVisible = false;
            this.element.removeChild(this.thumbnails.getElement());
            this.disableFullScreenThumbnails();
        };
        class_1.prototype.toggleThumbnails = function () {
            this.thumbnailsVisible ? this.hideThumbnails() : this.showThumbnails();
        };
        class_1.prototype.showThumbnails = function () {
            this.thumbnailsVisible = true;
            switch (this.params.thumbnailsPosition) {
                case 'top':
                case 'left':
                    this.element.insertBefore(this.thumbnails.getElement(), this.element.firstChild);
                    break;
                default:
                    this.element.appendChild(this.thumbnails.getElement());
            }
            this.thumbnails.scrollToActiveItem();
        };
        return class_1;
    }(constructor));
};
exports.default = withThumbnails;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(0);
var component_1 = __webpack_require__(1);
var animation_1 = __webpack_require__(4);
var index_2 = __webpack_require__(28);
var Thumbnails = /** @class */ (function (_super) {
    __extends(Thumbnails, _super);
    function Thumbnails(_a) {
        var _b = _a.thumbOnClick, thumbOnClick = _b === void 0 ? function () { } : _b, textColor = _a.textColor, thumbnailWidth = _a.thumbnailWidth, thumbnailHeight = _a.thumbnailHeight;
        var _this = _super.call(this) || this;
        _this.textColor = textColor;
        _this.thumbnailWidth = thumbnailWidth;
        _this.thumbnailHeight = thumbnailHeight;
        _this.scrollAnimations = [];
        _this.element = index_1.default('<div class="j-gallery-thumbnails"></div>', {
            style: {
                display: 'flex',
                overflow: 'auto',
            }
        });
        _this.content = index_1.default('<div class="j-gallery-thumbnails-content"></div>', {
            style: {
                margin: '0 auto',
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
            }
        });
        _this.element.appendChild(_this.content);
        _this.thumbOnClick = thumbOnClick;
        return _this;
    }
    Thumbnails.prototype.setAlbum = function (album) {
        var _this = this;
        this.album = album;
        this.items = album.items.map(function (item) { return new index_2.default({
            item: item,
            textColor: _this.textColor,
            width: _this.thumbnailWidth,
            height: _this.thumbnailHeight,
            onClick: function (item) { return _this.thumbOnClick(item); },
        }); });
        this.content.innerHTML = '';
        this.items.forEach(function (item) {
            _this.content.appendChild(item.getElement());
        });
    };
    Thumbnails.prototype.setActive = function (index) {
        this.item && this.item.appendStyle({ border: 'none' });
        this.item = this.items[index];
        this.item.appendStyle({ border: "2px solid " + this.textColor });
        this.scrollToActiveItem();
    };
    Thumbnails.prototype.setThumbnailSize = function (_a) {
        var width = _a.width, height = _a.height;
        this.items.forEach(function (thumbnail) { return thumbnail.setSize({ width: width, height: height }); });
    };
    Thumbnails.prototype.enableWrap = function () {
        this.content.style.flexWrap = 'wrap';
        this.scrollToActiveItem();
    };
    Thumbnails.prototype.disableWrap = function () {
        this.content.style.flexWrap = 'initial';
        this.scrollToActiveItem();
    };
    Thumbnails.prototype.setContentStyle = function (style) {
        Object.assign(this.content.style, style);
    };
    Thumbnails.prototype.scrollToActiveItem = function () {
        var _this = this;
        var element = this.item.getElement();
        this.scrollAnimations.forEach(function (animation) { return animation.cancel(); });
        this.scrollAnimations = [
            new animation_1.default({
                initialValue: this.element.scrollLeft,
                finalValue: element.offsetLeft + element.clientWidth / 2 - this.element.clientWidth / 2,
                onChange: function (value) { return _this.element.scrollLeft = value; },
            }),
            new animation_1.default({
                initialValue: this.element.scrollTop,
                finalValue: element.offsetTop + element.clientHeight / 2 - this.element.clientHeight / 2,
                onChange: function (value) { return _this.element.scrollTop = value; },
            }),
        ];
        this.scrollAnimations.forEach(function (animation) { return animation.start(); });
    };
    return Thumbnails;
}(component_1.default));
exports.default = Thumbnails;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = __webpack_require__(1);
var index_1 = __webpack_require__(7);
var index_2 = __webpack_require__(0);
var index_3 = __webpack_require__(9);
var Thumbnail = /** @class */ (function (_super) {
    __extends(Thumbnail, _super);
    function Thumbnail(_a) {
        var item = _a.item, onClick = _a.onClick, textColor = _a.textColor, width = _a.width, height = _a.height;
        var _this = _super.call(this) || this;
        var content = index_2.default(item.thumbElement ?
            item.thumbElement.outerHTML :
            "<img draggable=\"false\" src=\"" + item.thumbUrl + "\"/>");
        _this.element = index_2.default("<span class=\"j-gallery-thumbnail\"></span>", {
            style: {
                width: width,
                height: height,
                marginRight: '5px',
                marginBottom: '5px',
                color: textColor,
                overflow: 'hidden',
                cursor: 'pointer',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'inline-flex',
                boxSizing: 'border-box',
                flex: "0 0 " + width,
                position: 'relative',
            }
        });
        _this.element.appendChild((new index_1.default({ style: { fontSize: '.5em' }, color: textColor })).getElement());
        _this.element.addEventListener('click', function () { return onClick(item); });
        index_3.default(content).then(function () {
            _this.element.innerHTML = '';
            _this.element.appendChild(content);
        });
        return _this;
    }
    Thumbnail.prototype.setSize = function (_a) {
        var width = _a.width, height = _a.height;
        Object.assign(this.element.style, {
            width: width,
            height: height,
            flexBasis: width,
        });
    };
    return Thumbnail;
}(component_1.default));
exports.default = Thumbnail;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var create_element_1 = __webpack_require__(0);
var withNavigationOnPreviewClick = function (constructor) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1(albums, params) {
            var _this = _super.call(this, albums, params) || this;
            _this.left = create_element_1.default("\n                <div class=\"j-gallery-left\" style=\"left: 0; width: 50%; top: 0; bottom: 0; position: absolute; cursor: pointer;\"></div>\n            ");
            _this.left.addEventListener('click', function () {
                _this.prev();
            });
            _this.right = create_element_1.default("\n                <div class=\"j-gallery-right\" style=\"right: 0; width: 50%; top: 0; bottom: 0; position: absolute; cursor: pointer;\"></div>\n            ");
            _this.right.addEventListener('click', function () {
                _this.next();
            });
            _this.previewElement.appendChild(_this.left);
            _this.previewElement.appendChild(_this.right);
            return _this;
        }
        return class_1;
    }(constructor));
};
exports.default = withNavigationOnPreviewClick;


/***/ })
/******/ ]);