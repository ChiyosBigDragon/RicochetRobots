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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Client.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Client.ts":
/*!***********************!*\
  !*** ./src/Client.ts ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _DrawCamel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DrawCamel */ \"./src/DrawCamel.ts\");\n/* harmony import */ var _DrawGrid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DrawGrid */ \"./src/DrawGrid.ts\");\n/* harmony import */ var _DrawDice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DrawDice */ \"./src/DrawDice.ts\");\n/* harmony import */ var _DrawAnnounce__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DrawAnnounce */ \"./src/DrawAnnounce.ts\");\n/* harmony import */ var _DrawPlayer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DrawPlayer */ \"./src/DrawPlayer.ts\");\n/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! firebase */ \"firebase\");\n/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(firebase__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\nconst db = firebase__WEBPACK_IMPORTED_MODULE_5__[\"database\"]();\nconst PATH = 'CamelUp/';\n// default\nconst CAMEL_COLOR = ['#00569b', '#39b20d', '#f56300', '#ffffff', '#ffd302'];\n// Blue Set\n// const CAMEL_COLOR = ['#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4'];\nconst Camel = new _DrawCamel__WEBPACK_IMPORTED_MODULE_0__[\"default\"](5, CAMEL_COLOR, 60, './src/images/camel.png', 'camel');\nconst Dice = new _DrawDice__WEBPACK_IMPORTED_MODULE_2__[\"default\"](5, CAMEL_COLOR, 60, 'dice');\nconst Grid = new _DrawGrid__WEBPACK_IMPORTED_MODULE_1__[\"default\"](16, Camel.CAMEL_GROUND, 30, 'grid');\nconst Announce = new _DrawAnnounce__WEBPACK_IMPORTED_MODULE_3__[\"default\"]('announce');\nconst Player = new _DrawPlayer__WEBPACK_IMPORTED_MODULE_4__[\"default\"]('player');\ndb.ref(PATH + 'camel').on('value', (res) => {\n    Camel.draw(res.val());\n});\ndb.ref(PATH + 'dice').on('value', (res) => {\n    Dice.draw(res.val());\n});\ndb.ref(PATH + 'grid').on('value', (res) => {\n    Grid.GROUND = Camel.CAMEL_GROUND;\n    Grid.draw(res.val());\n});\ndb.ref(PATH + 'announce').on('value', (res) => {\n    Announce.draw(res.val());\n});\ndb.ref(PATH + 'player/name').on('value', (res) => {\n    Grid.nameChange(res.val());\n    Player.drawName(res.val());\n});\ndb.ref(PATH + 'player/point').on('value', (res) => {\n    Player.drawPoint(res.val());\n});\ndb.ref(PATH + 'player/token').on('value', (res) => {\n    Player.drawToken(res.val());\n});\ndb.ref(PATH + 'player/rank').on('value', (res) => {\n    Player.drawRank(res.val());\n});\ndb.ref(PATH + 'player/now').on('value', (res) => {\n    Player.drawPlayerNow(res.val());\n});\n\n\n//# sourceURL=webpack:///./src/Client.ts?");

/***/ }),

/***/ "./src/DrawAnnounce.ts":
/*!*****************************!*\
  !*** ./src/DrawAnnounce.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Announce; });\nclass Announce {\n    constructor(/*private WIDTH: number, private HEIGHT: number,*/ _canvas) {\n        this.draw = (str) => {\n            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);\n            this.context.font = \"64px Oxanium\";\n            this.context.fillStyle = 'black';\n            this.context.lineWidth = 1;\n            this.context.fillText(str, 0, 64);\n        };\n        this.canvas = document.getElementById(_canvas);\n        this.context = this.canvas.getContext('2d');\n    }\n}\n;\n\n\n//# sourceURL=webpack:///./src/DrawAnnounce.ts?");

/***/ }),

