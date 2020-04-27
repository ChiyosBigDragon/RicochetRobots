import {DrawBoard} from './DrawBoard';
import * as firebase from 'firebase';
import * as acgraph from 'acgraph';
const db = firebase.database();
const PATH = 'RicochetRobots/';

const boardContainer = document.getElementById("board-container");
const board = new DrawBoard(4, 16, 16, boardContainer);

// const wallX = json['wall']['x'];
// const wallY = json['wall']['y'];
// const goal = json['goal'];
// board.wall(wallX, wallY);

const rob = [{x: 0, y: 0}, {x: 15, y: 15}, {x: 0, y: 15}, {x: 15, y: 0}, {x: 0, y: 0, id: 0}];
db.ref(PATH + 'robot').set(rob);
db.ref(PATH + 'step').set(15);

db.ref(PATH + 'wall').on('value', (res) => {
	board.wall(res.val().x, res.val().y);
});

db.ref(PATH + 'robot').on('value', (res) => {
	board.robot(res.val());
});

db.ref(PATH + 'step').on('value', (res) => {
	board.step(res.val());
});