// Module **********************************************************************
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const http = require('http').Server(app);

// Port ************************************************************************
const server = http.listen(process.env.PORT || 3000, function() {
    console.log('Node.js is listening to PORT: ' + server.address().port);
});

let Infomation = [];
let id = 0
Infomation.push({'id' : id, 'ballSpeed' : 100, 'shotTime' : 200});
id++;
Infomation.push({'id' : id, 'ballSpeed' : 100, 'shotTime' : 200});
id++;
// Home ------------------------------------------------------------------------
app.get('/', function(_req, _res) {
	console.log('GET');
});
app.post('/', function(req, res) {
	console.log('POST');
	info = req.body;
	console.log(info);
	// res.end();
});
// json ------------------------------------------------------------------------
app.get('/json/', function(req, res) {
	console.log('GET json');
	console.log(Infomation);
	res.json(Infomation);
});



// const db = firebase.database();
// console.log('tourist says Hello.');
// db.ref('/hogehoge').set('pom');

// // CONST
// const N = 16;
// const ROBOT_NUM = 4;
// const ROBOT_COLOR = ['#ff1744', '#2ecc71', '#3498db', '#FFEB3B'];

// // ボード初期化
// let board;
// (function boardInit() {
// 	board = new Array(N);
// 	for(let i = 0; i < N; ++i) {
// 		board[i] = new Array(N);
// 		for(let j = 0; j < N; ++j) {
// 			board[i][j] = true;
// 		}
// 	}
// })();

// // 壁初期化
// let wallX, wallY;
// (function wallInit() {
// 	wallX = new Array(N + 1);
// 	wallY = new Array(N + 1);
// 	for(let i = 0; i <= N; ++i) {
// 		wallX[i] = new Array(N + 1);
// 		wallY[i] = new Array(N + 1);
// 	}
// 	for(let i = 0; i <= N; ++i) {
// 		wallY[i][0] = true;
// 		wallY[i][N] = true;
// 		wallX[0][i] = true;
// 		wallX[N][i] = true;
// 	}
// 	wallX[7][7] = true;
// 	wallX[7][8] = true;
// 	wallX[9][7] = true;
// 	wallX[9][8] = true;
// 	wallY[7][7] = true;
// 	wallY[8][7] = true;
// 	wallY[7][9] = true;
// 	wallY[8][9] = true;
// })();

// // 背景描画
// (function drawBackground() {
// 	const bgcanvas = document.getElementById('background');
// 	const bgcontext = bgcanvas.getContext('2d');
// 	bgcontext.clearRect(0, 0, bgcanvas.width, bgcanvas.height);
// 	bgcontext.globalAlpha = 1.0;
// 	bgcontext.lineWidth = 1;
// 	// グリッド描画
// 	bgcontext.strokeStyle = '#95a5a6';
// 	for(let x = 0; x <= N; ++x) {
// 		bgcontext.beginPath();
// 		bgcontext.moveTo(x * GRID_SIZE, 0);
// 		bgcontext.lineTo(x * GRID_SIZE, CANVAS_SIZE);
// 		bgcontext.stroke();
// 	}
// 	for(let y = 0; y <= N; ++y) {
// 		bgcontext.beginPath();
// 		bgcontext.moveTo(0, y * GRID_SIZE);
// 		bgcontext.lineTo(CANVAS_SIZE, y * GRID_SIZE);
// 		bgcontext.stroke();
// 	}
// 	// 壁描画
// 	bgcontext.strokeStyle = '#c0392b';
// 	bgcontext.lineWidth = 6;
// 	// 横
// 	for(let y = 0; y <= N; ++y) {
// 		for(let x = 0; x <= N; ++x) {
// 			if(!wallX[y][x]) continue;
// 			let beginX = x * GRID_SIZE;
// 			let beginY = y * GRID_SIZE;
// 			bgcontext.beginPath();
// 			bgcontext.moveTo(beginX, beginY);
// 			bgcontext.lineTo(beginX + GRID_SIZE, beginY);
// 			bgcontext.stroke();
// 		}
// 	}
// 	// 縦
// 	for(let x = 0; x <= N; ++x) {
// 		for(let y = 0; y <= N; ++y) {
// 			if(!wallY[y][x]) continue;
// 			let beginX = x * GRID_SIZE;
// 			let beginY = y * GRID_SIZE;
// 			bgcontext.beginPath();
// 			bgcontext.moveTo(beginX, beginY);
// 			bgcontext.lineTo(beginX, beginY + GRID_SIZE);
// 			bgcontext.stroke();
// 		}
// 	}
// })();