/***/ "./src/DrawCamel.ts":
/*!**************************!*\
  !*** ./src/DrawCamel.ts ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Camels; });\nclass Camels {\n    constructor(CAMEL_NUM, CAMEL_COLOR, CAMEL_WIDTH, src, _canvas) {\n        this.CAMEL_NUM = CAMEL_NUM;\n        this.CAMEL_COLOR = CAMEL_COLOR;\n        this.CAMEL_WIDTH = CAMEL_WIDTH;\n        this.init = (img) => {\n            for (let i = 0; i < this.CAMEL_NUM; ++i) {\n                ((canvas, context) => {\n                    context.clearRect(0, 0, canvas.width, canvas.height);\n                    context.drawImage(img, 0, 0, this.CAMEL_WIDTH, this.CAMEL_HEIGHT);\n                    this.imageData[i] = context.getImageData(0, 0, this.CAMEL_WIDTH, this.CAMEL_HEIGHT + 4);\n                    context.clearRect(0, 0, canvas.width, canvas.height);\n                    // Color Change\n                    ((imageData, color) => {\n                        const w = imageData.width;\n                        const h = imageData.height;\n                        const r = parseInt(color.substring(1, 3), 16);\n                        const g = parseInt(color.substring(3, 5), 16);\n                        const b = parseInt(color.substring(5, 7), 16);\n                        for (let j = 0; j < h; ++j) {\n                            for (let k = 0; k < w; ++k) {\n                                if (imageData.data[(j * w + k) * 4 + 0] < 5)\n                                    continue;\n                                if (imageData.data[(j * w + k) * 4 + 1] < 5)\n                                    continue;\n                                if (imageData.data[(j * w + k) * 4 + 2] < 5)\n                                    continue;\n                                imageData.data[(j * w + k) * 4 + 0] = r;\n                                imageData.data[(j * w + k) * 4 + 1] = g;\n                                imageData.data[(j * w + k) * 4 + 2] = b;\n                            }\n                        }\n                    })(this.imageData[i], this.CAMEL_COLOR[i]);\n                })(this.canvas[i], this.context[i]);\n            }\n        };\n        this.drawOnce = (id, x, y) => {\n            this.context[id].clearRect(0, 0, this.canvas[id].width, this.canvas[id].height);\n            this.context[id].putImageData(this.imageData[id], x * this.CAMEL_WIDTH, y * (this.CAMEL_HEIGHT - this.CAMEL_MARGIN));\n        };\n        this.draw = (json) => {\n            for (let i = 0; i < this.CAMEL_NUM; ++i) {\n                this.drawOnce(i, json.x[i], json.y[i]);\n            }\n        };\n        const img = new Image();\n        img.src = src;\n        img.onload = async () => {\n            const ratio = CAMEL_WIDTH / img.width;\n            this.CAMEL_HEIGHT = img.height * ratio;\n            this.CAMEL_MARGIN = 24 * ratio;\n            this.canvas = new Array(CAMEL_NUM);\n            this.context = new Array(CAMEL_NUM);\n            this.imageData = new Array(CAMEL_NUM);\n            this.CAMEL_GROUND = (CAMEL_NUM + 1) * this.CAMEL_HEIGHT - CAMEL_NUM * this.CAMEL_MARGIN;\n            for (let i = 0; i < CAMEL_NUM; ++i) {\n                this.canvas[i] = await document.getElementById(_canvas + i.toString());\n                this.context[i] = await this.canvas[i].getContext('2d');\n            }\n            await this.init(img);\n        };\n    }\n}\n;\n\n\n//# sourceURL=webpack:///./src/DrawCamel.ts?");

/***/ }),

