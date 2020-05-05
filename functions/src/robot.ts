// import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin';

// admin.initializeApp();
// const PATH = 'RicochetRobots/';
// const db = admin.database();
// const f = functions.region('asia-northeast1');

// module.exports.vote = f.database.ref(PATH + 'vote').onUpdate((change, _context) => {
// 	const before = change.before.val();
// 	const after = change.after.val();

// 	const json = snapshot.val();
// 	if(!("type" in json)) return false;
// 	const type = json.type;
// 	console.log(type);
// 	if(type == "move") {
// 		move(json);
// 	}
// 	if(type == "change") {
// 		change(json);
// 	}
// 	db.ref(PATH + 'command').set(null);
// 	return true;
// });

// const change = (obj: any) => {
// 	if(!('robot_id' in obj)) return false;
// 	const robot_id = obj['robot_id'];
// 	db.ref(PATH + 'robot').once('value', (res) => {
// 		const robot = res.val();
// 		for(let i = 0; i < robot.length - 1; ++i) {
// 			robot[i].select = (i == robot_id);
// 		}
// 		db.ref(PATH + 'robot').set(robot);
// 		return true;
// 	});
// 	return false;
// };

// const move = (obj: any) => {
// 	if(!('dir' in obj)) return false;
// 	const dir = obj['dir'];
// 	db.ref(PATH + 'robot').once('value', (robotSnapshot) => {
// 		let robot = robotSnapshot.val();
// 		const ROBOT_NUM = robot.length - 1;
// 		let robot_id = 0;
// 		for(let i = 0; i < ROBOT_NUM; ++i) {
// 			if(robot[i].select) {
// 				robot_id = i;
// 			}
// 		}
// 		db.ref(PATH + 'wall').once('value', (wallSnapshot) => {
// 			const wall = wallSnapshot.val();
// 			const wallX = wall['x'];
// 			const wallY = wall['y'];
// 			const N = wallX.length - 1;
// 			const dx = [1, 0, -1, 0];
// 			const dy = [0, 1, 0, -1];
// 			let px = robot[robot_id].x;
// 			let py = robot[robot_id].y;
// 			while(true) {
// 				const nx = px + dx[dir];
// 				const ny = py + dy[dir];
// 				if(ny < 0 || N <= ny) break;
// 				if(nx < 0 || N <= nx) break;
// 				let robotExist = false;
// 				for(let i = 0; i < ROBOT_NUM; ++i) {
// 					if(i == robot_id) continue;
// 					if(robot[i].x == nx && robot[i].y == ny) {
// 						robotExist = true;
// 					}
// 				}
// 				if(robotExist) break;
// 				if(dir == 0 && wallY[ny][nx]) break;
// 				if(dir == 1 && wallX[ny][nx]) break;
// 				if(dir == 2 && wallY[py][px]) break;
// 				if(dir == 3 && wallX[py][px]) break;
// 				px = nx, py = ny;
// 			}
// 			if(robot[robot_id].x == px || robot[robot_id].y == py) {
// 				robot[robot_id].x = px;
// 				robot[robot_id].y = py;
// 				db.ref(PATH + 'step').once('value', (stepSnapshot) => {
// 					db.ref(PATH + 'robot').set(robot);
// 					db.ref(PATH + 'step').set(stepSnapshot.val() + 1);
// 				});
// 				return true;
// 			}
// 			return false;
// 		});
// 		return false;
// 	});
// 	return false;
// };
