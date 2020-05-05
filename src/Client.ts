import DrawCamel from './DrawCamel';
import DrawGrid from './DrawGrid';
import DrawDice from './DrawDice';
import DrawAnnounce from './DrawAnnounce';
import DrawPlayer from './DrawPlayer';
import * as firebase from 'firebase';
const db = firebase.database();
const PATH = 'CamelUp/';

// default
const CAMEL_COLOR = ['#00569b', '#39b20d', '#f56300', '#ffffff', '#ffd302'];
// Blue Set
// const CAMEL_COLOR = ['#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4'];

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
	Grid.nameChange(res.val());
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