/***/ "./src/DrawDice.ts":
/*!*************************!*\
  !*** ./src/DrawDice.ts ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Dice; });\nclass Dice {\n    constructor(CAMEL_NUM = 5, CAMEL_COLOR, WIDTH, _canvas) {\n        this.CAMEL_NUM = CAMEL_NUM;\n        this.CAMEL_COLOR = CAMEL_COLOR;\n        this.WIDTH = WIDTH;\n        this.drawNumber = (id, move) => {\n            this.context.font = \"64px Oxanium\";\n            const str = (move == null ? '?' : move.toString());\n            this.context.strokeStyle = 'black';\n            this.context.strokeText(str, id * this.WIDTH + this.WIDTH * 0.2, this.WIDTH - this.WIDTH * 0.125);\n            this.context.fillStyle = 'white';\n            this.context.fillText(str, id * this.WIDTH + this.WIDTH * 0.2, this.WIDTH - this.WIDTH * 0.125);\n        };\n        this.drawBase = () => {\n            this.context.strokeStyle = '#95a5a6';\n            this.context.lineWidth = 3;\n            for (let id = 0; id < this.CAMEL_NUM; ++id) {\n                this.context.fillStyle = this.CAMEL_COLOR[id];\n                this.context.fillRect(id * this.WIDTH, 0, this.WIDTH, this.WIDTH);\n                this.context.strokeRect(id * this.WIDTH, 0, this.WIDTH, this.WIDTH);\n            }\n        };\n        this.draw = (json) => {\n            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);\n            // Base\n            this.drawBase();\n            // Number\n            if (json == null) {\n                json = new Array(this.CAMEL_NUM);\n            }\n            for (let id = 0; id < this.CAMEL_NUM; ++id) {\n                this.drawNumber(id, json[id]);\n            }\n        };\n        this.canvas = document.getElementById(_canvas);\n        this.context = this.canvas.getContext('2d');\n    }\n}\n;\n\n\n//# sourceURL=webpack:///./src/DrawDice.ts?");

/***/ }),

/***/ "./src/DrawGrid.ts":
/*!*************************!*\
  !*** ./src/DrawGrid.ts ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Grid; });\nclass Grid {\n    constructor(GRID_NUM, GROUND, HEIGHT, _canvas) {\n        this.GRID_NUM = GRID_NUM;\n        this.GROUND = GROUND;\n        this.HEIGHT = HEIGHT;\n        this.nameChange = (PLAYER_NAME) => {\n            this.PLAYER_NUM = PLAYER_NAME.length;\n            this.PLAYER_NAME = PLAYER_NAME;\n        };\n        this.drawPanel = (name, x, move) => {\n            this.context.font = \"32px Oxanium\";\n            const str = (move > 0 ? '+' : '') + move.toString();\n            this.context.fillStyle = (move > 0 ? 'red' : 'blue');\n            this.context.fillText(str, x * this.WIDTH + 0.25 * this.WIDTH, this.GROUND + this.HEIGHT);\n            this.context.fillText(name, x * this.WIDTH + 0.25 * this.WIDTH, this.GROUND + this.HEIGHT * 2, this.WIDTH);\n        };\n        this.drawIndex = () => {\n            this.context.font = \"16px Oxanium\";\n            this.context.fillStyle = 'white';\n            for (let x = 1; x <= this.GRID_NUM; ++x) {\n                const str = x.toString();\n                this.context.fillText(str, x * this.WIDTH, this.GROUND + this.HEIGHT);\n            }\n        };\n        this.draw = (json) => {\n            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);\n            // Grid\n            this.context.fillStyle = 'black';\n            this.context.fillStyle = '#95a5a6';\n            this.context.fillRect(0, this.GROUND, this.canvas.width, this.HEIGHT);\n            this.context.lineWidth = 1;\n            this.context.strokeStyle = '#ffffff';\n            for (let x = 1; x <= this.GRID_NUM + 1; ++x) {\n                this.context.beginPath();\n                this.context.moveTo(x * this.WIDTH, this.GROUND);\n                this.context.lineTo(x * this.WIDTH, this.GROUND + this.HEIGHT);\n                this.context.stroke();\n            }\n            // Index\n            this.drawIndex();\n            // Panel\n            for (let i = 0; i < this.PLAYER_NUM; ++i) {\n                const move = json.move[i];\n                if (move != null) {\n                    this.drawPanel(this.PLAYER_NAME[i], json.x[i], move);\n                }\n            }\n        };\n        this.canvas = document.getElementById(_canvas);\n        this.context = this.canvas.getContext('2d');\n        this.WIDTH = this.canvas.width / (GRID_NUM + 2);\n    }\n}\n;\n\n\n//# sourceURL=webpack:///./src/DrawGrid.ts?");

/***/ }),

