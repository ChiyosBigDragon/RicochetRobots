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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/camel/Client.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/camel/Client.ts":
/*!*****************************!*\
  !*** ./src/camel/Client.ts ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _DrawCamel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DrawCamel */ \"./src/camel/DrawCamel.ts\");\n/* harmony import */ var _DrawGrid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DrawGrid */ \"./src/camel/DrawGrid.ts\");\n/* harmony import */ var _DrawAnnounce__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DrawAnnounce */ \"./src/camel/DrawAnnounce.ts\");\n/* harmony import */ var _DrawHeader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DrawHeader */ \"./src/camel/DrawHeader.ts\");\n/* harmony import */ var _DrawStatus__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DrawStatus */ \"./src/camel/DrawStatus.ts\");\n/* harmony import */ var _DrawController__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DrawController */ \"./src/camel/DrawController.ts\");\n/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! firebase */ \"firebase\");\n/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(firebase__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var acgraph__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! acgraph */ \"acgraph\");\n/* harmony import */ var acgraph__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(acgraph__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _DrawGoods__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./DrawGoods */ \"./src/camel/DrawGoods.ts\");\n\n\n\n\n\n\n\n\n\nconst db = firebase__WEBPACK_IMPORTED_MODULE_6__[\"database\"]();\nconst PATH = 'CamelUp/';\n// default\nconst CAMEL_COLOR = ['#00569b', '#39b20d', '#f56300', '#ffffff', '#ffd302'];\n// Blue Set\n// const CAMEL_COLOR = ['#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4'];\nconst stageContainer = document.getElementById(\"stage-container\");\nconst header = new _DrawHeader__WEBPACK_IMPORTED_MODULE_3__[\"DrawHeader\"](1080, 30, acgraph__WEBPACK_IMPORTED_MODULE_7__[\"create\"](stageContainer));\nconst camel = new _DrawCamel__WEBPACK_IMPORTED_MODULE_0__[\"DrawCamel\"](5, CAMEL_COLOR, 1080 / (16 + 2), acgraph__WEBPACK_IMPORTED_MODULE_7__[\"create\"](stageContainer));\nconst grid = new _DrawGrid__WEBPACK_IMPORTED_MODULE_1__[\"DrawGrid\"](16, 1080, 30, acgraph__WEBPACK_IMPORTED_MODULE_7__[\"create\"](stageContainer));\nconst item = new _DrawGoods__WEBPACK_IMPORTED_MODULE_8__[\"DrawGoods\"](stageContainer);\nconst playerContainer = document.createElement(\"div\");\nplayerContainer.id = \"player-container\";\nstageContainer.appendChild(playerContainer);\nconst playerLeftContainer = document.createElement(\"div\");\nplayerLeftContainer.id = \"player-left-container\";\nplayerContainer.appendChild(playerLeftContainer);\nconst statusContainer = document.createElement(\"div\");\nstatusContainer.className = \"status-container\";\nconst status = new _DrawStatus__WEBPACK_IMPORTED_MODULE_4__[\"DrawStatus\"](40, 540, statusContainer, document);\nplayerLeftContainer.appendChild(statusContainer);\nconst announceContainer = document.createElement(\"div\");\nannounceContainer.className = \"announce-container\";\nconst announce = new _DrawAnnounce__WEBPACK_IMPORTED_MODULE_2__[\"DrawAnnounce\"](200, announceContainer, document);\nplayerLeftContainer.appendChild(announceContainer);\nconst controller = new _DrawController__WEBPACK_IMPORTED_MODULE_5__[\"DrawController\"](510, 540, 5, CAMEL_COLOR, acgraph__WEBPACK_IMPORTED_MODULE_7__[\"create\"](playerContainer));\n// stage.rect(0, 0, 1080, 720);\n// const headerLayer = stage.layer();\n// const camelLayer = stage.layer();\n// const gridLayer = stage.layer();\n// const announceLayer = stage.layer();\n// const Header = new DrawHeader(1080, 30, headerLayer);\n// const Grid = new DrawGrid(16, 1080, 30, gridLayer);\n// // const Camel = new DrawCamel(5, CAMEL_COLOR, 1080 / (16 + 2), camelLayer);\n// const Announce = new DrawAnnounce(1080, 50, announceLayer);\n// headerLayer.setPosition(0, 0);\n// // camelLayer.setPosition(0, headerLayer.getY() + parseFloat(headerLayer.domElement().getBoundingClientRect().height) + Camel.CAMEL_HEIGHT);\n// gridLayer.setPosition(0, camelLayer.getY() + parseFloat(camelLayer.domElement().getBoundingClientRect().height));\n// announceLayer.setPosition(0, gridLayer.getY() + parseFloat(gridLayer.domElement().getBoundingClientRect().height));\n// const Dice = new DrawDice(5, CAMEL_COLOR, 60, 'dice');\n// const Player = new DrawPlayer('player');\ndb.ref(PATH + 'camel').on('value', (res) => {\n    camel.draw(res.val());\n});\n// db.ref(PATH + 'dice').on('value', (res) => {\n// \tDice.draw(res.val());\n// });\n// db.ref(PATH + 'grid').on('value', (res) => {\n// \tGrid.draw(res.val());\n// });\ndb.ref(PATH + 'announce').on('value', (res) => {\n    announce.draw(res.val());\n});\ndb.ref(PATH + 'player/name').on('value', (res) => {\n    // \tGrid.nameChange(res.val());\n    status.init(res.val());\n});\ndb.ref(PATH + 'player/point').on('value', (res) => {\n    status.drawPoint(res.val());\n});\n// db.ref(PATH + 'player/token').on('value', (res) => {\n// \tPlayer.drawToken(res.val());\n// });\n// db.ref(PATH + 'player/rank').on('value', (res) => {\n// \tPlayer.drawRank(res.val());\n// });\ndb.ref(PATH + 'player/now').on('value', (res) => {\n    status.drawNameNow(res.val());\n});\n\n\n//# sourceURL=webpack:///./src/camel/Client.ts?");

