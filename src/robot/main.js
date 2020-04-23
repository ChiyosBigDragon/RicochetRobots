// const db = firebase.database();
// console.log('pom');
// db.ref('/hogehoge').set('pom');

// Canvas ----------------------------------------------------------------------
const canvas = document.getElementById('robots');
const context = canvas.getContext('2d');

// CONST
const BOARD_SIZE = canvas.height;
const N = 16;
const GRID_SIZE = BOARD_SIZE / N;
const ROBOT_NUM = 4;
const ROBOT_COLOR = ['#ff1744', '#2ecc71', '#3498db', '#FFB900', '#D500F9'];

// board[y][x] := (y, x)にオブジェクト
let board;
// goal := ゴールの配置列
let goal;

// ボード初期化
function boardInit() {
	board = new Array(N);
	for(let i = 0; i < N; ++i) {
		board[i] = new Array(N);
		for(let j = 0; j < N; ++j) {
			board[i][j] = true;
		}
	}
	// 中央
	board[7][7] = false;
	board[7][8] = false;
	board[8][7] = false;
	board[8][8] = false;
};

// wall(X|Y)[y][x] := (y, x)から(X|Y)方向に壁
let wallX, wallY;

// グリッド描画

// 壁描画

// 背景描画
function drawBackground() {
	drawGrid();
	drawWall();
};

// 壁とゴール読み込み
function gameInit() {
	const id = document.getElementById('stage').value.toString().padStart(3, '0');
	boardInit();
	const httpObj = new XMLHttpRequest();
	httpObj.open('get', './src/stage/' + id + '.json', true);
	httpObj.onload = function() {
		const data = JSON.parse(this.responseText);
		wallX = data['wall']['x'];
		wallY = data['wall']['y'];
		goal = data['goal'];
		drawBackground();
	}
	httpObj.send(null);
}
gameInit();

// 順位表描画
(function rankInit() {
	const canvas = document.getElementById('rank');
	const context = canvas.getContext('2d');
	context.font = "48px Oxanium";
	context.fillText('Score board, here', 0, 288, 320);
	// context.fillText('ちよたいりゅうひでまさ：2pt', 0, 32, 320);
	// context.fillText('あきせやまみつひこ：1pt', 0, 64, 320);
})();

function colorChange(imageData, color) {
	const w = imageData.width;
	const h = imageData.width;
	const r = parseInt(color.substring(1, 3), 16);
	const g = parseInt(color.substring(3, 5), 16);
	const b = parseInt(color.substring(5, 7), 16);
	for(let i = 0; i < w; ++i) {
		for(let j = 0; j < h; ++j) {
			imageData.data[(i * w + j) * 4 + 0] = r;
			imageData.data[(i * w + j) * 4 + 1] = g;
			imageData.data[(i * w + j) * 4 + 2] = b;
		}
	}
}