/***/ "./src/DrawPlayer.ts":
/*!***************************!*\
  !*** ./src/DrawPlayer.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Player; });\n/* harmony import */ var numeral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! numeral */ \"numeral\");\n/* harmony import */ var numeral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(numeral__WEBPACK_IMPORTED_MODULE_0__);\n\nclass Player {\n    constructor(_canvas) {\n        this.NAME_LIMIT = 6;\n        this.init = (name) => {\n            this.PLAYER_NAME = name;\n            this.PLAYER_NUM = name.length;\n            this.HEIGHT = this.canvas.height / this.PLAYER_NUM * 0.9;\n        };\n        this.drawToken = (token) => {\n            this.context.clearRect(0, 0, this.HEIGHT, this.canvas.height);\n            this.context.beginPath();\n            this.context.arc(this.HEIGHT / 2, token * this.HEIGHT + this.HEIGHT / 2, this.HEIGHT / 2, 0, 2 * Math.PI, true);\n            this.context.fillStyle = 'red';\n            this.context.fill();\n        };\n        this.drawRank = (rank) => {\n            this.context.clearRect(0, 0, this.HEIGHT, this.canvas.height);\n            for (let i = 0; i < this.PLAYER_NUM; ++i) {\n                this.context.fillStyle = 'black';\n                if (rank[i] == 1)\n                    this.context.fillStyle = 'gold';\n                if (rank[i] == 2)\n                    this.context.fillStyle = 'silver';\n                if (rank[i] == 3)\n                    this.context.fillStyle = 'chocolate';\n                this.context.fillText(numeral__WEBPACK_IMPORTED_MODULE_0__(rank[i]).format('0o'), 0, (i + 1) * this.HEIGHT, this.HEIGHT);\n            }\n        };\n        this.drawPoint = (point) => {\n            this.context.clearRect(this.HEIGHT + this.HEIGHT * this.NAME_LIMIT, 0, this.canvas.width, this.canvas.height);\n            this.context.lineWidth = 1;\n            this.context.strokeStyle = '#ffffff';\n            this.context.font = this.HEIGHT + 'px Oxanium';\n            for (let i = 0; i < this.PLAYER_NUM; ++i) {\n                this.context.fillStyle = 'black';\n                this.context.fillText(point[i].toString() + 'pt', this.HEIGHT * 2 + this.HEIGHT * this.NAME_LIMIT, (i + 1) * this.HEIGHT);\n            }\n        };\n        this.drawName = (name) => {\n            this.init(name);\n            this.context.clearRect(this.HEIGHT, 0, this.HEIGHT * this.NAME_LIMIT, this.canvas.height);\n            this.context.lineWidth = 1;\n            this.context.strokeStyle = '#ffffff';\n            this.context.font = this.HEIGHT + 'px Oxanium';\n            for (let i = 0; i < this.PLAYER_NUM; ++i) {\n                this.context.fillStyle = 'black';\n                this.context.fillText(name[i], this.HEIGHT, (i + 1) * this.HEIGHT, this.HEIGHT * this.NAME_LIMIT);\n            }\n        };\n        this.drawPlayerNow = (playerNow) => {\n            this.context.clearRect(this.HEIGHT, 0, this.HEIGHT * this.NAME_LIMIT, this.canvas.height);\n            this.context.lineWidth = 1;\n            this.context.strokeStyle = '#ffffff';\n            this.context.font = this.HEIGHT + 'px Oxanium';\n            for (let i = 0; i < this.PLAYER_NUM; ++i) {\n                this.context.fillStyle = 'black';\n                if (i == playerNow)\n                    this.context.fillStyle = 'red';\n                this.context.fillText(this.PLAYER_NAME[i], this.HEIGHT, (i + 1) * this.HEIGHT, this.HEIGHT * this.NAME_LIMIT);\n            }\n        };\n        this.canvas = document.getElementById(_canvas);\n        this.context = this.canvas.getContext('2d');\n    }\n}\n;\n\n\n//# sourceURL=webpack:///./src/DrawPlayer.ts?");

/***/ }),

/***/ "firebase":
/*!***************************!*\
  !*** external "firebase" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = firebase;\n\n//# sourceURL=webpack:///external_%22firebase%22?");

/***/ }),

/***/ "numeral":
/*!**************************!*\
  !*** external "numeral" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = numeral;\n\n//# sourceURL=webpack:///external_%22numeral%22?");

/***/ })

/******/ });