/***/ }),

/***/ "./src/camel/DrawAnnounce.ts":
/*!***********************************!*\
  !*** ./src/camel/DrawAnnounce.ts ***!
  \***********************************/
/*! exports provided: DrawAnnounce */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DrawAnnounce\", function() { return DrawAnnounce; });\nclass DrawAnnounce {\n    constructor(HEIGHT, container, docment) {\n        this.HEIGHT = HEIGHT;\n        this.container = container;\n        this.docment = docment;\n        this.draw = (str) => {\n            const textBox = this.docment.createElement(\"div\");\n            textBox.className = \"announce-text\";\n            textBox.innerText = str;\n            this.container.insertBefore(textBox, this.container.firstChild);\n        };\n        container.style.height = this.HEIGHT.toString() + \"px\";\n    }\n}\n;\n\n\n//# sourceURL=webpack:///./src/camel/DrawAnnounce.ts?");

/***/ }),

/***/ "./src/camel/DrawCamel.ts":
/*!********************************!*\
  !*** ./src/camel/DrawCamel.ts ***!
  \********************************/
/*! exports provided: DrawCamel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DrawCamel\", function() { return DrawCamel; });\nclass DrawCamel {\n    constructor(CAMEL_NUM, CAMEL_COLOR, _CAMEL_WIDTH, stage) {\n        this.CAMEL_NUM = CAMEL_NUM;\n        this.CAMEL_COLOR = CAMEL_COLOR;\n        this.stage = stage;\n        this.CAMEL_WIDTH = 108;\n        this.CAMEL_HEIGHT = 49;\n        this.CAMEL_RATIO = 10;\n        this.drawOnce = (id, x, y) => {\n            this.camel[id].setPosition(x * this.CAMEL_WIDTH, (y - 1) * this.CAMEL_HEIGHT);\n        };\n        this.draw = (json) => {\n            for (let i = 0; i < this.CAMEL_NUM; ++i) {\n                this.drawOnce(i, json.x[i], json.y[i]);\n            }\n        };\n        // stage.rect(0, 0, stage.width(), stage.height());\n        this.camel = new Array(CAMEL_NUM);\n        this.CAMEL_RATIO = _CAMEL_WIDTH / this.CAMEL_WIDTH;\n        this.CAMEL_WIDTH = this.CAMEL_WIDTH * this.CAMEL_RATIO;\n        this.CAMEL_HEIGHT = this.CAMEL_HEIGHT * this.CAMEL_RATIO;\n        for (let i = 0; i < this.CAMEL_NUM; ++i) {\n            this.camel[i] = stage.layer();\n            this.camel[i].path().attr(\"stroke-width\", 0).attr(\"d\", \"M80,0h4v4h4v4h8v4h4v4h4v12h-4v4h-8v12h-4v4h-4v4h-4v4h-4v4h-4v8h-4v4h-8v-4h-4v-4h-4v-4h-4v-4h-8v4h-4v8h-4v4h-8v-4h-4v-4h-8v-4h-4v-8h-4v-4h-4v-24h4v-4h4v-4h4v-4h8v4h4v4h8v-8h4v-4h4v-4h8v4h4v4h4v4h4v4h8v-8h4v-4h4v-4h4zM92\").fill(\"#000000\");\n            this.camel[i].path().stroke(CAMEL_COLOR[i]).attr(\"stroke-width\", 0).attr(\"d\", \"M80,4h4v4h4v4h8v4h4v12h-8v4h-4v12h-4v4h-4v4h-4v4h-4v4h-4v8h-8v-4h-4v-4h-4v-4h-4v-4h-8v4h-4v4h-4v8h-8v-4h-4v-4h-8v-8h-4v-4h-4v-24h4v-4h4v-4h8v4h4v4h8v-4h4v-8h4v-4h8v4h4v4h4v4h4v4h8v-4h4v-8h4v-4h4z\").fill(CAMEL_COLOR[i]);\n            this.camel[i].scale(this.CAMEL_RATIO, this.CAMEL_RATIO);\n            this.camel[i].setPosition(0, this.CAMEL_HEIGHT * i);\n        }\n    }\n}\n;\n\n\n//# sourceURL=webpack:///./src/camel/DrawCamel.ts?");

/***/ }),

