const db = firebase.database();

db.ref('move').on('value', function(s) {
	const d = {'w': 0, 'a': 1, 's': 2, 'd': 3};
	for(let i = 0; i < s.length; i += 2) {
		const id = s[i];
		const dir = s[i + 1];
		move(id, d[dir]);
	}
});

function move(id, dir) {
	console.log(id + " " + dir);
	// Robot[id].move(dir);
}

// const db = firebase.database();
// console.log('pom');
// db.ref('/hogehoge').set('pom');

// const BOARD_SIZE = 640;
// const N = 16;
// const GRID_SIZE = BOARD_SIZE / N;
// const ROBOT_NUM = 4;
// const ROBOT_COLOR = ['#ff1744', '#2ecc71', '#3498db', '#FFEB3B', '#D500F9'];

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
// 	board[7][7] = false;
// 	board[7][8] = false;
// 	board[8][7] = false;
// 	board[8][8] = false;
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
// 	// 外周
// 	for(let i = 0; i <= N; ++i) {
// 		wallY[i][0] = true;
// 		wallY[i][N] = true;
// 		wallX[0][i] = true;
// 		wallX[N][i] = true;
// 	}
// 	// 中央
// 	wallX[7][7] = true;
// 	wallX[7][8] = true;
// 	wallX[9][7] = true;
// 	wallX[9][8] = true;
// 	wallY[7][7] = true;
// 	wallY[8][7] = true;
// 	wallY[7][9] = true;
// 	wallY[8][9] = true;
// 	// 固有X
// 	wallX[1][11] = true;
// 	wallX[2][5] = true;
// 	wallX[2][15] = true;
// 	wallX[3][7] = true;
// 	wallX[3][14] = true;
// 	wallX[4][0] = true;
// 	wallX[5][3] = true;
// 	wallX[5][6] = true;
// 	wallX[5][9] = true;
// 	wallX[6][1] = true;
// 	wallX[7][12] = true;
// 	wallX[9][12] = true;
// 	wallX[10][0] = true;
// 	wallX[10][15] = true;
// 	wallX[11][3] = true;
// 	wallX[11][5] = true;
// 	wallX[11][10] = true;
// 	wallX[12][14] = true;
// 	wallX[13][2] = true;
// 	wallX[13][4] = true;
// 	wallX[15][11] = true;	
// 	// 固有Y
// 	wallY[0][3] = true;
// 	wallY[0][9] = true;
// 	wallY[1][5] = true;
// 	wallY[1][11] = true;
// 	wallY[2][8] = true;
// 	wallY[3][15] = true;
// 	wallY[4][4] = true;
// 	wallY[4][10] = true;
// 	wallY[5][6] = true;
// 	wallY[6][2] = true;
// 	wallY[6][12] = true;
// 	wallY[9][12] = true;
// 	wallY[10][4] = true;
// 	wallY[10][11] = true;
// 	wallY[11][6] = true;
// 	wallY[12][2] = true;
// 	wallY[12][15] = true;
// 	wallY[13][4] = true;
// 	wallY[14][11] = true;
// 	wallY[15][4] = true;
// 	wallY[15][14] = true;
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
// 		for(let x = 0; x < N; ++x) {
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

// // 順位表描画
// (function rankInit() {
// 	const canvas = document.getElementById('rank');
// 	const context = canvas.getContext('2d');
// 	context.font = "32px serif";
// 	// context.fillText('ちよたいりゅうひでまさ：2pt', 0, 32, 320);
// 	// context.fillText('あきせやまみつひこ：1pt', 0, 64, 320);
// })();

// // 再描画
// function drawAll() {
// 	context.clearRect(0, 0, canvas.width, canvas.height);
// 	drawRobots();
// }

// // let Robots = [{x : 0, y : 0}, {x : 0, y : N - 1}, {x : N - 1, y : 0}, {x : N - 1, y : N - 1}];

