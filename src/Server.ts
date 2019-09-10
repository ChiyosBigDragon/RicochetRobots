import Dice from './Dice';
import Sleep from './Sleep';
import * as firebase from 'firebase';
import * as numeral from 'numeral';
const db = firebase.database();
const PATH = 'CamelUp/';

export default class Server {
	private dice: Dice;
	private camel: {x: number[], y: number[]};
	private board: number[][];
	private PLAYER_NUM: number;
	private PLAYER_NAME: string[];
	private playerPanel: {x: number[], move: number[]};
	private playerNow: number;
	private playerToken: number;
	private playerCamel: {color: number, pt: number}[][];
	private playerFinalBet: boolean[];
	private playerPoint: number[];
	private panel: number[];
	private panelPlayer: number[];
	private betCamel: number[][];
	private finalBetCamel: {player: number, color: number}[][];
	constructor(private CAMEL_NUM: number = 5, private BOARD_SIZE: number = 16, private MOVE_NUM: number = 3, private POINT_INIT: number = 3) {
	};
	private shuffle = (arr: any[]) => {
		for(let i = arr.length - 1; i > 0; i = 0 | i - 1) {
			const j = 0 | Math.random() * (i + 1);
			const swap = arr[i];
			arr[i] = arr[j];
			arr[j] = swap;
		}
	};
	private randomStart = () => {
		for(let id = 0; id < this.CAMEL_NUM; ++id) {
			this.MoveForward(id, this.dice.roll().move);
		}
		this.dice.init();
	};
	private MoveForward = (id: number, move: number) => {
		// 前座標取得
		const px = this.camel.x[id];
		const py = this.camel.y[id];
		// 移動するラクダ数をカウント
		let num = 0;
		for(let dy = 0; ; ++dy) {
			const ny = py - dy;
			if(ny == 0) break;
			if(this.board[px][ny] != null) {
				++num;
			}
		}
		// 次座標の計算
		let nx = px + move;
		let endFlg = false;
		if(nx > this.BOARD_SIZE) {
			nx = this.BOARD_SIZE + 1;
			endFlg = true;
		}
		let ny = 0;
		for(let y = this.CAMEL_NUM; y > 0; --y) {
			if(this.board[nx][y] == null) {
				ny = y;
				break;
			}
		}
		// 次座標へのプロットと前座標の削除
		for(let dy = 0; dy < num; ++dy) {
			const id = this.board[px][py - dy];
			this.camel.x[id] = nx;
			this.camel.y[id] = ny - dy;
			this.board[nx][ny - dy] = this.board[px][py - dy];
			this.board[px][py - dy] = null;
		}
		return endFlg;
	};
	private MoveBackward = (id: number, move: number) => {
		// 前座標取得
		const px = this.camel.x[id];
		const py = this.camel.y[id];
		// 移動するラクダ数をカウント
		let num = 0;
		for(let dy = 0; ; ++dy) {
			const ny = py - dy;
			if(ny == 0) break;
			if(this.board[px][ny] != null) {
				++num;
			}
		}
		// 次座標の計算
		let nx = px - move;
		if(nx < 0) {
			nx = 0;
		}
		// 次座標のラクダをyスライド
		for(let y = 1; y <= this.CAMEL_NUM; ++y) {
			const id = this.board[nx][y];
			if (id != null) {
				this.camel.y[id] -= num;
				this.board[nx][y - num] = this.board[nx][y];
				this.board[nx][y] = null;
			}
		}
		// 次座標へのプロットと前座標の削除
		for(let dy = 0; dy < num; ++dy) {
			const id = this.board[px][py - dy];
			this.camel.x[id] = nx;
			this.camel.y[id] = this.CAMEL_NUM - dy;
			this.board[nx][this.CAMEL_NUM - dy] = this.board[px][py - dy];
			this.board[px][py - dy] = null;
		}
	};
	private getCamelRank = () => {
		const ret = new Array(this.CAMEL_NUM);
		let rank = 1;
		for(let x = this.BOARD_SIZE + 1; x > 0; --x) {
			for(let y = 1; y <= this.CAMEL_NUM; ++y) {
				const id = this.board[x][y];
				if(id != null) {
					ret[id] = rank;
					++rank;
				}
			}
		}
		return ret;
	};
	private getPlayerRank = () => {
		const arr = new Array(this.PLAYER_NUM);
		for(let i = 0; i < this.PLAYER_NUM; ++i) {
			arr[i] = {point: this.playerPoint[i], player: i};
		}
		arr.sort((lhs, rhs) => {
			if(lhs.point < rhs.point) return 1;
			return 0;
		});
		const ret = new Array(this.PLAYER_NUM);
		for(let i = 0; i < this.PLAYER_NUM; ++i) {
			ret[i] = arr[i].player;
		}	
		return ret;
	};
	private PointCalc = async () => {
		this.running('Point Calc');
		const rank = this.getCamelRank();
		await Sleep(2000);
		for(let i = 0; i < this.PLAYER_NUM; ++i) {
			const pre = this.playerPoint[i];
			let diff = 0;
			while(this.playerCamel[i].length) {
				const {color, pt} = this.playerCamel[i].shift();
				if(color == -1) {
					diff += 1;
				} else {
					if(rank[color] == 1) {
						diff += pt;
					} else if(rank[color] == 2) {
						diff += 1;
					} else {
						diff += -1;
					}
				}
			}
			this.playerPoint[i] += diff;
			this.running(this.PLAYER_NAME[i] + ': ' + pre + 'pt -> ' + this.playerPoint[i] + 'pt');
			await Sleep(2000);
		}
		db.ref(PATH + 'player/point').set(this.playerPoint);
	};
	private finish = async () => {
		await this.PointCalc();
		await this.FinalCalc();
		await this.Result();
	};
	private Result = async () => {
		this.running('Result');
		await Sleep(2000);
		const player = this.getPlayerRank();
		for(let rank = this.PLAYER_NUM - 1; rank >= 0; --rank) {
			db.ref(PATH + 'player/rank/' + player[rank].toString()).set(rank + 1);
			const str = numeral(rank + 1).format('0o') + ': ' + this.PLAYER_NAME[player[rank]];
			this.running(str);
			await Sleep(2000);
		}
		this.running('Press Start');
	};
	private FinalCalc = async () => {
		this.running('Final Calc');
		const point = [8, 5, 3, 2, 1, 1, 1, 1, 1, 1, 1];
		const rank = this.getCamelRank();
		await Sleep(2000);
		{
			this.running('Last');
			const pt = point.concat();
			await Sleep(2000);
			while(this.finalBetCamel[1].length) {
				const {player, color} = this.finalBetCamel[1].shift();
				this.running('Last: ' + this.PLAYER_NAME[player] + ' bet on');
				await Sleep(2000);
				this.running('Last: ' + this.PLAYER_NAME[player] + ' bet on ' + color);
				const pre = this.playerPoint[player];
				if(rank[color] == this.CAMEL_NUM) {
					this.playerPoint[player] += pt.shift();
				} else {
					this.playerPoint[player] += -1;
				}
				await Sleep(2000);
				this.running(this.PLAYER_NAME[player] + ': ' + pre + 'pt -> ' + this.playerPoint[player] + 'pt');
				db.ref(PATH + 'player/point').set(this.playerPoint);
				await Sleep(2000);
			}
		}
		{
			this.running('Top');
			const pt = point.concat();
			await Sleep(2000);
			while(this.finalBetCamel[0].length) {
				const {player, color} = this.finalBetCamel[0].shift();
				this.running('Top: ' + this.PLAYER_NAME[player] + ' bet on');
				await Sleep(2000);
				this.running('Top: ' + this.PLAYER_NAME[player] + ' bet on ' + color);
				const pre = this.playerPoint[player];
				if(rank[color] == 1) {
					this.playerPoint[player] += pt.shift();
				} else {
					this.playerPoint[player] += -1;
				}
				await Sleep(2000);
				this.running(this.PLAYER_NAME[player] + ': ' + pre + 'pt -> ' + this.playerPoint[player] + 'pt');
				db.ref(PATH + 'player/point').set(this.playerPoint);
				await Sleep(2000);
			}
		}
	};
	private PanelReset = () => {
		this.panel = new Array(this.BOARD_SIZE + 1);
		this.panelPlayer = new Array(this.BOARD_SIZE + 1);
		for(let x = 0; x < this.BOARD_SIZE + 1; ++x) {
			this.panel[x] = null;
			this.panelPlayer[x] = null;
		}
		this.playerPanel = {x: new Array(this.PLAYER_NUM), move: new Array(this.PLAYER_NUM)};
		for(let i = 0; i < this.PLAYER_NUM; ++i) {
			this.playerPanel.x[i] = null;
			this.playerPanel.move[i] = null;
		}
		db.ref('CamelUp/grid').set(this.playerPanel);
	};
	private BetReset = () => {
		this.playerCamel = new Array(this.PLAYER_NUM);
		for(let i = 0; i < this.PLAYER_NUM; ++i) {
			this.playerCamel[i] = new Array(0);
		}
		this.betCamel = new Array(this.CAMEL_NUM);
		const bet = [5, 3, 2];
		for(let i = 0; i < this.CAMEL_NUM; ++i) {
			this.betCamel[i] = bet.concat();
		}
	};
	private init = (PLAYER_NAME: string[]) => {
		console.log('Init');
		this.PLAYER_NUM = PLAYER_NAME.length;
		this.PLAYER_NAME = PLAYER_NAME;
		console.log(this.PLAYER_NAME);
		this.dice = new Dice(this.CAMEL_NUM, this.MOVE_NUM);
		this.board = new Array(this.BOARD_SIZE + 2);
		for(let x = 0; x < this.BOARD_SIZE + 2; ++x) {
			this.board[x] = new Array(this.CAMEL_NUM + 1);
			for(let y = 0; y < this.CAMEL_NUM + 1; ++y) {
				this.board[x][y] = null;
			}
		}
		this.camel = {x: new Array(this.CAMEL_NUM), y: new Array(this.CAMEL_NUM)};
		for(let i = 0; i < this.CAMEL_NUM; ++i) {
			this.camel.x[i] = 0;
			this.camel.y[i] = i + 1;
			this.board[0][i + 1] = i;
		}
		this.PanelReset();
		this.playerPoint = new Array(this.PLAYER_NUM);
		for(let i = 0; i < this.PLAYER_NUM; ++i) {
			this.playerPoint[i] = this.POINT_INIT;
		}
		this.playerNow = -1;
		this.playerToken = 0;
		this.BetReset();
		this.finalBetCamel = new Array(2);
		for(let i = 0; i < 2; ++i) {
			this.finalBetCamel[i] = new Array(0);
		}
		this.playerFinalBet = new Array(this.CAMEL_NUM);
		for(let i = 0; i < this.CAMEL_NUM; ++i) {
			this.playerFinalBet[i] = false;
		}
	};
	private running = (action: string) => {
		console.log(action);
		db.ref(PATH + 'announce/').set(action);
	};
	private playerRunning = (action: string) => {
		const str = this.PLAYER_NAME[this.playerNow] + ': ' + action;
		console.log(str);
		db.ref(PATH + 'announce/').set(str);
	};
	private playerNext = () => {
		++this.playerNow;
		this.playerNow %= this.PLAYER_NUM;
		db.ref(PATH + 'player/now').set(this.playerNow);
		const str = this.PLAYER_NAME[this.playerNow] + ': thinking';
		console.log(str);
		db.ref(PATH + 'announce/').set(str);
	};
	private playerNextToken = async () => {
		++this.playerToken;
		this.playerToken %= this.PLAYER_NUM;
		this.playerNow = this.playerToken;
		this.BetReset();
		db.ref(PATH + 'announce/').set('New Leg Start');
		console.log('New Leg Start');
		db.ref(PATH + 'player/token').set(this.playerToken);
		db.ref(PATH + 'player/now').set(this.playerNow);
		this.PanelReset();
		await Sleep(2000);
		const str = this.PLAYER_NAME[this.playerNow] + ': thinking';
		console.log(str);
		db.ref(PATH + 'announce/').set(str);
	};
	public start = async (PLAYER_NAME: string[]) => {
		this.init(PLAYER_NAME);
		db.ref(PATH + 'camel/').set(this.camel);
		db.ref(PATH + 'dice/').set(this.dice.status());
		db.ref(PATH + 'grid/').set(this.playerPanel);
		db.ref(PATH + 'player/').set({name: this.PLAYER_NAME});
		this.running('Start');
		await Sleep(2000);
		this.running("Shuffle Players");
		this.shuffle(this.PLAYER_NAME);
		db.ref(PATH + 'player/').set({
			name: this.PLAYER_NAME,
			point: this.playerPoint,
			token: this.playerToken,
			now: this.playerNow
		});
		console.log(this.PLAYER_NAME);
		await Sleep(2000);
		this.running("Set Camels");
		this.randomStart();
		db.ref(PATH + 'camel/').set(this.camel);
		console.log(this.camel);
		await Sleep(2000);
		this.playerNext();
	};
	public DiceRoll = async () => {
		this.playerRunning('Dice');
		const {color, move, endFlg} = this.dice.roll();
		this.playerCamel[this.playerNow].push({color: -1, pt: 1});
		db.ref(PATH + 'dice/').set(this.dice.status());
		console.log('Camel: ' + color + ', Move: ' + move);
		if(this.MoveForward(color, move)) {
			db.ref(PATH + 'camel/').set(this.camel);
			this.finish();
			return;
		}
		db.ref(PATH + 'camel/').set(this.camel);
		const panel = this.panel[this.camel.x[color]];
		if(panel > 0) {
			await Sleep(1000);
			console.log('Get Oasis');
			this.playerCamel[this.panelPlayer[this.camel.x[color]]].push({color: -1, pt: 1});
			this.MoveForward(color, panel);
		}
		if(panel < 0) {
			await Sleep(1000);
			console.log('Get Mirage');
			this.playerCamel[this.panelPlayer[this.camel.x[color]]].push({color: -1, pt: 1});
			this.MoveBackward(color, -panel);
		}
		db.ref(PATH + 'camel/').set(this.camel);
		await Sleep(2000);
		if(endFlg) {
			await this.PointCalc();
			await Sleep(2000);
			this.dice.init();
			db.ref(PATH + 'dice/').set(this.dice.status());
			this.playerNextToken();
		} else {
			this.playerNext();
		}
	};
	public Bet = async (color: number) => {
		const pt = this.betCamel[color].shift();
		if(pt == undefined) throw 'You can\'t bet on this camel.';
		this.playerRunning('Bet on ' + color.toString());
		this.playerCamel[this.playerNow].push({color: color, pt: pt});
		await Sleep(2000);
		this.playerNext();
	};
	public PanelSet = async (x: number, move: number) => {
		const px = this.playerPanel.x[this.playerNow];
		const pmove = this.playerPanel.move[this.playerNow];
		this.panel[px] = null;
		if(x < 2 || this.BOARD_SIZE < x) throw 'You can\'t place here.';
		let able = true;
		if(this.panel[x] != null) able = false;
		if(this.board[x][this.CAMEL_NUM] != null) able = false;
		if(this.panel[x - 1] != null) able = false;
		if(this.panel[x + 1] != null) able = false;
		if(!able) {
			this.playerPanel.x[this.playerNow] = px;
			this.playerPanel.move[this.playerNow] = pmove;
			this.panel[px] = pmove;
			throw 'You can\'t place here.';
		}
		this.playerRunning('Panel');
		this.playerPanel.x[this.playerNow] = x;
		this.playerPanel.move[this.playerNow] = move;
		this.panel[x] = move;
		this.panelPlayer[x] = this.playerNow;
		db.ref('CamelUp/grid').set(this.playerPanel);
		await Sleep(2000);
		this.playerNext();
	};
	public FinalBet = async (color: number, stat: number) => {
		if(this.playerFinalBet[this.playerNow][color]) throw 'You can\'t bet on this camel.';
		this.playerRunning('FinalBet for ' + (stat == 0 ? 'Top' : 'Last'));
		this.finalBetCamel[stat].push({player: this.playerNow, color: color});
		await Sleep(2000);
		this.playerNext();
	};
};