/***/ "./src/camel/DrawController.ts":
/*!*************************************!*\
  !*** ./src/camel/DrawController.ts ***!
  \*************************************/
/*! exports provided: DrawController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DrawController\", function() { return DrawController; });\nclass DrawController {\n    constructor(HEIGHT, WIDTH, CAMEL_NUM, CAMEL_COLOR, stage) {\n        this.HEIGHT = HEIGHT;\n        this.WIDTH = WIDTH;\n        this.CAMEL_NUM = CAMEL_NUM;\n        this.CAMEL_COLOR = CAMEL_COLOR;\n        this.stage = stage;\n        this.CAMEL_WIDTH = 108;\n        this.CAMEL_HEIGHT = 49;\n        this.CAMEL_RATIO = 10;\n        this.drawOnce = (id, x, y) => {\n            this.camel[id].setPosition(x * this.CAMEL_WIDTH, (y - 1) * this.CAMEL_HEIGHT);\n        };\n        this.draw = (json) => {\n            for (let i = 0; i < this.CAMEL_NUM; ++i) {\n                this.drawOnce(i, json.x[i], json.y[i]);\n            }\n        };\n        stage.width(WIDTH);\n        stage.height(HEIGHT);\n        const dice = stage.layer();\n        const diceRect = dice.rect(20, 20, 100, 100);\n        dice.circle(70, 70, 20, 20).fill(\"red\");\n        dice.listen(\"mouseover\", () => {\n            diceRect.fill(\"yellow\");\n        });\n        dice.listen(\"mouseout\", () => {\n            diceRect.fill(\"white\");\n        });\n        // this.camel = new Array(CAMEL_NUM);\n        // this.CAMEL_RATIO = _CAMEL_WIDTH / this.CAMEL_WIDTH;\n        // this.CAMEL_WIDTH = this.CAMEL_WIDTH * this.CAMEL_RATIO;\n        // this.CAMEL_HEIGHT = this.CAMEL_HEIGHT * this.CAMEL_RATIO;\n        // for(let i = 0; i < this.CAMEL_NUM; ++i) {\n        // \tthis.camel[i] = stage.layer();\n        // \tthis.camel[i].path().attr(\"stroke-width\", 0).attr(\"d\", \"M80,0h4v4h4v4h8v4h4v4h4v12h-4v4h-8v12h-4v4h-4v4h-4v4h-4v4h-4v8h-4v4h-8v-4h-4v-4h-4v-4h-4v-4h-8v4h-4v8h-4v4h-8v-4h-4v-4h-8v-4h-4v-8h-4v-4h-4v-24h4v-4h4v-4h4v-4h8v4h4v4h8v-8h4v-4h4v-4h8v4h4v4h4v4h4v4h8v-8h4v-4h4v-4h4zM92\").fill(\"#000000\");\n        // \tthis.camel[i].path().stroke(CAMEL_COLOR[i]).attr(\"stroke-width\", 0).attr(\"d\", \"M80,4h4v4h4v4h8v4h4v12h-8v4h-4v12h-4v4h-4v4h-4v4h-4v4h-4v8h-8v-4h-4v-4h-4v-4h-4v-4h-8v4h-4v4h-4v8h-8v-4h-4v-4h-8v-8h-4v-4h-4v-24h4v-4h4v-4h8v4h4v4h8v-4h4v-8h4v-4h8v4h4v4h4v4h4v4h8v-4h4v-8h4v-4h4z\").fill(CAMEL_COLOR[i]);\n        // \tthis.camel[i].scale(this.CAMEL_RATIO, this.CAMEL_RATIO);\n        // \tthis.camel[i].setPosition(0, this.CAMEL_HEIGHT * i);\n        // }\n    }\n}\n;\n\n\n//# sourceURL=webpack:///./src/camel/DrawController.ts?");

/***/ }),