// function colorChange(imageData, color) {
// 	const w = imageData.width;
// 	const h = imageData.width;
// 	const r = parseInt(color.substring(1, 3), 16);
// 	const g = parseInt(color.substring(3, 5), 16);
// 	const b = parseInt(color.substring(5, 7), 16);
// 	for(let i = 0; i < w; ++i) {
// 		for(let j = 0; j < h; ++j) {
// 			// 白抜き
// 			// if(imageData.data[(i * w + j) * 4 + 0] == 255) {
// 			// 	if(imageData.data[(i * w + j) * 4 + 1] == 255) {
// 			// 		if(imageData.data[(i * w + j) * 4 + 2] == 255) {
// 			// 			continue;
// 			// 		}		
// 			// 	}	
// 			// }
// 			imageData.data[(i * w + j) * 4 + 0] = r;
// 			imageData.data[(i * w + j) * 4 + 1] = g;
// 			imageData.data[(i * w + j) * 4 + 2] = b;
// 		}
// 	}
// }

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
// 	this.moveStart = function(y, x) {
// 		this.startY = y;
// 		this.startX = x;
// 		this.moveOnce(y, x);
// 	};
// 	this.moveOnce = function(y, x) {
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
// 		colorChange(imageData, this.color);
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
// 	// ゴール
// 	Robot[4] = new RobotConstructor(N - 1, 0, ROBOT_COLOR[4], document.getElementById('goal').getContext('2d'));
// 	Robot[4].img.src = '/images/android_goal.png';
// })();

// function goalInit() {
// 	// スタート位置記憶
// 	for(let i = 0; i < ROBOT_NUM; ++i) {
// 		Robot[i].moveStart(Robot[i].y, Robot[i].x);
// 	}
// 	cnt = 0;
// 	const goal = [{x: 5, y: 1}, {x: 11, y: 1}, {x: 7, y: 2}, {x: 14, y: 3}, {x: 3, y: 4}, {x: 9, y: 4}, {x: 6, y: 5}, {x: 1, y: 6}, {x: 12, y: 6}, {x: 12, y: 9}, {x: 3, y: 10}, {x: 10, y: 10}, {x: 5, y: 11}, {x: 2, y: 12}, {x: 14, y: 12}, {x: 4, y: 13}, {x: 11, y: 14}];
// 	// ゴール
// 	while(true) {
// 		let m = goal[Math.floor(Math.random() * goal.length)];
// 		let y = m.y;
// 		let x = m.x;
// 		// let y = Math.floor(Math.random() * N);
// 		// let x = Math.floor(Math.random() * N);
// 		if(board[y][x]) {
// 			const color = Math.floor(Math.random() * ROBOT_NUM);
// 			Robot[ROBOT_NUM].color = ROBOT_COLOR[color];
// 			Robot[ROBOT_NUM].moveStart(y, x);
// 			board[y][x] = true;
// 			const canvas = document.getElementById('rank');
// 			const context = canvas.getContext('2d');
// 			context.fillStyle = ROBOT_COLOR[color];
// 			context.fillRect(0, 0, canvas.width, canvas.height);
// 			break;
// 		}
// 	}
// }

// function init() {
// 	// ロボット
// 	for(let i = 0; i < ROBOT_NUM; ++i) {
// 		while(true) {
// 			let y = Math.floor(Math.random() * N);
// 			let x = Math.floor(Math.random() * N);
// 			if(board[y][x]) {
// 				Robot[i].moveStart(y, x);
// 				break;
// 			}
// 		}
// 	}
// 	// ゴール
// 	// goalInit();
// }


// function reset() {
// 	cnt = 0;
// 	count();
// 	for(let i = 0; i < ROBOT_NUM; ++i) {
// 		Robot[i].moveOnce(Robot[i].startY, Robot[i].startX);
// 	}
// }

// function count() {
// 	const canvas = document.getElementById('rank');
// 	const context = canvas.getContext('2d');
// 	context.fillStyle = 'black';
// 	context.font = "32px serif";
// 	context.clearRect(130, 130, 80, 50);
// 	context.fillText(cnt.toString(), canvas.width / 2, canvas.width / 2, 320);
// 	console.log(cnt);
// }

// let cnt = 0;
// function moveRed(dir) {
// 	Robot[0].move(dir);
// 	++cnt;
// 	count();
// }
// function moveBlue(dir) {
// 	Robot[2].move(dir);
// 	++cnt;
// 	count();
// }
// function moveGreen(dir) {
// 	Robot[1].move(dir);
// 	++cnt;
// 	count();
// }
// function moveYellow(dir) {
// 	Robot[3].move(dir);
// 	++cnt;
// 	count();
// }

// function countDecrement() {
// 	--cnt;
// 	count();
// }
// // drawAll();



