import {DrawBoard} from './DrawBoard';
import {DrawCommand} from './DrawCommand';
import {DrawScore} from './DrawScore';
import {Server} from './Server';
import * as firebase from 'firebase';
const db = firebase.database();
const PATH = 'RicochetRobots/';
const ROBOT_NUM = 4;
const ROBOT_COLOR = ['#ff1744', '#2ecc71', '#3498db', '#FFB900'];
const randomName = (min = 4, max = 6) => {
	const range = max - min + 1;
	const n = min + Math.floor(Math.random() * range);
	let name = "";
	const lb = 0x3042, ub = 0x3093;
	const span = ub - lb + 1;
	for(let i = 0; i < n; ++i) {
		name += String.fromCodePoint(lb + Math.floor(Math.random() * span));
	}
	return name;
};


(async () => {
	const userName = (() => {
		const defaultName = randomName(4, 6);
		let userName = window.prompt("User Name?", defaultName);
		if(userName == "" || userName == null){
			userName = defaultName;
		}
		return userName;
	})();
	await firebase.auth().signInAnonymously().catch((error) => {
		console.log(`[error] Cannot SignIn Anonymouse (${error.code} : ${error.message})`);
	});
	let uid;
	await firebase.auth().onAuthStateChanged((user) => {
		if(user) {
			uid = user.uid;
		}
	});
	db.ref(PATH + 'score/' + uid).set({name: userName, pt: 0});
	db.ref(PATH + 'vote/' + uid).set({name: userName, step: 1000, time: new Date()});
	
	const server = new Server(uid, userName);
	const boardContainer = document.getElementById("board-container");
	const board = new DrawBoard(ROBOT_NUM, ROBOT_COLOR, 16, 16, boardContainer);
	const commandContainer = document.getElementById("command-container");
	const command = new DrawCommand(ROBOT_NUM, ROBOT_COLOR, uid, userName, server, commandContainer);
	const scoreContainer = document.getElementById("info-container");
	const score = new DrawScore(scoreContainer);

	// reset
	// db.ref(PATH + 'baseRobot').set([{x: 0, y: 0}, {x: 15, y: 0}, {x: 0, y: 15}, {x: 15, y: 15}, {x: 9, y: 5, id: 0}]);
	// db.ref(PATH + 'robot').set([{x: 0, y: 0}, {x: 15, y: 0}, {x: 0, y: 15}, {x: 15, y: 15}, {x: 9, y: 5, id: 0}]);
	// db.ref(PATH + 'vote/12').update({name: "稀勢の里寛", step: 1, time: "2020-05-04T11:45:05.906Z"});
	// db.ref(PATH + 'vote/34').update({name: "鶴竜力三郎", step: 2, time: new Date()});
	// db.ref(PATH + 'vote/56').update({name: "日馬富士公平", step: 2, time: new Date()});
	// db.ref(PATH + 'vote/78').update({name: "白鵬翔", step: 5, time: new Date()});
	// db.ref(PATH + 'vote/90').update({name: "朝青龍明徳", step: 2, time: "2020-05-04T11:45:05.906Z"});
	// server.reset();
	// reset

	db.ref(PATH + 'wall').on('value', (res) => {
		board.wall(res.val().x, res.val().y);
		server.wall(res.val().x, res.val().y);
	});

	db.ref(PATH + 'robot').on('value', (res) => {
		board.robot(res.val());
		// command.robot(res.val());
	});

	db.ref(PATH + 'select').on('value', (res) => {
		board.select(res.val());
	});

	db.ref(PATH + 'step').on('value', (res) => {
		board.step(res.val());
	});

})();