/***/ "./src/camel/DrawGoods.ts":
/*!********************************!*\
  !*** ./src/camel/DrawGoods.ts ***!
  \********************************/
/*! exports provided: DrawGoods */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DrawGoods\", function() { return DrawGoods; });\n/* harmony import */ var acgraph__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! acgraph */ \"acgraph\");\n/* harmony import */ var acgraph__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(acgraph__WEBPACK_IMPORTED_MODULE_0__);\n\nclass DrawGoods {\n    constructor(container) {\n        this.container = container;\n        this.dice = (width, height) => {\n            const WIDTH = 100;\n            const HEIGHT = 100;\n            const ratio = Math.min(width / WIDTH, height / HEIGHT);\n            const dice = acgraph__WEBPACK_IMPORTED_MODULE_0__[\"create\"](this.container);\n            const diceRect = dice.rect(0, 0, 100, 100);\n            dice.circle(50, 50, 20, 20).fill(\"red\");\n            let dom = dice.domElement();\n            const unwrap = target => {\n                while (target.firstChild) {\n                    target.parentNode.insertBefore(target.firstChild, target);\n                }\n                target.remove();\n            };\n            unwrap(dom.parentNode);\n            dom.setAttribute(\"viewBox\", \"0 0 100 100\");\n            dice.listen(\"mouseover\", () => {\n                diceRect.fill(\"yellow\");\n            });\n            dice.listen(\"mouseout\", () => {\n                diceRect.fill(\"white\");\n            });\n            return dice;\n        };\n    }\n}\n;\n\n\n//# sourceURL=webpack:///./src/camel/DrawGoods.ts?");

/***/ }),

/***/ "./src/camel/DrawGrid.ts":
/*!*******************************!*\
  !*** ./src/camel/DrawGrid.ts ***!
  \*******************************/
