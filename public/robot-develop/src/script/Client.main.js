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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/robot/Client.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/robot/Client.ts":
/*!*****************************!*\
  !*** ./src/robot/Client.ts ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _DrawBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DrawBoard */ \"./src/robot/DrawBoard.ts\");\n/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase */ \"firebase\");\n/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(firebase__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst db = firebase__WEBPACK_IMPORTED_MODULE_1__[\"database\"]();\nconst PATH = 'RicochetRobots/';\nconst boardContainer = document.getElementById(\"board-container\");\nconst board = new _DrawBoard__WEBPACK_IMPORTED_MODULE_0__[\"DrawBoard\"](16, 16, boardContainer);\nconst json = {\n    \"wall\": {\n        \"x\": [\n            [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false], [false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false], [false, false, false, false, false, false, true, false, true, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false], [true, false, false, false, false, false, false, false, false, true, false, true, false, false, false, false, false], [false, false, false, true, false, false, false, true, true, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, true, true, false, false, false, false, false, false, false, false], [false, true, false, false, true, false, false, false, false, false, false, false, false, false, false, true, false], [false, false, false, false, false, false, false, false, true, false, false, false, false, true, false, false, false], [true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false], [false, false, false, false, false, false, false, false, false, true, false, false, false, false, true, false, false], [false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false], [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]\n        ],\n        \"y\": [\n            [true, false, true, false, false, false, false, false, false, false, false, true, false, false, false, false, true], [true, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, true], [true, false, true, false, false, false, false, false, false, false, false, false, false, false, true, false, true], [true, false, false, false, false, false, false, true, true, false, false, false, false, false, false, false, true], [true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true], [true, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, true], [true, false, false, true, false, false, false, false, false, false, false, false, true, false, false, false, true], [true, false, false, false, false, false, false, true, false, true, false, false, false, false, false, false, true], [true, false, false, false, false, false, false, true, false, true, false, false, false, false, false, false, true], [true, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, true], [true, false, true, false, false, false, false, false, false, true, false, false, false, false, false, false, true], [true, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, true], [true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true], [true, false, false, false, false, false, true, false, false, true, false, false, false, false, false, false, true], [true, false, false, true, false, false, false, false, false, false, false, false, false, false, false, true, true], [true, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, true], [true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true]\n        ]\n    },\n    \"goal\": [\n        { \"x\": 4, \"y\": 1 }, { \"x\": 12, \"y\": 1 }, { \"x\": 1, \"y\": 2 }, { \"x\": 14, \"y\": 2 }, { \"x\": 6, \"y\": 3 }, { \"x\": 8, \"y\": 3 }, { \"x\": 9, \"y\": 5 }, { \"x\": 3, \"y\": 6 }, { \"x\": 11, \"y\": 6 }, { \"x\": 4, \"y\": 9 }, { \"x\": 1, \"y\": 10 }, { \"x\": 8, \"y\": 10 }, { \"x\": 13, \"y\": 11 }, { \"x\": 6, \"y\": 13 }, { \"x\": 9, \"y\": 13 }, { \"x\": 2, \"y\": 14 }, { \"x\": 14, \"y\": 14 }\n    ]\n};\nconst wallX = json['wall']['x'];\nconst wallY = json['wall']['y'];\nconst goal = json['goal'];\nboard.wall(wallX, wallY);\nboard.step(0);\n// const id = (0).toString().padStart(3, '0');\n// const httpObj = new XMLHttpRequest();\n// console.log('./src/stage/' + id + '.json');\n// httpObj.open('get', './src/stage/' + id + '.json', true);\n// httpObj.onload = function() {\n// \tconsole.log(this.responseText);\n// \tconst data = JSON.parse(this.responseText);\n// \tconst wallX = data['wall']['x'];\n// \tconst wallY = data['wall']['y'];\n// \tconst goal = data['goal'];\n// \thttpObj.send(null);\n// \tboard.wall(wallX, wallY);\n// }\n// const header = new DrawHeader(1080, 30, acgraph.create(stageContainer));\n// const camel = new DrawCamel(5, CAMEL_COLOR, 1080 / (16 + 2), acgraph.create(stageContainer));\n// const grid = new DrawGrid(16, 1080, 30, acgraph.create(stageContainer));\n// const item = new DrawGoods(stageContainer);\n// const playerContainer = document.createElement(\"div\");\n// playerContainer.id = \"player-container\";\n// stageContainer.appendChild(playerContainer);\n// const playerLeftContainer = document.createElement(\"div\");\n// playerLeftContainer.id = \"player-left-container\";\n// playerContainer.appendChild(playerLeftContainer);\n// const statusContainer = document.createElement(\"div\");\n// statusContainer.className = \"status-container\";\n// const status = new DrawStatus(40, 540, statusContainer, document);\n// playerLeftContainer.appendChild(statusContainer);\n// const announceContainer = document.createElement(\"div\");\n// announceContainer.className = \"announce-container\";\n// const announce = new DrawAnnounce(200, announceContainer, document);\n// playerLeftContainer.appendChild(announceContainer);\n// const controller = new DrawController(510, 540, 5, CAMEL_COLOR, acgraph.create(playerContainer));\n// // stage.rect(0, 0, 1080, 720);\n// // const headerLayer = stage.layer();\n// // const camelLayer = stage.layer();\n// // const gridLayer = stage.layer();\n// // const announceLayer = stage.layer();\n// // const Header = new DrawHeader(1080, 30, headerLayer);\n// // const Grid = new DrawGrid(16, 1080, 30, gridLayer);\n// // // const Camel = new DrawCamel(5, CAMEL_COLOR, 1080 / (16 + 2), camelLayer);\n// // const Announce = new DrawAnnounce(1080, 50, announceLayer);\n// // headerLayer.setPosition(0, 0);\n// // // camelLayer.setPosition(0, headerLayer.getY() + parseFloat(headerLayer.domElement().getBoundingClientRect().height) + Camel.CAMEL_HEIGHT);\n// // gridLayer.setPosition(0, camelLayer.getY() + parseFloat(camelLayer.domElement().getBoundingClientRect().height));\n// // announceLayer.setPosition(0, gridLayer.getY() + parseFloat(gridLayer.domElement().getBoundingClientRect().height));\n// // const Dice = new DrawDice(5, CAMEL_COLOR, 60, 'dice');\n// // const Player = new DrawPlayer('player');\n// db.ref(PATH + 'camel').on('value', (res) => {\n// \tcamel.draw(res.val());\n// });\n// // db.ref(PATH + 'dice').on('value', (res) => {\n// // \tDice.draw(res.val());\n// // });\n// // db.ref(PATH + 'grid').on('value', (res) => {\n// // \tGrid.draw(res.val());\n// // });\n// db.ref(PATH + 'announce').on('value', (res) => {\n// \tannounce.draw(res.val());\n// });\n// db.ref(PATH + 'player/name').on('value', (res) => {\n// // \tGrid.nameChange(res.val());\n// \tstatus.init(res.val());\n// });\n// db.ref(PATH + 'player/point').on('value', (res) => {\n// \tstatus.drawPoint(res.val());\n// });\n// // db.ref(PATH + 'player/token').on('value', (res) => {\n// // \tPlayer.drawToken(res.val());\n// // });\n// // db.ref(PATH + 'player/rank').on('value', (res) => {\n// // \tPlayer.drawRank(res.val());\n// // });\n// db.ref(PATH + 'player/now').on('value', (res) => {\n// \tstatus.drawNameNow(res.val());\n// })};\n\n\n//# sourceURL=webpack:///./src/robot/Client.ts?");