// // Mouse -----------------------------------------------------------------------
// // function commandColorChange(x, y) {
// // 	return false;
// // }
// // (function mouseInit() {
// // 	// 場所
// // 	function mouseLocate(e) {
// // 		const rect = e.target.getBoundingClientRect();
// // 		const tx = e.clientX - rect.left;
// // 		const ty = e.clientY - rect.top;
// // 		const x = Math.floor(tx / divideSize) * divideSize;
// // 		const y = Math.floor(ty / divideSize) * divideSize;
// // 		return {x: x, y: y};
// // 	}
// // 	// クリック
// // 	function mouseClick(e) {
// // 		const xy = mouseLocate(e);
// // 		if(!commandColorChange(xy.x, xy.y)) commandMove(xy.x, xy.y);
// // 	}
// // 	// 追従
// // 	function mouseOver(e) {
// // 		const xy = mouseLocate(e);
// // 		drawAll();
// // 		mouseOverRect(xy.x, xy.y);
// // 	}
// // 	const canvas = document.getElementById('commandMask');
// // 	canvas.addEventListener('click', mouseClick, false);
// // 	canvas.addEventListener('mousemove', mouseOver, false);
// // 	canvas.addEventListener('mouseover', mouseOver, false);
// // 	canvas.addEventListener('mouseout', drawAll, false);
// // })();
// // コマンド描画
// (function commandInit() {
// 	const canvas = document.getElementById('command');
// 	const context = canvas.getContext('2d');
// 	const k = canvas.width;
// 	const RobotX = k * 0.2;
// 	const RobotY = k * 0.05;
// 	const Robot = k * 0.6;
// 	const miniRobot = k * 0.2;
// 	const img = new Image();
// 	img.src = '/images/android.png';
// 	img.onload = function() {
// 		context.drawImage(img, 0, k * 0.1, miniRobot, miniRobot);
// 		let imageData = context.getImageData(0, k * 0.1, miniRobot, miniRobot);
// 		// 左上
// 		colorChange(imageData, ROBOT_COLOR[0]);
// 		context.putImageData(imageData, 0, k * 0.1);
// 		// 右上
// 		colorChange(imageData, ROBOT_COLOR[1]);
// 		context.putImageData(imageData, k * 0.8, k * 0.1);
// 		// 左下
// 		colorChange(imageData, ROBOT_COLOR[3]);
// 		context.putImageData(imageData, 0, k * 0.35);
// 		// 右下
// 		colorChange(imageData, ROBOT_COLOR[2]);
// 		context.putImageData(imageData, k * 0.8, k * 0.35);
// 		context.drawImage(img, RobotX, RobotY, Robot, Robot);
// 	};
// 	// マスク
// 	const canvasMask = document.getElementById('commandMask');
// 	const maskContext = canvasMask.getContext('2d');
// 	maskContext.strokeStyle = 'rgb(0, 0, 0)';
// 	maskContext.fillStyle = 'rgba(0, 0, 255, 0.1)';
// 	// 上
// 	maskContext.beginPath();
// 	maskContext.moveTo(RobotX, RobotY);
// 	maskContext.lineTo(RobotX + Robot, RobotY);
// 	maskContext.lineTo(RobotX + Robot / 2, RobotY + Robot / 2);
// 	maskContext.closePath();
// 	maskContext.stroke();
// 	maskContext.fill();
// 	// 左
// 	maskContext.beginPath();
// 	maskContext.moveTo(RobotX, RobotY);
// 	maskContext.lineTo(RobotX, RobotY + Robot);
// 	maskContext.lineTo(RobotX + Robot / 2, RobotY + Robot / 2);
// 	maskContext.closePath();
// 	maskContext.stroke();
// 	maskContext.fill();
// 	// 下
// 	maskContext.beginPath();
// 	maskContext.moveTo(RobotX, RobotY + Robot);
// 	maskContext.lineTo(RobotX + Robot, RobotY + Robot);
// 	maskContext.lineTo(RobotX + Robot / 2, RobotY + Robot / 2);
// 	maskContext.closePath();
// 	maskContext.stroke();
// 	maskContext.fill();
// 	// 右
// 	maskContext.beginPath();
// 	maskContext.moveTo(RobotX + Robot, RobotY);
// 	maskContext.lineTo(RobotX + Robot, RobotY + Robot);
// 	maskContext.lineTo(RobotX + Robot / 2, RobotY + Robot / 2);
// 	maskContext.closePath();
// 	maskContext.stroke();
// 	maskContext.fill();
// })();
