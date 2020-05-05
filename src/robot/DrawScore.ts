import { CreateRobot } from './CreateRobot';
import * as acgraph from 'acgraph';
import * as firebase from 'firebase';
const db = firebase.database();
const PATH = 'RicochetRobots/';

export class DrawScore {
	private announce: any;
	private voteContainer;
	private scoreContainer;
	constructor(/*private HEIGHT: number,*/ private container: HTMLElement) {
		// container.style.height = this.HEIGHT.toString() + "px";
		this.voteContainer = document.createElement("div");
		this.setVoteListener();
		this.scoreContainer = document.createElement("div");
		this.setScoreListener();
		container.appendChild(this.voteContainer);
		container.appendChild(this.scoreContainer);
	}
	private setVoteListener = () => {
		db.ref(PATH + 'vote').on('value', (res) => {
			while(this.voteContainer.firstChild) this.voteContainer.removeChild(this.voteContainer.firstChild);
			const obj = res.val();
			const v = new Array();
			for(const key in obj) {
				v.push(obj[key]);
			}
			v.sort((lhs, rhs) => {
				return (Number)((lhs.step > rhs.step) || (lhs.step == rhs.step && lhs.time > rhs.time));
			});
			for(const e of v) {
				if(e.step == 1000) continue;
				console.log(e.step);
				const textBox = document.createElement("div");
				textBox.className = "announce-text";
				const date = new Date(e.time);
				const h = String(date.getHours()).padStart(2, "0");
				const m = String(date.getMinutes()).padStart(2, "0");
				const s = String(date.getSeconds()).padStart(2, "0");
				const ms = String(date.getMilliseconds()).padStart(3, "0");
				const time = `${h}:${m}:${s}:${ms}`
				textBox.innerText = String(e.step) + " " + String(e.name) + " " + time;
				this.voteContainer.appendChild(textBox);
			}
		});
	};
	private setScoreListener = () => {
		db.ref(PATH + 'score').on('value', (res) => {
			while(this.scoreContainer.firstChild) this.scoreContainer.removeChild(this.scoreContainer.firstChild);
			const obj = res.val();
			const v = new Array();
			for(const key in obj) {
				v.push(obj[key]);
			}
			v.sort((lhs, rhs) => {
				return (Number)(lhs.pt < rhs.pt);
			});
			for(const e of v) {
				const textBox = document.createElement("div");
				textBox.className = "announce-text";
				textBox.innerText = String(e.pt) + "pt: " + String(e.name);
				this.scoreContainer.appendChild(textBox);
			}
		});
	};
};