// コンストラクタ
function RobotConstructor(y, x, color, context) {
	this.img = new Image();
	this.img.src = './src/images/android.png';
	this.context = context;
	this.startX = x;
	this.startY = y;
	this.x = this.startX;
	this.y = this.startY;
	this.color = color;
	this.moveStart = function(y, x) {
		this.startY = y;
		this.startX = x;
		this.moveOnce(y, x);
	};
	this.moveOnce = function(y, x) {
		const k = GRID_SIZE * 0.9;
		const dk = (GRID_SIZE - k) / 2;
		const sx = this.x * GRID_SIZE + dk;
		const sy = this.y * GRID_SIZE + dk;
		context.clearRect(sx, sy, k, k);
		board[this.y][this.x] = true;
		this.x = x;
		this.y = y;
		board[y][x] = false;
		this.draw();
	};
	this.draw = function() {
		const k = GRID_SIZE * 0.9;
		const dk = (GRID_SIZE - k) / 2;
		const sx = this.x * GRID_SIZE + dk;
		const sy = this.y * GRID_SIZE + dk;
		context.drawImage(this.img, sx, sy, k, k);
		let imageData = this.context.getImageData(sx, sy, k, k);
		colorChange(imageData, this.color);
		this.context.putImageData(imageData, sx, sy);
	};
	// 赤が右(0)方向に行きたいみたいな命令が来る
	this.move = function(dir) {
		const dx = [1, 0, -1, 0];
		const dy = [0, 1, 0, -1];
		let moveResult = false;
		let px = this.x, py = this.y;
		while(true) {
			const nx = px + dx[dir];
			const ny = py + dy[dir];
			if(ny < 0 || N <= ny) break;
			if(nx < 0 || N <= nx) break;
			if(!board[ny][nx]) break;
			if(dir == 0 && wallY[ny][nx]) break;
			if(dir == 1 && wallX[ny][nx]) break;
			if(dir == 2 && wallY[py][px]) break;
			if(dir == 3 && wallX[py][px]) break;
			px = nx, py = ny;
			// this.moveOnce(ny, nx);
			moveResult = true;
		}
		if(moveResult) this.moveOnce(py, px);
		return moveResult;
	};
	this.select = function() {
		console.log('select');
		const canvas = document.getElementById('select');
		const context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);
		const k = GRID_SIZE * 0.9;
		const dk = (GRID_SIZE - k) / 2;
		const sx = this.x * GRID_SIZE + dk;
		const sy = this.y * GRID_SIZE + dk;
		context.fillStyle = 'rgba(255, 251, 59, 0.2)';
		context.fillRect(sx, sy, k, k);
		context.strokeStyle = '#D500F9';
		context.lineWidth = 3;
		context.strokeRect(this.x * GRID_SIZE, this.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
	};
}

let Robot = [];
(function() {
	console.log("construcutor");
	Robot[0] = new RobotConstructor(0, 0, ROBOT_COLOR[0], context);
	Robot[1] = new RobotConstructor(0, N - 1, ROBOT_COLOR[1], context);
	Robot[2] = new RobotConstructor(N - 1, N - 1, ROBOT_COLOR[2], context);
	Robot[3] = new RobotConstructor(N - 1, 0, ROBOT_COLOR[3], context);
	// ゴール
	Robot[4] = new RobotConstructor(N - 1, 0, ROBOT_COLOR[4], document.getElementById('goal').getContext('2d'));
	Robot[4].img.src = './src/images/android_goal.png';
})();

function goalInit() {
	// スタート位置記憶
	for(let i = 0; i < ROBOT_NUM; ++i) {
		Robot[i].moveStart(Robot[i].y, Robot[i].x);
	}
	commandReset();
	// ゴール
	while(true) {
		let m = goal[Math.floor(Math.random() * goal.length)];
		let y = m.y;
		let x = m.x;
		if(board[y][x]) {
			const color = Math.floor(Math.random() * ROBOT_NUM);
			Robot[ROBOT_NUM].color = ROBOT_COLOR[color];
			Robot[ROBOT_NUM].moveStart(y, x);
			board[y][x] = true;
			break;
		}
	}
}

function init() {
	// ロボット
	for(let i = 0; i < ROBOT_NUM; ++i) {
		while(true) {
			let y = Math.floor(Math.random() * N);
			let x = Math.floor(Math.random() * N);
			if(board[y][x]) {
				Robot[i].moveStart(y, x);
				break;
			}
		}
	}
	// ゴール
	// goalInit();
}

function commandReset() {
	str = '';
	count();
	resetBoard();
}

function resetBoard() {
	for(let i = 0; i < ROBOT_NUM; ++i) {
		Robot[i].moveOnce(Robot[i].startY, Robot[i].startX);
	}
	if(nowRobot != -1) Robot[nowRobot].select();
}

function count() {
	cnt = str.length / 2;
	const canvas = document.getElementById('count');
	const context = canvas.getContext('2d');
	context.fillStyle = 'white';
	context.font = "64px Oxanium";
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillText(cnt.toString().padStart(2, "0"), BOARD_SIZE / 2 - GRID_SIZE * 0.89, BOARD_SIZE / 2 + GRID_SIZE * 0.55, 72);
	console.log(cnt);
}

function countDecrement() {
	str = str.slice(0, -2);
	commandMove();
}

let str = '';
function submit() {
	db.ref('move').set(str);
}

function commandMove() {
	resetBoard();
	let n = str.length;
	const dir = {'d': 0, 's': 1, 'a': 2, 'w': 3};
	for(let i = 0; i < n; i += 2) {
		Robot[str[i]].move(dir[str[i + 1]]);
	}
	Robot[nowRobot].select();
	count();
}


