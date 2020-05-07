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
	// init
	db.ref(PATH + 'score/' + uid).set({name: userName, pt: 0});
	db.ref(PATH + 'mode/' + uid).set('vote');
	db.ref(PATH + 'vote/' + uid).set({});
	// init
	
	const server = new Server(uid, userName);
	const boardContainer = document.getElementById("board-container");
	const board = new DrawBoard(ROBOT_NUM, ROBOT_COLOR, 16, 16, boardContainer);
	const commandContainer = document.getElementById("command-container");
	const command = new DrawCommand(ROBOT_NUM, ROBOT_COLOR, uid, userName, server, commandContainer);
	const score = new DrawScore(server);
	const announceContainer = document.getElementById("announce-container");

	// reset
	if(document.getElementById('button-user-reset') != null) {
		document.getElementById('button-user-reset').onclick = () => {
			server.voteReset();
			db.ref(PATH + 'mode/').set({});
			db.ref(PATH + 'score/').set({});
		};
		document.getElementById('button-score-reset').onclick = () => {
			server.voteReset();
			db.ref(PATH + 'score/').once('value', (res) => {
				const obj = res.val();
				for(const key in obj) {
					obj[key].pt = 0;
				}
				db.ref(PATH + 'score/').set(obj);
			});
		};
		document.getElementById('button-vote-reset').onclick = () => {
			server.voteReset();
		};
		document.getElementById('button-goal-change').onclick = () => {
			server.goalChange();
		};
	}
	// reset

	db.ref(PATH + 'wall').on('value', (res) => {
		board.wall(res.val().x, res.val().y);
		server.wall(res.val().x, res.val().y);
	});

	db.ref(PATH + 'robot').on('value', (res) => {
		board.robot(res.val());
	});

	db.ref(PATH + 'select').on('value', (res) => {
		board.select(res.val());
		command.select(res.val());
	});

	db.ref(PATH + 'step').on('value', (res) => {
		board.step(res.val());
	});

	db.ref(PATH + 'mode/' + uid).on('value', (res) => {
		command.mode(res.val());
	});

	db.ref(PATH + 'announce/').on('value', (res) => {
		announceContainer.innerText = res.val();
	});

})();
