import {DrawBoard} from './DrawBoard';
import * as firebase from 'firebase';
import * as acgraph from 'acgraph';
const db = firebase.database();
const PATH = 'RicochetRobots/';

const boardContainer = document.getElementById("board-container");
const board = new DrawBoard(16, 16, boardContainer);

const json = {
	"wall": {
		"x": [
			[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],[false,false,false,false,true,false,false,false,false,false,false,false,true,false,false,false,false],[false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,false,false],[false,false,false,false,false,false,true,false,true,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,false],[true,false,false,false,false,false,false,false,false,true,false,true,false,false,false,false,false],[false,false,false,true,false,false,false,true,true,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,true,true,false,false,false,false,false,false,false,false],[false,true,false,false,true,false,false,false,false,false,false,false,false,false,false,true,false],[false,false,false,false,false,false,false,false,true,false,false,false,false,true,false,false,false],[true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,true,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,true,false,false,false,false,true,false,false],[false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]
		],
		"y": [
			[true,false,true,false,false,false,false,false,false,false,false,true,false,false,false,false,true],[true,false,false,false,true,false,false,false,false,false,false,false,true,false,false,false,true],[true,false,true,false,false,false,false,false,false,false,false,false,false,false,true,false,true],[true,false,false,false,false,false,false,true,true,false,false,false,false,false,false,false,true],[true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true],[true,false,false,false,false,false,false,false,false,false,true,false,false,false,false,false,true],[true,false,false,true,false,false,false,false,false,false,false,false,true,false,false,false,true],[true,false,false,false,false,false,false,true,false,true,false,false,false,false,false,false,true],[true,false,false,false,false,false,false,true,false,true,false,false,false,false,false,false,true],[true,false,false,false,true,false,false,false,false,false,false,false,false,false,false,false,true],[true,false,true,false,false,false,false,false,false,true,false,false,false,false,false,false,true],[true,false,false,false,false,false,false,false,false,false,false,false,false,true,false,false,true],[true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true],[true,false,false,false,false,false,true,false,false,true,false,false,false,false,false,false,true],[true,false,false,true,false,false,false,false,false,false,false,false,false,false,false,true,true],[true,false,false,false,true,false,false,false,false,false,false,false,true,false,false,false,true],[true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true]
		]
	},
	"goal": [
		{"x": 4, "y": 1}, {"x": 12, "y": 1}, {"x": 1, "y": 2}, {"x": 14, "y": 2}, {"x": 6, "y": 3}, {"x": 8, "y": 3}, {"x": 9, "y": 5}, {"x": 3, "y": 6}, {"x": 11, "y": 6}, {"x": 4, "y": 9}, {"x": 1, "y": 10}, {"x": 8, "y": 10}, {"x": 13, "y": 11}, {"x": 6, "y": 13}, {"x": 9, "y": 13}, {"x": 2, "y": 14}, {"x": 14, "y": 14}
	]
}

const wallX = json['wall']['x'];
const wallY = json['wall']['y'];
const goal = json['goal'];
board.wall(wallX, wallY);
board.step(0);


// const id = (0).toString().padStart(3, '0');
// const httpObj = new XMLHttpRequest();
// console.log('./src/stage/' + id + '.json');
// httpObj.open('get', './src/stage/' + id + '.json', true);


// httpObj.onload = function() {
// 	console.log(this.responseText);
// 	const data = JSON.parse(this.responseText);
// 	const wallX = data['wall']['x'];
// 	const wallY = data['wall']['y'];
// 	const goal = data['goal'];
// 	httpObj.send(null);
// 	board.wall(wallX, wallY);
// }

// const header = new DrawHeader(1080, 30, acgraph.create(stageContainer));
// const camel = new DrawCamel(5, CAMEL_COLOR, 1080 / (16 + 2), acgraph.create(stageContainer));
// const grid = new DrawGrid(16, 1080, 30, acgraph.create(stageContainer));
// const item = new DrawGoods(stageContainer);

// const playerContainer = document.createElement("div");
// playerContainer.id = "player-container";
// stageContainer.appendChild(playerContainer);

// const playerLeftContainer = document.createElement("div");
// playerLeftContainer.id = "player-left-container";
// playerContainer.appendChild(playerLeftContainer);

// const statusContainer = document.createElement("div");
// statusContainer.className = "status-container";
// const status = new DrawStatus(40, 540, statusContainer, document);
// playerLeftContainer.appendChild(statusContainer);

// const announceContainer = document.createElement("div");
// announceContainer.className = "announce-container";
// const announce = new DrawAnnounce(200, announceContainer, document);
// playerLeftContainer.appendChild(announceContainer);

// const controller = new DrawController(510, 540, 5, CAMEL_COLOR, acgraph.create(playerContainer));

// // stage.rect(0, 0, 1080, 720);
// // const headerLayer = stage.layer();
// // const camelLayer = stage.layer();
// // const gridLayer = stage.layer();
// // const announceLayer = stage.layer();
// // const Header = new DrawHeader(1080, 30, headerLayer);
// // const Grid = new DrawGrid(16, 1080, 30, gridLayer);
// // // const Camel = new DrawCamel(5, CAMEL_COLOR, 1080 / (16 + 2), camelLayer);
// // const Announce = new DrawAnnounce(1080, 50, announceLayer);
// // headerLayer.setPosition(0, 0);
// // // camelLayer.setPosition(0, headerLayer.getY() + parseFloat(headerLayer.domElement().getBoundingClientRect().height) + Camel.CAMEL_HEIGHT);
// // gridLayer.setPosition(0, camelLayer.getY() + parseFloat(camelLayer.domElement().getBoundingClientRect().height));
// // announceLayer.setPosition(0, gridLayer.getY() + parseFloat(gridLayer.domElement().getBoundingClientRect().height));
// // const Dice = new DrawDice(5, CAMEL_COLOR, 60, 'dice');

// // const Player = new DrawPlayer('player');

// db.ref(PATH + 'camel').on('value', (res) => {
// 	camel.draw(res.val());
// });

// // db.ref(PATH + 'dice').on('value', (res) => {
// // 	Dice.draw(res.val());
// // });

// // db.ref(PATH + 'grid').on('value', (res) => {
// // 	Grid.draw(res.val());
// // });

// db.ref(PATH + 'announce').on('value', (res) => {
// 	announce.draw(res.val());
// });

// db.ref(PATH + 'player/name').on('value', (res) => {
// // 	Grid.nameChange(res.val());
// 	status.init(res.val());
// });

// db.ref(PATH + 'player/point').on('value', (res) => {
// 	status.drawPoint(res.val());
// });

// // db.ref(PATH + 'player/token').on('value', (res) => {
// // 	Player.drawToken(res.val());
// // });

// // db.ref(PATH + 'player/rank').on('value', (res) => {
// // 	Player.drawRank(res.val());
// // });

// db.ref(PATH + 'player/now').on('value', (res) => {
// 	status.drawNameNow(res.val());
// })};