let nowRobot = -1;
let colorXY = new Array(ROBOT_NUM);
function change(id) {
	console.log(nowRobot + "→" + id);
	nowRobot = id;
	Robot[nowRobot].select();
	const canvas = document.getElementById('command');
	const context = canvas.getContext('2d');
	const k = canvas.width;
	const RobotX = k * 0.2;
	const RobotY = k * 0.05;
	const RobotSIZE = k * 0.6;
	const imageData = context.getImageData(RobotX, RobotY, RobotSIZE, RobotSIZE);
	colorChange(imageData, ROBOT_COLOR[id]);
	context.putImageData(imageData, RobotX, RobotY);
}
function commandColorChange(x, y) {
	for(let i = 0; i < ROBOT_NUM; ++i) {
		if(x < colorXY[i].sx || colorXY[i].gx < x) continue;
		if(y < colorXY[i].sy || colorXY[i].gy < y) continue;
		change(i);
		return true;
	}
	return false;
}
function commandAdd(dir) {
	if(nowRobot == -1) return;
	if(!Robot[nowRobot].move(dir)) return;
	const d = ['d', 's', 'a', 'w'];
	str += nowRobot;
	str += d[dir];
	console.log(str);
	commandMove();
}
let commandXY = new Array(4);
function commandMoveChange(x4, y4) {
	// ⊿123と点4の内部判定
	for(let i = 0; i < 4; ++i) {
		let bool = true;
		const x1 = commandXY[i].x1;
		const y1 = commandXY[i].y1;
		const x2 = commandXY[i].x2;
		const y2 = commandXY[i].y2;
		const x3 = commandXY[i].x3;
		const y3 = commandXY[i].y3;
		const v12 = {x: x2 - x1, y: y2 - y1};
		const v24 = {x: x4 - x2, y: y4 - y2};
		let f = (v12.x * v24.y - v12.y * v24.x > 0);
		const v23 = {x: x3 - x2, y: y3 - y2};
		const v34 = {x: x4 - x3, y: y4 - y3};
		bool &= (f == (v23.x * v34.y - v23.y * v34.x > 0));
		const v31 = {x: x1 - x3, y: y1 - y3};
		const v14 = {x: x4 - x1, y: y4 - y1};
		bool &= (f == (v31.x * v14.y - v31.y * v14.x > 0));
		if(!bool) continue;
		commandAdd(i);
		return true;
	}
	return false;
}
// マウス操作
(function mouseInit() {
	// 場所
	function mouseLocate(e) {
		const rect = e.target.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		console.log(x + " " + y);
		return {x: x, y: y};
	}
	// クリック
	function mouseClick(e) {
		const xy = mouseLocate(e);
		if(!commandColorChange(xy.x, xy.y)) commandMoveChange(xy.x, xy.y);
	}
	const canvas = document.getElementById('commandMask');
	canvas.addEventListener('click', mouseClick, false);
})();

