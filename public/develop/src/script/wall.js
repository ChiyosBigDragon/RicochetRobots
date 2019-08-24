(function wallInit() {
	wallX = new Array(N + 1);
	wallY = new Array(N + 1);
	for(let i = 0; i <= N; ++i) {
		wallX[i] = new Array(N + 1);
		wallY[i] = new Array(N + 1);
		for(let j = 0; j <= N; ++j) {
			wallX[i][j] = false;
			wallY[i][j] = false;
		}
	}
	// 外周
	for(let i = 0; i <= N; ++i) {
		wallY[i][0] = true;
		wallY[i][N] = true;
		wallX[0][i] = true;
		wallX[N][i] = true;
	}
	// 中央
	wallX[7][7] = true;
	wallX[7][8] = true;
	wallX[9][7] = true;
	wallX[9][8] = true;
	wallY[7][7] = true;
	wallY[8][7] = true;
	wallY[7][9] = true;
	wallY[8][9] = true;
	// 固有X
	wallX[1][4] = true;
	wallX[1][12] = true;
	wallX[2][1] = true;
	wallX[3][14] = true;
	wallX[4][6] = true;
	wallX[4][8] = true;
	wallX[5][15] = true;
	wallX[6][0] = true;
	wallX[6][9] = true;
	wallX[6][11] = true;
	wallX[7][3] = true;
	wallX[10][1] = true;
	wallX[10][4] = true;
	wallX[10][15] = true;
	wallX[11][8] = true;
	wallX[11][13] = true;
	wallX[12][0] = true;
	wallX[13][6] = true;
	wallX[14][9] = true;
	wallX[14][14] = true;
	wallX[15][2] = true;
	// 固有Y
	wallY[0][2] = true;
	wallY[0][11] = true;
	wallY[1][4] = true;
	wallY[1][12] = true;
	wallY[2][2] = true;
	wallY[2][14] = true;
	wallY[3][7] = true;
	wallY[3][8] = true;
	wallY[5][10] = true;
	wallY[6][3] = true;
	wallY[6][12] = true;
	wallY[9][4] = true;
	wallY[10][2] = true;
	wallY[10][9] = true;
	wallY[11][13] = true;
	wallY[13][6] = true;
	wallY[13][9] = true;
	wallY[14][3] = true;
	wallY[14][15] = true;
	wallY[15][4] = true;
	wallY[15][12] = true;
	console.log(JSON.stringify(wallX));
	console.log(JSON.stringify(wallY));
})();