/*! exports provided: DrawGrid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DrawGrid\", function() { return DrawGrid; });\nclass DrawGrid {\n    constructor(PANEL_NUM, GRID_WIDTH, GRID_HEIGHT, stage) {\n        this.PANEL_NUM = PANEL_NUM;\n        this.GRID_WIDTH = GRID_WIDTH;\n        this.GRID_HEIGHT = GRID_HEIGHT;\n        this.stage = stage;\n        this.nameChange = (PLAYER_NAME) => {\n            this.PLAYER_NUM = PLAYER_NAME.length;\n            this.PLAYER_NAME = PLAYER_NAME;\n        };\n        this.drawPanel = (name, x, move) => {\n            // this.context.font = \"32px Oxanium\";\n            const str = (move > 0 ? '+' : '') + move.toString();\n            this.text[x].color(move > 0 ? 'red' : 'blue');\n            this.text[x].text((move > 0 ? '+' : '') + move.toString());\n            // this.context.fillText(str, x * this.WIDTH + 0.25 * this.WIDTH, this.GROUND + this.HEIGHT);\n            // this.context.fillText(name, x * this.WIDTH + 0.25 * this.WIDTH, this.GROUND + this.HEIGHT * 2, this.WIDTH);\n        };\n        this.draw = (json) => {\n            // Panel\n            for (let i = 0; i < this.PLAYER_NUM; ++i) {\n                const move = json.move[i];\n                if (move != null) {\n                    this.drawPanel(this.PLAYER_NAME[i], json.x[i], move);\n                }\n            }\n        };\n        stage.height(GRID_HEIGHT);\n        this.PANEL_WIDTH = GRID_WIDTH / (PANEL_NUM + 2);\n        this.panel = new Array(PANEL_NUM + 2);\n        this.text = new Array(PANEL_NUM + 2);\n        for (let i = 0; i <= PANEL_NUM + 1; ++i) {\n            this.panel[i] = stage.layer();\n            this.panel[i].rect(0, 0, this.PANEL_WIDTH, this.GRID_HEIGHT).stroke(\"1, white\").fill(\"lightgray\");\n            this.panel[i].setPosition(this.PANEL_WIDTH * i, 0);\n            if (1 <= i && i <= PANEL_NUM) {\n                const txt = this.panel[i].text(0, 0);\n                txt.text(i.toString());\n                txt.y(this.GRID_HEIGHT - parseInt(txt.fontSize()) * 1.25);\n                txt.x(parseInt(txt.fontSize()) * 0.25);\n                // txt.direction('rtl');\n                // txt.width(this.panel[i].getWidth());\n                // txt.height(this.panel[i].getHeight());\n                // blueText.style({fontStyle: 'italic', fontSize: '15px', color: '#2196F3'});\n                // blueText.text('Simple text');\n            }\n        }\n    }\n}\n;\n// export class DrawGrid {\n// \tprivate canvas: HTMLCanvasElement;\n// \tprivate context: CanvasRenderingContext2D;\n// \tprivate WIDTH: number;\n// \tprivate PLAYER_NUM: number;\n// \tprivate PLAYER_NAME: string[];\n// \tconstructor(private GRID_NUM: number, public GROUND: number, private HEIGHT: number, _canvas: string) {\n// \t\tthis.canvas = <HTMLCanvasElement> document.getElementById(_canvas);\n// \t\tthis.context = this.canvas.getContext('2d');\n// \t\tthis.WIDTH = this.canvas.width / (GRID_NUM + 2);\n// \t}\n// \tpublic nameChange = (PLAYER_NAME: string[]) => {\n// \t\tthis.PLAYER_NUM = PLAYER_NAME.length;\n// \t\tthis.PLAYER_NAME = PLAYER_NAME;\n// \t};\n// \tprivate drawPanel = (name: string, x: number, move: number) => {\n// \t\tthis.context.font = \"32px Oxanium\";\n// \t\tconst str = (move > 0 ? '+' : '') + move.toString();\n// \t\tthis.context.fillStyle = (move > 0 ? 'red' : 'blue');\n// \t\tthis.context.fillText(str, x * this.WIDTH + 0.25 * this.WIDTH, this.GROUND + this.HEIGHT);\n// \t\tthis.context.fillText(name, x * this.WIDTH + 0.25 * this.WIDTH, this.GROUND + this.HEIGHT * 2, this.WIDTH);\n// \t};\n// \tprivate drawIndex = () => {\n// \t\tthis.context.font = \"16px Oxanium\";\n// \t\tthis.context.fillStyle = 'white';\n// \t\tfor(let x = 1; x <= this.GRID_NUM; ++x) {\n// \t\t\tconst str = x.toString();\n// \t\t\tthis.context.fillText(str, x * this.WIDTH, this.GROUND + this.HEIGHT);\n// \t\t}\n// \t};\n// \tpublic draw = (json: {x: number[], move: number[]}) => {\n// \t\tthis.context.clearRect(0, 0, this.canvas.width, this.canvas.height);\n// \t\t// Grid\n// \t\tthis.context.fillStyle = 'black';\n// \t\tthis.context.fillStyle = '#95a5a6';\n// \t\tthis.context.fillRect(0, this.GROUND, this.canvas.width, this.HEIGHT);\n// \t\tthis.context.lineWidth = 1;\n// \t\tthis.context.strokeStyle = '#ffffff';\n// \t\tfor(let x = 1; x <= this.GRID_NUM + 1; ++x) {\n// \t\t\tthis.context.beginPath();\n// \t\t\tthis.context.moveTo(x * this.WIDTH, this.GROUND);\n// \t\t\tthis.context.lineTo(x * this.WIDTH, this.GROUND + this.HEIGHT);\n// \t\t\tthis.context.stroke();\n// \t\t}\n// \t\t// Index\n// \t\tthis.drawIndex();\n// \t\t// Panel\n// \t\tfor(let i = 0; i < this.PLAYER_NUM; ++i) {\n// \t\t\tconst move = json.move[i];\n// \t\t\tif(move != null) {\n// \t\t\t\tthis.drawPanel(this.PLAYER_NAME[i], json.x[i], move);\n// \t\t\t}\n// \t\t}\n// \t};\n// };\n// export default class Grid {\n// \tprivate canvas: HTMLCanvasElement;\n// \tprivate context: CanvasRenderingContext2D;\n// \tprivate WIDTH: number;\n// \tprivate PLAYER_NUM: number;\n// \tprivate PLAYER_NAME: string[];\n// \tconstructor(private GRID_NUM: number, public GROUND: number, private HEIGHT: number, _canvas: string) {\n// \t\tthis.canvas = <HTMLCanvasElement> document.getElementById(_canvas);\n// \t\tthis.context = this.canvas.getContext('2d');\n// \t\tthis.WIDTH = this.canvas.width / (GRID_NUM + 2);\n// \t}\n// \tpublic nameChange = (PLAYER_NAME: string[]) => {\n// \t\tthis.PLAYER_NUM = PLAYER_NAME.length;\n// \t\tthis.PLAYER_NAME = PLAYER_NAME;\n// \t};\n// \tprivate drawPanel = (name: string, x: number, move: number) => {\n// \t\tthis.context.font = \"32px Oxanium\";\n// \t\tconst str = (move > 0 ? '+' : '') + move.toString();\n// \t\tthis.context.fillStyle = (move > 0 ? 'red' : 'blue');\n// \t\tthis.context.fillText(str, x * this.WIDTH + 0.25 * this.WIDTH, this.GROUND + this.HEIGHT);\n// \t\tthis.context.fillText(name, x * this.WIDTH + 0.25 * this.WIDTH, this.GROUND + this.HEIGHT * 2, this.WIDTH);\n// \t};\n// \tprivate drawIndex = () => {\n// \t\tthis.context.font = \"16px Oxanium\";\n// \t\tthis.context.fillStyle = 'white';\n// \t\tfor(let x = 1; x <= this.GRID_NUM; ++x) {\n// \t\t\tconst str = x.toString();\n// \t\t\tthis.context.fillText(str, x * this.WIDTH, this.GROUND + this.HEIGHT);\n// \t\t}\n// \t};\n// \tpublic draw = (json: {x: number[], move: number[]}) => {\n// \t\tthis.context.clearRect(0, 0, this.canvas.width, this.canvas.height);\n// \t\t// Grid\n// \t\tthis.context.fillStyle = 'black';\n// \t\tthis.context.fillStyle = '#95a5a6';\n// \t\tthis.context.fillRect(0, this.GROUND, this.canvas.width, this.HEIGHT);\n// \t\tthis.context.lineWidth = 1;\n// \t\tthis.context.strokeStyle = '#ffffff';\n// \t\tfor(let x = 1; x <= this.GRID_NUM + 1; ++x) {\n// \t\t\tthis.context.beginPath();\n// \t\t\tthis.context.moveTo(x * this.WIDTH, this.GROUND);\n// \t\t\tthis.context.lineTo(x * this.WIDTH, this.GROUND + this.HEIGHT);\n// \t\t\tthis.context.stroke();\n// \t\t}\n// \t\t// Index\n// \t\tthis.drawIndex();\n// \t\t// Panel\n// \t\tfor(let i = 0; i < this.PLAYER_NUM; ++i) {\n// \t\t\tconst move = json.move[i];\n// \t\t\tif(move != null) {\n// \t\t\t\tthis.drawPanel(this.PLAYER_NAME[i], json.x[i], move);\n// \t\t\t}\n// \t\t}\n// \t};\n// };\n\n\n//# sourceURL=webpack:///./src/camel/DrawGrid.ts?");

/***/ }),