// コマンド描画
(function drawCommandPannel() {
	const canvas = document.getElementById('command');
	const context = canvas.getContext('2d');
	const k = canvas.width;
	const RobotX = k * 0.2;
	const RobotY = k * 0.05;
	const Robot = k * 0.6;
	const miniRobot = k * 0.2;
	const img = new Image();
	img.src = './src/images/android.png';
	img.onload = function() {
		context.drawImage(img, 0, k * 0.1, miniRobot, miniRobot);
		let imageData = context.getImageData(0, k * 0.1, miniRobot, miniRobot);
		// 左上
		colorChange(imageData, ROBOT_COLOR[0]);
		context.putImageData(imageData, 0, k * 0.1);
		colorXY[0] = {sx: 0, sy: k * 0.1, gx: 0 + miniRobot, gy: k * 0.1 + miniRobot};
		// 右上
		colorChange(imageData, ROBOT_COLOR[1]);
		context.putImageData(imageData, k * 0.8, k * 0.1);
		colorXY[1] = {sx: k * 0.8, sy: k * 0.1, gx: k * 0.8 + miniRobot, gy: k * 0.1 + miniRobot};
		// 左下
		colorChange(imageData, ROBOT_COLOR[3]);
		context.putImageData(imageData, 0, k * 0.35);
		colorXY[3] = {sx: 0, sy: k * 0.35, gx: 0 + miniRobot, gy: k * 0.35 + miniRobot};
		// 右下
		colorChange(imageData, ROBOT_COLOR[2]);
		context.putImageData(imageData, k * 0.8, k * 0.35);
		colorXY[2] = {sx: k * 0.8, sy: k * 0.35, gx: k * 0.8 + miniRobot, gy: k * 0.35 + miniRobot};
		// 中央
		context.drawImage(img, RobotX, RobotY, Robot, Robot);
	};
	// マスク
	const canvasMask = document.getElementById('commandMask');
	const maskContext = canvasMask.getContext('2d');
	maskContext.strokeStyle = 'rgb(0, 0, 0)';
	maskContext.fillStyle = 'rgba(0, 0, 255, 0.1)';
	const cx = RobotX + Robot / 2;
	const cy = RobotY + Robot / 2;
	// 上
	{
		const x1 = RobotX;
		const y1 = RobotY;
		const x2 = x1 + Robot;
		const y2 = y1;
		maskContext.beginPath();
		maskContext.moveTo(x1, y1);
		maskContext.lineTo(x2, y2);
		maskContext.lineTo(cx, cy);
		maskContext.closePath();
		maskContext.stroke();
		maskContext.fill();
		commandXY[3] = {x1: x1, y1: y1, x2: x2, y2: y2, x3: cx, y3: cy};
	}
	// 左
	{
		const x1 = RobotX;
		const y1 = RobotY;
		const x2 = x1;
		const y2 = y1 + Robot;
		maskContext.beginPath();
		maskContext.moveTo(x1, y1);
		maskContext.lineTo(x2, y2);
		maskContext.lineTo(cx, cy);
		maskContext.closePath();
		maskContext.stroke();
		maskContext.fill();
		commandXY[2] = {x1: x1, y1: y1, x2: x2, y2: y2, x3: cx, y3: cy};
	}
	// 下
	{
		const x1 = RobotX;
		const y1 = RobotY + Robot;
		const x2 = x1 + Robot;
		const y2 = y1;
		maskContext.beginPath();
		maskContext.moveTo(x1, y1);
		maskContext.lineTo(x2, y2);
		maskContext.lineTo(cx, cy);
		maskContext.closePath();
		maskContext.stroke();
		maskContext.fill();
		commandXY[1] = {x1: x1, y1: y1, x2: x2, y2: y2, x3: cx, y3: cy};
	}
	// 右
	{
		const x1 = RobotX + Robot;
		const y1 = RobotY;
		const x2 = x1;
		const y2 = y1 + Robot;
		maskContext.beginPath();
		maskContext.moveTo(x1, y1);
		maskContext.lineTo(x2, y2);
		maskContext.lineTo(cx, cy);
		maskContext.closePath();
		maskContext.stroke();
		maskContext.fill();
		commandXY[0] = {x1: x1, y1: y1, x2: x2, y2: y2, x3: cx, y3: cy};
	}
})();

function KeyUpFunc(e) {
	const code = e.keyCode;
	// console.log(code);
	// ロボット選択(1 - 4)
	if(49 <= code && code <= 52) {
		change(code - 49);
	}
	// テンキー
	if(97 <= code && code <= 100) {
		change(code - 97);
	}
	// 移動
	// 右(→, D)
	if(code == 39 || code == 68) {
		commandAdd(0);
	}
	// 下(↓, S)
	if(code == 40 || code == 83) {
		commandAdd(1);
	}
	// 左(←, A)
	if(code == 37 || code == 65) {
		commandAdd(2);
	}
	// 上(↑, W)
	if(code == 38 || code == 87) {
		commandAdd(3);
	}
	// 送信(Enter)
	if(code == 13) {
		submit();
	}
	// 削除(5)
	if(code == 53 || code == 101) {
		countDecrement();
	}
	// ゴール変更(C)
	if(code == 67) {
		goalInit();
	}
	// リセット(R)
	if(code == 82) {
		commandReset();
	}
}
document.addEventListener("keyup", KeyUpFunc);
