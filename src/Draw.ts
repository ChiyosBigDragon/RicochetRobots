import DrawCamel from './DrawCamel';
import DrawGrid from './DrawGrid';
import DrawDice from './DrawDice';
import Server from './Server';

// default
const CAMEL_COLOR = ['#00569b', '#39b20d', '#f56300', '#ffffff', '#ffd302'];
// Blue Set
// const CAMEL_COLOR = ['#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4'];

class Draw {
	public Game = new Server(5);
	public Camel = new DrawCamel(5, CAMEL_COLOR, 60, './src/images/camel.png', 'camel');
	public Dice = new DrawDice(5, CAMEL_COLOR, 60, 'dice');
	public Grid: DrawGrid;
	constructor() {
		this.init();
	}
	init = async() => {
		const ground = this.Camel.CAMEL_GROUND;
		this.Grid = new DrawGrid(16, ground, 30, 'grid');
	};
};

const camel = new Draw();



document.getElementById('init').onclick = () => {
	console.log(camel.Grid);
// 	Camel.draw({y: [5, 4, 3, 2, 1], x: [0, 0, 0, 0, 0]});
// 	Dice.draw([null, null, null, null, null]);
// 	Grid.draw({x: [null, null, null, null, null], move: [null, null, null, null, null]});
}

// document.getElementById('start').onclick = () => {
// 	const ret = Game.start();
// 	Camel.draw(ret.camel);
// 	Dice.draw(ret.dice);
// 	const Grid = new DrawGrid(16, 5, Camel.CAMEL_GROUND, 30, 'grid');
// 	Grid.draw(ret.panel);
// 	// Grid.draw({x: [null, null, null, null, null], move: [null, null, null, null, null]});
// }

// document.getElementById('DiceRoll').onclick = () => {
// 	const ret = Game.DiceRoll();
// 	Camel.draw(ret.camel);
// 	Dice.draw(ret.dice);
// }

// document.getElementById('PanelSet').onclick = () => {
// 	const ex = <HTMLInputElement> document.getElementById('PanelSetX');
// 	const x = parseInt(ex.value);
// 	const estat = document.getElementsByName('PanelSetDetail');
// 	let move = 0;
// 	for(let i = 0; i < estat.length; i++) {
// 		const stat = <HTMLInputElement> estat[i];
// 		if(stat.checked) {
// 			move = (i == 0 ? 1 : -1);
// 		}
// 	}
// 	try {
// 		const ret = Game.PanelSet(0, x, move);
// 		console.log(ret);
// 		const Grid = new DrawGrid(16, 5, Camel.CAMEL_GROUND, 30, 'grid');
// 		Grid.draw(ret);
// 	}
// 	catch(e) {
// 		alert(e);
// 	}
// }

// document.getElementById('draw').onclick = () => {
// 	const json = {y: [5, 4, 3, 2, 1], x: [1, 1, 1, 1, 1]};
// 	for(let i = 0; i < 5; ++i) {
// 		json.x[i] = Math.floor(Math.random() * 18);
// 		json.y[i] = Math.floor(Math.random() * 5) + 1;
// 	}
// 	Camel.draw(json);
// }

// document.getElementById('drawgrid').onclick = () => {
// 	const json = {x: [5, 4, 3, 2, 1], move: [1, 0, -1, 1, -5]};
// 	const Grid = new DrawGrid(16, 5, Camel.CAMEL_GROUND, 30, 'grid');
// 	Grid.draw(json);
// }

// // document.getElementById('dice').onclick = () => {
// // 	const 
// // }
