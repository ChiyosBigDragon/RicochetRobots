import { CreateRobot } from './CreateRobot';
import { Server } from './Server';
import * as acgraph from 'acgraph';
import * as firebase from 'firebase';
const db = firebase.database();
const PATH = 'RicochetRobots/';

export class DrawScore {
	private announce: any;
	private voteTextContainer;
	private scoreTextContainer;
	private timerContainer;
	private timerID;
	constructor(/*private HEIGHT: number,*/ private server: Server) {
		// container.style.height = this.HEIGHT.toString() + "px";
		const voteContainer = document.getElementById("vote-container"); 
		this.voteTextContainer = document.createElement("div");
		this.voteTextContainer.className = "vote-element-container";
		this.setVoteListener();
		voteContainer.appendChild(this.voteTextContainer);
		const scoreContainer = document.getElementById("score-container");
		this.scoreTextContainer = document.createElement("div");
		this.scoreTextContainer.className = "score-element-container";
		this.setScoreListener();
		scoreContainer.appendChild(this.scoreTextContainer);
		this.timerContainer = document.getElementById("timer-container");
		this.setTimerListener();
	}
	private setVoteListener = () => {
		db.ref(PATH + 'vote').on('value', (res) => {
			while(this.voteTextContainer.firstChild) this.voteTextContainer.removeChild(this.voteTextContainer.firstChild);
			const obj = res.val();
			const v = new Array();
			for(const key in obj) {
				v.push(obj[key]);
			}
			v.sort((lhs, rhs) => {
				if(lhs.step > rhs.step) return 1;
				if(lhs.step == rhs.step && lhs.time > rhs.time) return 1;
				return -1;
			});
			for(const e of v) {
				if(e.step == 1000) continue;
				const textBox = document.createElement("div");
				textBox.className = "element-text";
				const date = new Date(e.time);
				const h = String(date.getHours()).padStart(2, "0");
				const m = String(date.getMinutes()).padStart(2, "0");
				const s = String(date.getSeconds()).padStart(2, "0");
				const ms = String(date.getMilliseconds()).padStart(3, "0");
				const time = `${h}:${m}:${s}:${ms}`
				textBox.innerText = String(e.step) + " " + String(e.name) + " " + time;
				this.voteTextContainer.appendChild(textBox);
			}
		});
	};
	private setScoreListener = () => {
		db.ref(PATH + 'score').on('value', (res) => {
			while(this.scoreTextContainer.firstChild) this.scoreTextContainer.removeChild(this.scoreTextContainer.firstChild);
			const obj = res.val();
			const v = new Array();
			for(const key in obj) {
				v.push(obj[key]);
			}
			v.sort((lhs, rhs) => {
				if(lhs.pt < rhs.pt) return 1;
				return -1;
			});
			for(const e of v) {
				const textBox = document.createElement("div");
				textBox.className = "element-text";
				textBox.innerText = String(e.pt) + "pt: " + String(e.name);
				this.scoreTextContainer.appendChild(textBox);
			}
		});
	};
	private setTimerListener = () => {
		db.ref(PATH + 'voteLimitTime').on('value', (res) => {
			clearInterval(this.timerID);
			const time = new Date(res.val().time);
			this.timerID = setInterval(this.countDown, 500, time);
		});
	}
	private countDown = (endTime) => {
		const now = new Date();
		const s = Math.floor((endTime.getTime() - now.getTime()) / 1000);
		if(s <= 0) {
			clearInterval(this.timerID);
			this.server.voteEnd();
			this.timerContainer.innerText = `残り時間：${String(0).padStart(2, "0")}`;
			return;
		}
		this.timerContainer.innerText = `残り時間：${String(s).padStart(2, "0")}`;
	};
};