// // 再描画
// function drawAll() {
// 	context.clearRect(0, 0, canvas.width, canvas.height);
// 	drawRobots();
// }

// // let Robots = [{x : 0, y : 0}, {x : 0, y : N - 1}, {x : N - 1, y : 0}, {x : N - 1, y : N - 1}];

// // コンストラクタ
// function RobotConstructor(y, x, color, context) {
// 	this.img = new Image();
// 	this.img.src = '/images/android.png';
// 	this.context = context;
// 	this.startX = x;
// 	this.startY = y;
// 	this.x = this.startX;
// 	this.y = this.startY;
// 	this.color = color;
// 	this.moveOnce = async function(y, x) {
// 		const k = GRID_SIZE * 0.9;
// 		const dk = (GRID_SIZE - k) / 2;
// 		const sx = this.x * GRID_SIZE + dk;
// 		const sy = this.y * GRID_SIZE + dk;
// 		context.clearRect(sx, sy, k, k);
// 		board[this.y][this.x] = true;
// 		this.x = x;
// 		this.y = y;
// 		board[y][x] = false;
// 		this.draw();
// 	};
// 	this.draw = function() {
// 		const k = GRID_SIZE * 0.9;
// 		const dk = (GRID_SIZE - k) / 2;
// 		const sx = this.x * GRID_SIZE + dk;
// 		const sy = this.y * GRID_SIZE + dk;
// 		context.drawImage(this.img, sx, sy, k, k);
// 		let imageData = this.context.getImageData(sx, sy, k, k);
// 		const r = parseInt(color.substring(1, 3), 16);
// 		const g = parseInt(color.substring(3, 5), 16);
// 		const b = parseInt(color.substring(5, 7), 16);
// 		for(let i = 0; i < k; ++i) {
// 			for(let j = 0; j < k; ++j) {
// 				imageData.data[(i * k + j) * 4 + 0] = r;
// 				imageData.data[(i * k + j) * 4 + 1] = g;
// 				imageData.data[(i * k + j) * 4 + 2] = b;
// 			}
// 		}
// 		this.context.putImageData(imageData, sx, sy);
// 	};
// 	// 赤が右(0)方向に行きたいみたいな命令が来る
// 	this.move = function(dir) {
// 		const dx = [1, 0, -1, 0];
// 		const dy = [0, 1, 0, -1];
// 		while(true) {
// 			const nx = this.x + dx[dir];
// 			const ny = this.y + dy[dir];
// 			if(ny < 0 || N <= ny) break;
// 			if(nx < 0 || N <= nx) break;
// 			if(!board[ny][nx]) break;
// 			if(dir == 0 && wallY[ny][nx]) break;
// 			if(dir == 1 && wallX[ny][nx]) break;
// 			if(dir == 2 && wallY[this.y][this.x]) break;
// 			if(dir == 3 && wallX[this.y][this.x]) break;
// 			this.moveOnce(ny, nx);
// 		}
// 	};
// }

// let Robot = [];
// (function() {
// 	console.log("construcutor");
// 	Robot[0] = new RobotConstructor(0, 0, ROBOT_COLOR[0], context);
// 	Robot[1] = new RobotConstructor(0, N - 1, ROBOT_COLOR[1], context);
// 	Robot[2] = new RobotConstructor(N - 1, N - 1, ROBOT_COLOR[2], context);
// 	Robot[3] = new RobotConstructor(N - 1, 0, ROBOT_COLOR[3], context);
// 	// for(let i = 0; i < ROBOT_NUM; ++i) {
// 	// 	Robot[i] = new RobotConstructor(, , ROBOT_COLOR[i], context);
// 	// }
// })();

// function init() {
// 	Robot[0].moveOnce(0, 0);
// 	Robot[1].moveOnce(0, N - 1);
// 	Robot[2].moveOnce(N - 1, N - 1);
// 	Robot[3].moveOnce(N - 1, 0);
// };

// function drawRobots() {
// 	for(let i = 0; i < ROBOT_NUM; ++i) {
// 		Robot[i].move(i);
// 	}
// }

// function moveRed(dir) {
// 	Robot[0].move(dir);
// }
// function moveBlue(dir) {
// 	Robot[2].move(dir);
// }
// function moveGreen(dir) {
// 	Robot[1].move(dir);
// }
// function moveYellow(dir) {
// 	Robot[3].move(dir);
// }

// // drawAll();
