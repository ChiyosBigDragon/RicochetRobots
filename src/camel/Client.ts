import {DrawCamel} from './DrawCamel';
import {DrawDice} from './DrawDice';
import {DrawGrid} from './DrawGrid';
import {DrawAnnounce} from './DrawAnnounce';
import {DrawHeader} from './DrawHeader';
import {DrawStatus} from './DrawStatus';
import {DrawController} from './DrawController';
import * as firebase from 'firebase';
import * as acgraph from 'acgraph';
import {DrawGoods} from './DrawGoods';
const db = firebase.database();
const PATH = 'CamelUp/';

// default
const CAMEL_COLOR = ['#00569b', '#39b20d', '#f56300', '#ffffff', '#ffd302'];
// Blue Set
// const CAMEL_COLOR = ['#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4'];

const stageContainer = document.getElementById("stage-container");

const header = new DrawHeader(1080, 30, acgraph.create(stageContainer));
const camel = new DrawCamel(5, CAMEL_COLOR, 1080 / (16 + 2), acgraph.create(stageContainer));
const grid = new DrawGrid(16, 1080, 30, acgraph.create(stageContainer));
const item = new DrawGoods(stageContainer);

const playerContainer = document.createElement("div");
playerContainer.id = "player-container";
stageContainer.appendChild(playerContainer);

const playerLeftContainer = document.createElement("div");
playerLeftContainer.id = "player-left-container";
playerContainer.appendChild(playerLeftContainer);

const statusContainer = document.createElement("div");
statusContainer.className = "status-container";
const status = new DrawStatus(40, 540, statusContainer, document);
playerLeftContainer.appendChild(statusContainer);

const announceContainer = document.createElement("div");
announceContainer.className = "announce-container";
const announce = new DrawAnnounce(200, announceContainer, document);
playerLeftContainer.appendChild(announceContainer);

const controller = new DrawController(510, 540, 5, CAMEL_COLOR, acgraph.create(playerContainer));

// stage.rect(0, 0, 1080, 720);
// const headerLayer = stage.layer();
// const camelLayer = stage.layer();
// const gridLayer = stage.layer();
// const announceLayer = stage.layer();
// const Header = new DrawHeader(1080, 30, headerLayer);
// const Grid = new DrawGrid(16, 1080, 30, gridLayer);
// // const Camel = new DrawCamel(5, CAMEL_COLOR, 1080 / (16 + 2), camelLayer);
// const Announce = new DrawAnnounce(1080, 50, announceLayer);
// headerLayer.setPosition(0, 0);
// // camelLayer.setPosition(0, headerLayer.getY() + parseFloat(headerLayer.domElement().getBoundingClientRect().height) + Camel.CAMEL_HEIGHT);
// gridLayer.setPosition(0, camelLayer.getY() + parseFloat(camelLayer.domElement().getBoundingClientRect().height));
// announceLayer.setPosition(0, gridLayer.getY() + parseFloat(gridLayer.domElement().getBoundingClientRect().height));
// const Dice = new DrawDice(5, CAMEL_COLOR, 60, 'dice');

// const Player = new DrawPlayer('player');

db.ref(PATH + 'camel').on('value', (res) => {
	camel.draw(res.val());
});

// db.ref(PATH + 'dice').on('value', (res) => {
// 	Dice.draw(res.val());
// });

// db.ref(PATH + 'grid').on('value', (res) => {
// 	Grid.draw(res.val());
// });

db.ref(PATH + 'announce').on('value', (res) => {
	announce.draw(res.val());
});

db.ref(PATH + 'player/name').on('value', (res) => {
// 	Grid.nameChange(res.val());
	status.init(res.val());
});

db.ref(PATH + 'player/point').on('value', (res) => {
	status.drawPoint(res.val());
});

// db.ref(PATH + 'player/token').on('value', (res) => {
// 	Player.drawToken(res.val());
// });

// db.ref(PATH + 'player/rank').on('value', (res) => {
// 	Player.drawRank(res.val());
// });

db.ref(PATH + 'player/now').on('value', (res) => {
	status.drawNameNow(res.val());
});