/***/ }),

/***/ "./src/robot/DrawBoard.ts":
/*!********************************!*\
  !*** ./src/robot/DrawBoard.ts ***!
  \********************************/
/*! exports provided: DrawBoard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DrawBoard\", function() { return DrawBoard; });\n/* harmony import */ var acgraph__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! acgraph */ \"acgraph\");\n/* harmony import */ var acgraph__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(acgraph__WEBPACK_IMPORTED_MODULE_0__);\n\nclass DrawBoard {\n    constructor(GRID_NUM_Y, GRID_NUM_X, container) {\n        this.GRID_NUM_Y = GRID_NUM_Y;\n        this.GRID_NUM_X = GRID_NUM_X;\n        this.container = container;\n        this.createStep = () => {\n            this.stepLayer.zIndex(2);\n            this.stepLayer.setPosition(this.GRID_WIDTH * (this.GRID_NUM_X / 2 - 1), this.GRID_HEIGHT * (this.GRID_NUM_Y / 2 - 1));\n            this.stepLayer.rect(0, 0, this.GRID_WIDTH * 2, this.GRID_HEIGHT * 2).fill('#546E7A').stroke({ color: 'red', thickness: 0 });\n            this.stepText = this.stepLayer.text(0, 0, \"aaa\");\n            // const rect = this.stepLayer.rect(this.GRID_WIDTH * (this.GRID_NUM_X / 2 - 1), this.GRID_HEIGHT * (this.GRID_NUM_Y / 2 - 1), this.GRID_WIDTH * 2, this.GRID_HEIGHT * 2).fill('#546E7A').stroke({color: 'red', thickness: 0});\n        };\n        this.grid = () => {\n            this.gridLayer.remove();\n            this.gridLayer = this.stage.layer();\n            for (let x = 0; x <= this.GRID_NUM_X; ++x) {\n                this.gridLayer.path().moveTo(x * this.GRID_WIDTH, 0).lineTo(x * this.GRID_WIDTH, this.GRID_NUM_Y * this.GRID_HEIGHT).stroke({ color: '#95a5a6' });\n            }\n            for (let y = 0; y <= this.GRID_NUM_Y; ++y) {\n                this.gridLayer.path().moveTo(0, y * this.GRID_HEIGHT).lineTo(this.GRID_NUM_X * this.GRID_WIDTH, y * this.GRID_HEIGHT).stroke({ color: '#95a5a6' });\n            }\n        };\n        this.step = (num) => {\n            this.stepText.text(num.toString().padStart(2, \"0\"));\n            // context.fillText(cnt.toString().padStart(2, \"0\"), BOARD_SIZE / 2 - GRID_SIZE * 0.89, BOARD_SIZE / 2 + GRID_SIZE * 0.55, 72);\n        };\n        this.wall = (wallX, wallY) => {\n            this.wallLayer.remove();\n            this.wallLayer = this.stage.layer();\n            // 横\n            for (let y = 0; y <= this.GRID_NUM_Y; ++y) {\n                for (let x = 0; x < this.GRID_NUM_X; ++x) {\n                    if (!wallX[y][x])\n                        continue;\n                    let beginX = x * this.GRID_WIDTH;\n                    let beginY = y * this.GRID_HEIGHT;\n                    this.gridLayer.path().moveTo(beginX, beginY).lineTo(beginX + this.GRID_WIDTH, beginY).stroke({ color: '#546E7A' }, 6);\n                }\n            }\n            // 縦\n            for (let x = 0; x <= this.GRID_NUM_X; ++x) {\n                for (let y = 0; y < this.GRID_NUM_Y; ++y) {\n                    if (!wallY[y][x])\n                        continue;\n                    let beginX = x * this.GRID_WIDTH;\n                    let beginY = y * this.GRID_HEIGHT;\n                    this.gridLayer.path().moveTo(beginX, beginY).lineTo(beginX, beginY + this.GRID_HEIGHT).stroke({ color: '#546E7A' }, 6);\n                }\n            }\n        };\n        this.stage = acgraph__WEBPACK_IMPORTED_MODULE_0__[\"create\"](container);\n        this.GRID_WIDTH = container.clientWidth / GRID_NUM_X;\n        this.GRID_HEIGHT = container.clientHeight / GRID_NUM_Y;\n        this.gridLayer = this.stage.layer();\n        this.wallLayer = this.stage.layer();\n        this.stepLayer = this.stage.layer();\n        this.grid();\n        this.createStep();\n    }\n}\n;\n\n\n//# sourceURL=webpack:///./src/robot/DrawBoard.ts?");

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