/***/ "./src/camel/DrawHeader.ts":
/*!*********************************!*\
  !*** ./src/camel/DrawHeader.ts ***!
  \*********************************/
/*! exports provided: DrawHeader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DrawHeader\", function() { return DrawHeader; });\nclass DrawHeader {\n    constructor(HEADER_WIDTH, HEADER_HEIGHT, stage) {\n        this.HEADER_WIDTH = HEADER_WIDTH;\n        this.HEADER_HEIGHT = HEADER_HEIGHT;\n        this.stage = stage;\n        this.createName = (container) => {\n            const ret = container.layer();\n            ret.attr(\"class\", \"header-item\");\n            return ret;\n        };\n        // public drawName = (str: string) => {\n        // \tthis.header.fontSize(this.HEADER_HEIGHT * 0.9);\n        // };\n        this.draw = (str) => {\n            // this.context.font = \"64px Oxanium\";\n            // this.context.fillStyle = 'black';\n            // this.context.lineWidth = 1;\n            // this.context.fillText(str, 0, 64);\n        };\n        stage.height(HEADER_HEIGHT);\n        // stage.rect(0, 0, HEADER_WIDTH, HEADER_HEIGHT);\n        // this.header = _layer;\n        // const rec = this.header.rect(0, 0, HEADER_WIDTH, HEADER_HEIGHT);\n        // // rec.visible(false);\n        // this.container = this.header.layer();\n        // this.container.attr(\"class\", \"header-container\");\n        // this.name = this.container.text().attr(\"class\", \"header-item\");\n        // this.name.text(\"aaa\");\n        // this.point = this.container.text().attr(\"class\", \"header-item\");\n        // this.point.text(\"bbb\");\n    }\n}\n;\n\n\n//# sourceURL=webpack:///./src/camel/DrawHeader.ts?");

/***/ }),

