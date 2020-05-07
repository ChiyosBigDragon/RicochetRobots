import * as firebase from 'firebase';
const db = firebase.database();
const PATH = 'RicochetRobots/';

export class Server {
	private wallX;
	private wallY;
	constructor(private uid: string, private userName: string) {}
	public select = (robot_id: number) => {
		return db.ref(PATH + 'select').set(robot_id);
	};
	private moveRecover = (robot, move) => {
		const ROBOT_NUM = robot.length - 1;
		const N = this.wallX.length - 1;
		const dx = [1, 0, -1, 0];
		const dy = [0, 1, 0, -1];
		for(let i = 0; i < move.length; i += 2) {
			const robot_id = Number(move[i]);
			const dir = Number(move[i + 1]);
			let px = robot[robot_id].x;
			let py = robot[robot_id].y;
			while(true) {
				const nx = px + dx[dir];
				const ny = py + dy[dir];
				if(ny < 0 || N <= ny) break;
				if(nx < 0 || N <= nx) break;
				let robotExist = false;
				for(let i = 0; i < ROBOT_NUM; ++i) {
					if(i == robot_id) continue;
					if(robot[i].x == nx && robot[i].y == ny) {
						robotExist = true;
					}
				}
				if(robotExist) break;
				if(dir == 0 && this.wallY[ny][nx]) break;
				if(dir == 1 && this.wallX[ny][nx]) break;
				if(dir == 2 && this.wallY[py][px]) break;
				if(dir == 3 && this.wallX[py][px]) break;
				px = nx, py = ny;
			}
			robot[robot_id].x = px;
			robot[robot_id].y = py;
		}
		return robot;
	};
	public move = (dir) => {
		let robot_id = 0;
		db.ref(PATH + 'select').once('value', (res) => {
			robot_id = res.val();
		});
		db.ref(PATH + 'robot').once('value', async (res) => {
			const robot = res.val();
			const ROBOT_NUM = robot.length - 1;
			const N = this.wallX.length - 1;
			const dx = [1, 0, -1, 0];
			const dy = [0, 1, 0, -1];
			let px = robot[robot_id].x;
			let py = robot[robot_id].y;
			while(true) {
				const nx = px + dx[dir];
				const ny = py + dy[dir];
				if(ny < 0 || N <= ny) break;
				if(nx < 0 || N <= nx) break;
				let robotExist = false;
				for(let i = 0; i < ROBOT_NUM; ++i) {
					if(i == robot_id) continue;
					if(robot[i].x == nx && robot[i].y == ny) {
						robotExist = true;
					}
				}
				if(robotExist) break;
				if(dir == 0 && this.wallY[ny][nx]) break;
				if(dir == 1 && this.wallX[ny][nx]) break;
				if(dir == 2 && this.wallY[py][px]) break;
				if(dir == 3 && this.wallX[py][px]) break;
				px = nx, py = ny;
			}
			if(robot[robot_id].x == px && robot[robot_id].y == py) {
				return false;
			}
			robot[robot_id].x = px;
			robot[robot_id].y = py;
			let trueStep;
			await db.ref(PATH + 'step').once('value', (stepSnapshot) => {
				trueStep = stepSnapshot.val() + 1;
				db.ref(PATH + 'step').set(trueStep);
			});
			await db.ref(PATH + 'moveStr').once('value', (moveSnapshot) => {
				db.ref(PATH + 'moveStr').set(moveSnapshot.val() + String(robot_id) + String(dir));
			});
			await db.ref(PATH + 'robot').set(robot);
			if(robot[robot_id].x == robot[ROBOT_NUM].x && robot[robot_id].y == robot[ROBOT_NUM].y) {
				if(robot[ROBOT_NUM].id == ROBOT_NUM || robot_id == robot[ROBOT_NUM].id) {
					let step = 0; 
					await db.ref(PATH + 'vote/' + this.uid).once('value', (voteSnapshot) => {
						step = voteSnapshot.val().step;
					});
					if(trueStep <= step) {
						this.clear();
					}
				}
			}
			return true;
		});
	};
	public wall = (wallX, wallY) => {
		this.wallX = wallX;
		this.wallY = wallY;
	};
	public reset = () => {
		this.stepReset();
		db.ref(PATH + 'baseRobot').once('value', (baseSnapshot) => {
			db.ref(PATH + 'robot').set(baseSnapshot.val());
		});
	};
	public removeOnce = () => {
		db.ref(PATH + 'moveStr').once('value', (moveSnapshot) => {
			let move = moveSnapshot.val();
			if(move.length - 2 >= 0) db.ref(PATH + 'select').set(move[move.length - 2]);
			move = move.slice(0, move.length - 2);
			db.ref(PATH + 'moveStr').set(move);
			db.ref(PATH + 'baseRobot').once('value', (baseSnapshot) => {
				const robot = baseSnapshot.val();
				db.ref(PATH + 'robot').set(this.moveRecover(robot, move));
			});
			db.ref(PATH + 'step').once('value', (stepSnapshot) => {
				db.ref(PATH + 'step').set(Math.max(0, stepSnapshot.val() - 1));
			});
		});
	};
	private clear = () => {
		db.ref(PATH + 'announce/').set(`${this.userName} win!`);
		db.ref(PATH + 'score/' + this.uid).once('value', (scoreSnapshot) => {
			const obj = scoreSnapshot.val();
			obj.pt += 1;
			db.ref(PATH + 'score/' + this.uid).set(obj);
			db.ref(PATH + 'announce/').set(`${this.userName}: ${obj.pt}pt → ${obj.pt + 1}pt`);
		});
		db.ref(PATH + 'mode/' + this.uid).set('vote');
		this.goalChange();
		db.ref(PATH + 'announce/').set("投票受付中");
	};
	public voteEnd = () => {
		db.ref(PATH + 'vote/').once('value', (res) => {
			const vote = res.val();
			if(vote == null) {
				db.ref(PATH + 'mode/' + this.uid).set('vote');
				db.ref(PATH + 'announce/').set("投票受付中");
				return;				
			}
			const v = new Array();
			for(const key in vote) {
				const obj = vote[key];
				obj.uid = key;
				v.push(obj);
			}
			v.sort((lhs, rhs) => {
				return (Number)((lhs.step > rhs.step) || (lhs.step == rhs.step && lhs.time > rhs.time));
			});
			const top = v[0].uid;
			if(top == this.uid) {
				db.ref(PATH + 'mode/' + this.uid).set('move');
				db.ref(PATH + 'announce/').set(`${this.userName}の番です`);
			} else {
				db.ref(PATH + 'mode/' + this.uid).set('vote');
			}
		});
	};
	public vote = (step: number) => {
		db.ref(PATH + 'vote/').once('value', (res) => {
			const before = res.val();
			if(before == null) {
				db.ref(PATH + 'vote/' + this.uid).update({name: this.userName, step: step, time: new Date()});
				const date = new Date();
				date.setSeconds(date.getSeconds() + 32);
				db.ref(PATH + 'voteLimitTime/').update({uid: this.uid, time: date});
				return;
			}
			const v = new Array();
			for(const key in before) {
				const obj = before[key];
				obj.uid = key;
				v.push(obj);
			}
			v.sort((lhs, rhs) => {
				return (Number)((lhs.step > rhs.step) || (lhs.step == rhs.step && lhs.time > rhs.time));
			});
			const beforeTop = v[0].uid;
			v.push({uid: this.uid, name: this.userName, step: step, time: new Date()});
			v.sort((lhs, rhs) => {
				return (Number)((lhs.step > rhs.step) || (lhs.step == rhs.step && lhs.time > rhs.time));
			});
			const afterTop = v[0].uid;
			if(beforeTop != afterTop) {
				const date = new Date();
				date.setSeconds(date.getSeconds() + 32);
				db.ref(PATH + 'voteLimitTime/').update({uid: this.uid, time: date});
			}
			db.ref(PATH + 'vote/' + this.uid).update({name: this.userName, step: step, time: new Date()});
		});
	};
	public retire = () => {
		this.reset();
		db.ref(PATH + 'vote/' + this.uid).set({});
		db.ref(PATH + 'mode/' + this.uid).set('vote');
		db.ref(PATH + 'announce/').set(`${this.userName}がリタイアしました`);
		db.ref(PATH + 'vote/').once('value', (res) => {
			const vote = res.val();
			if(vote == null) {
				db.ref(PATH + 'announce/').set("投票受付中");
				return;
			}
			const v = new Array();
			for(const key in vote) {
				const obj = vote[key];
				obj.uid = key;
				v.push(obj);
			}
			v.sort((lhs, rhs) => {
				return (Number)((lhs.step > rhs.step) || (lhs.step == rhs.step && lhs.time > rhs.time));
			});
			const top = v[0].uid;
			db.ref(PATH + 'announce/').set(`${v[0].name}の番です`);
			db.ref(PATH + 'mode/' + top).set('move');
		});
	};
	public voteReset = () => {
		db.ref(PATH + 'vote/').set({});
		db.ref(PATH + 'mode/').once('value', (res) => {
			const obj = res.val();
			for(const key in obj) {
				obj[key] = "vote";
			}
		});
	};
	private stepReset = () => {
		db.ref(PATH + 'moveStr/').set("");
		db.ref(PATH + 'step/').set(0);
	};
	public goalChange = () => {
		this.voteReset();
		this.stepReset();
		db.ref(PATH + 'robot').once('value', async (res) => {
			// スタート位置記憶
			const robot = res.val();
			const ROBOT_NUM = robot.length - 1;
			// ゴール変更
			db.ref(PATH + 'goal').once('value', async (res) => {
				const goal = res.val();
				while(true) {
					const m = goal[Math.floor(Math.random() * goal.length)];
					let find = true;
					for(let i = 0; i < ROBOT_NUM; ++i) {
						if(robot[i].x == m.x && robot[i].y == m.y) {
							find = false;
						}
					}
					if(find) {
						const color = Math.floor(Math.random() * (ROBOT_NUM + 1));
						robot[ROBOT_NUM].id = color;
						robot[ROBOT_NUM].x = m.x;
						robot[ROBOT_NUM].y = m.y;
						break;
					}
				}
				db.ref(PATH + 'robot').set(robot);
				db.ref(PATH + 'baseRobot').set(robot);
			});
		});
	};
};
