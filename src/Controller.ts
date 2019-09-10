import DrawCamel from './DrawCamel';
import DrawGrid from './DrawGrid';
import DrawDice from './DrawDice';
import DrawAnnounce from './DrawAnnounce';
import DrawPlayer from './DrawPlayer';
import Server from './Server';
import * as firebase from 'firebase';
const db = firebase.database();
const PATH = 'CamelUp/';

// default
const CAMEL_COLOR = ['#00569b', '#39b20d', '#f56300', '#ffffff', '#ffd302'];
// Blue Set
// const CAMEL_COLOR = ['#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4'];

const Game = new Server();
const Camel = new DrawCamel(5, CAMEL_COLOR, 60, './src/images/camel.png', 'camel');
const Dice = new DrawDice(5, CAMEL_COLOR, 60, 'dice');
const Grid = new DrawGrid(16, Camel.CAMEL_GROUND, 30, 'grid');
const Announce = new DrawAnnounce('announce');
const Player = new DrawPlayer('player');

db.ref(PATH + 'camel').on('value', (res) => {
	Camel.draw(res.val());
});

db.ref(PATH + 'dice').on('value', (res) => {
	Dice.draw(res.val());
});

db.ref(PATH + 'grid').on('value', (res) => {
	Grid.GROUND = Camel.CAMEL_GROUND;
	Grid.draw(res.val());
});

db.ref(PATH + 'announce').on('value', (res) => {
	Announce.draw(res.val());
});

db.ref(PATH + 'player/name').on('value', (res) => {
	Player.drawName(res.val());
});

db.ref(PATH + 'player/point').on('value', (res) => {
	Player.drawPoint(res.val());
});

db.ref(PATH + 'player/token').on('value', (res) => {
	Player.drawToken(res.val());
});

db.ref(PATH + 'player/rank').on('value', (res) => {
	Player.drawRank(res.val());
});

db.ref(PATH + 'player/now').on('value', (res) => {
	Player.drawPlayerNow(res.val());
});

document.getElementById('Start').onclick = () => {
	const e = <HTMLInputElement> document.getElementById('playerNum');
	const PLAYER_NUM = parseInt(e.value);
	const PLAYER_NAME = new Array(PLAYER_NUM);
	for(let i = 0; i < PLAYER_NUM; ++i) {
		const eplayer = <HTMLInputElement> document.getElementById('player' + i.toString());
		PLAYER_NAME[i] = eplayer.value;
	}
	Grid.nameChange(PLAYER_NAME);
	Game.start(PLAYER_NAME);
}

document.getElementById('DiceRoll').onclick = () => {
	Game.DiceRoll();
}

document.getElementById('PanelSet').onclick = () => {
	const ex = <HTMLInputElement> document.getElementById('PanelSetX');
	const x = parseInt(ex.value);
	const estat = document.getElementsByName('PanelSetDetail');
	let move = 0;
	for(let i = 0; i < estat.length; i++) {
		const stat = <HTMLInputElement> estat[i];
		if(stat.checked) {
			move = (i == 0 ? 1 : -1);
		}
	}
	try {
		Game.PanelSet(x, move);
	}
	catch(e) {
		alert(e);
	}
}

document.getElementById('Bet').onclick = () => {
	const e = document.getElementsByName('BetColor');
	let id = 0;
	for(let i = 0; i < e.length; i++) {
		const color = <HTMLInputElement> e[i];
		if(color.checked) {
			id = i;
		}
	}
	try {
		Game.Bet(id);
	}
	catch(e) {
		alert(e);
	}
}

document.getElementById('FinalBet').onclick = () => {
	const estat = document.getElementsByName('FinalBetDetail');
	let stat = 0;
	for(let i = 0; i < estat.length; i++) {
		const ee = <HTMLInputElement> estat[i];
		if(ee.checked) {
			stat = i;
		}
	}
	const ecolor = document.getElementsByName('FinalBetColor');
	let id = 0;
	for(let i = 0; i < ecolor.length; i++) {
		const color = <HTMLInputElement> ecolor[i];
		if(color.checked) {
			id = i;
		}
	}
	try {
		Game.FinalBet(id, stat);
	}
	catch(e) {
		alert(e);
	}
}