/***/ "./src/camel/DrawStatus.ts":
/*!*********************************!*\
  !*** ./src/camel/DrawStatus.ts ***!
  \*********************************/
/*! exports provided: DrawStatus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DrawStatus\", function() { return DrawStatus; });\n/* harmony import */ var _DrawGoods__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DrawGoods */ \"./src/camel/DrawGoods.ts\");\n\nclass DrawStatus {\n    // private const COLOR: string[] = [\"#e74c3c\", \"#3498db\", ];\n    constructor(HEIGHT, WIDTH, container, docment) {\n        this.HEIGHT = HEIGHT;\n        this.WIDTH = WIDTH;\n        this.container = container;\n        this.docment = docment;\n        this.init = (name) => {\n            while (this.container.firstChild)\n                this.container.removeChild(this.container.firstChild);\n            this._drawGoods = new _DrawGoods__WEBPACK_IMPORTED_MODULE_0__[\"DrawGoods\"](this.container);\n            this.PLAYER_NAME = name;\n            this.PLAYER_NUM = name.length;\n            this.createStatusPlayer();\n            this.name = this.createStatusPlayerName();\n            this.point = this.createStatusPlayerPoint();\n            this.pointDiff = this.createStatusPlayerPoint();\n            this.goods = this.createStatusPlayerGoods();\n            this.drawName();\n            this.drawGoods();\n        };\n        this.createStatusPlayer = () => {\n            this.status = new Array(this.PLAYER_NUM);\n            for (let i = 0; i < this.PLAYER_NUM; ++i) {\n                this.status[i] = this.docment.createElement(\"div\");\n                this.status[i].className = \"status-player\";\n                this.status[i].style.height = this.HEIGHT.toString() + \"px\";\n                this.status[i].style.width = this.WIDTH.toString() + \"px\";\n                this.status[i].style.fontSize = (this.HEIGHT * 0.6).toString() + \"px\";\n                this.NAME_WIDTH = this.HEIGHT * 0.6 * 6;\n                const color = this.pickColor();\n                this.status[i].style.borderColor = color[0];\n                this.status[i].style.backgroundColor = color[1];\n                this.container.appendChild(this.status[i]);\n            }\n        };\n        this.createStatusPlayerName = () => {\n            const name = new Array(this.PLAYER_NUM);\n            for (let i = 0; i < this.PLAYER_NUM; ++i) {\n                name[i] = this.docment.createElement(\"div\");\n                name[i].className = \"status-player-name\";\n                this.status[i].appendChild(name[i]);\n            }\n            return name;\n        };\n        this.createStatusPlayerPoint = () => {\n            const point = new Array(this.PLAYER_NUM);\n            for (let i = 0; i < this.PLAYER_NUM; ++i) {\n                point[i] = this.docment.createElement(\"div\");\n                point[i].className = \"status-player-point\";\n                this.status[i].appendChild(point[i]);\n            }\n            return point;\n        };\n        this.createStatusPlayerGoods = () => {\n            const goods = new Array(this.PLAYER_NUM);\n            for (let i = 0; i < this.PLAYER_NUM; ++i) {\n                goods[i] = this.docment.createElement(\"div\");\n                goods[i].className = \"status-player-goods-container\";\n                this.status[i].appendChild(goods[i]);\n            }\n            return goods;\n        };\n        this.pickColor = () => {\n            while (true) {\n                const h = Math.random() * 360;\n                if (Math.abs(h - this.preColor) < 40 || Math.abs(Math.min(h, this.preColor) + 360 - Math.max(h, this.preColor)) < 40) {\n                    continue;\n                }\n                this.preColor = h;\n                return [`hsl(${h}, 80%, 60%)`, `hsla(${h}, 80%, 60%, 0.1)`];\n            }\n        };\n        // public drawToken = (token: number) => {\n        // \tthis.context.clearRect(0, 0, this.HEIGHT, this.canvas.height);\n        // \tthis.context.beginPath();\n        // \tthis.context.arc(this.HEIGHT / 2, token * this.HEIGHT + this.HEIGHT / 2, this.HEIGHT / 2, 0, 2 * Math.PI, true);\n        // \tthis.context.fillStyle = 'red';\n        // \tthis.context.fill();\n        // };\n        // public drawRank = (rank: number[]) => {\n        // \tthis.context.clearRect(0, 0, this.HEIGHT, this.canvas.height);\n        // \tfor(let i = 0; i < this.PLAYER_NUM; ++i) {\n        // \t\tthis.context.fillStyle = 'black';\n        // \t\tif(rank[i] == 1) this.context.fillStyle = 'gold';\n        // \t\tif(rank[i] == 2) this.context.fillStyle = 'silver';\n        // \t\tif(rank[i] == 3) this.context.fillStyle = 'chocolate';\n        // \t\tthis.context.fillText(numeral(rank[i]).format('0o'), 0, (i + 1) * this.HEIGHT, this.HEIGHT);\n        // \t}\n        // };\n        this.drawGoods = () => {\n            for (let i = 0; i < this.PLAYER_NUM; ++i) {\n                for (let j = 0; j < 2; ++j) {\n                    const div = this.docment.createElement(\"div\");\n                    div.className = \"status-player-goods\";\n                    const goods = this._drawGoods.dice(this.HEIGHT, this.HEIGHT).domElement();\n                    div.appendChild(goods);\n                    this.goods[i].appendChild(div);\n                }\n            }\n        };\n        this.drawPoint = (point) => {\n            for (let i = 0; i < this.PLAYER_NUM; ++i) {\n                let ret = \"\";\n                ret += point.val[i].toString() + \"pt\";\n                if (point.diff != null && point.diff[i] != null) {\n                    let diffStr = \" -> \";\n                    point.val[i] += point.diff[i];\n                    diffStr += point.val[i].toString() + \"pt\";\n                    const op = point.diff[i] < 0 ? \"-\"\n                        : point.diff[i] == 0 ? \"±\"\n                            : \"+\";\n                    diffStr += `(${op}${point.diff[i]})`;\n                    this.pointDiff[i].innerText = diffStr;\n                    this.status[i].insertBefore(this.pointDiff[i], this.point[i].nextSibling);\n                }\n                else {\n                    this.pointDiff[i].remove();\n                }\n                this.point[i].innerText = ret;\n            }\n        };\n        this.drawName = () => {\n            for (let i = 0; i < this.PLAYER_NUM; ++i) {\n                this.name[i].innerText = this.PLAYER_NAME[i];\n                this.name[i].style.width = (this.NAME_WIDTH).toString() + \"px\";\n            }\n        };\n        this.drawNameNow = (now) => {\n            if (now == null) {\n                for (let i = 0; i < this.PLAYER_NUM; ++i) {\n                    this.name[i].style.color = \"rgba(0, 0, 0, 1.0)\";\n                    this.name[i].style.fontWeight = \"normal\";\n                }\n            }\n            else {\n                for (let i = 0; i < this.PLAYER_NUM; ++i) {\n                    this.name[i].style.color = \"rgba(0, 0, 0, 0.5)\";\n                    this.name[i].style.fontWeight = \"normal\";\n                }\n                this.name[now].style.color = \"rgba(0, 0, 0, 1.0)\";\n                this.name[now].style.fontWeight = \"bold\";\n            }\n        };\n    }\n}\n;\n\n\n//# sourceURL=webpack:///./src/camel/DrawStatus.ts?");

/***/ }),

/***/ "acgraph":
/*!**************************!*\
  !*** external "acgraph" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = acgraph;\n\n//# sourceURL=webpack:///external_%22acgraph%22?");

/***/ }),

/***/ "firebase":
/*!***************************!*\
  !*** external "firebase" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = firebase;\n\n//# sourceURL=webpack:///external_%22firebase%22?");

/***/ })

/******/ });