import { CreateRobot } from './CreateRobot';
import { Server } from './Server';
import * as acgraph from 'acgraph';
import * as firebase from 'firebase';
const db = firebase.database();
const PATH = 'RicochetRobots/';

export class DrawCommand {
	private stage;
	private robotLayer;
	private keypadLayer;
	private robotsLayer: any[];
	private panelLayer;
	private ROBOT_WIDTH;
	private step = 0;
	private stepLayer;
	private stepText;
	private keyAvailable: boolean = true;
	constructor(private ROBOT_NUM: number, private ROBOT_COLOR: string[], private uid: string, private userName: string, private server: Server, private container: HTMLElement) {
		this.stage = acgraph.create(container);
		this.ROBOT_WIDTH = container.clientWidth / ROBOT_NUM;
		this.createRobot(this.stage);
		this.createKeypad(this.stage);
		this.robotLayer.visible(false);
		this.keypadLayer.visible(true);
		this.setRobotListener(false);
		this.setKeypadListener(true);
	}
	private createRobot = (stage) => {
		this.robotLayer = stage.layer();
		this.robotsLayer = new Array(this.ROBOT_NUM);
		for(let i = 0; i < this.ROBOT_NUM; ++i) {
			this.robotsLayer[i] = new CreateRobot(i + 1, this.ROBOT_COLOR[i], this.ROBOT_WIDTH, this.ROBOT_WIDTH, this.robotLayer);
			this.robotsLayer[i].setPosition(this.ROBOT_WIDTH * i, this.container.clientHeight - 85);
			this.robotsLayer[i].setClickListener(() => {
				this.select(i);
			});
		}
		this.panelLayer = this.robotLayer.rect(43, 0, 234, 234);
	};
	private createKeypad = (stage) => {
		this.keypadLayer = stage.layer();
		const width = this.container.clientWidth / 4;
		const height = this.container.clientHeight / 4;
		this.stepLayer = this.keypadLayer.layer();
		this.stepLayer.rect(0, 0, 1 * width, height);
		this.stepText = this.stepLayer.text(0, 0, "00");
		this.stepText.fontSize(64);
		// Enter
		this.keypadLayer.ellipse(2.5 * width, 0.5 * height, 1.5 * width * 0.9, 0.5 * height * 0.9);
		// ←
		this.keypadLayer.ellipse(3 * width + width / 2, 1.5 * height + height / 2, width / 2 * 0.9, height * 0.9);
		// 789 456 1230
		this.keypadLayer.circle(0 * width + width / 2, 1 * height + height / 2, width / 2 * 0.9);
		this.keypadLayer.circle(1 * width + width / 2, 1 * height + height / 2, width / 2 * 0.9);
		this.keypadLayer.circle(2 * width + width / 2, 1 * height + height / 2, width / 2 * 0.9);
		this.keypadLayer.circle(0 * width + width / 2, 2 * height + height / 2, width / 2 * 0.9);
		this.keypadLayer.circle(1 * width + width / 2, 2 * height + height / 2, width / 2 * 0.9);
		this.keypadLayer.circle(2 * width + width / 2, 2 * height + height / 2, width / 2 * 0.9);
		this.keypadLayer.circle(0 * width + width / 2, 3 * height + height / 2, width / 2 * 0.9);
		this.keypadLayer.circle(1 * width + width / 2, 3 * height + height / 2, width / 2 * 0.9);
		this.keypadLayer.circle(2 * width + width / 2, 3 * height + height / 2, width / 2 * 0.9);
		this.keypadLayer.circle(3 * width + width / 2, 3 * height + height / 2, width / 2 * 0.9);
	};
	public robot = (robot) => {
		for(let i = 0; i < this.ROBOT_NUM; ++i) {
			this.robotsLayer[i].select(robot[i].select);
		}
	};
	public select = (robot_id) => {
		this.server.select(robot_id);
	};
	public move = (dir) => {
		this.server.move(dir);
	};
	private addStep = (num) => {
		if(this.step * 10 + num >= 100) return false;
		this.step = this.step * 10 + num;
		this.stepText.text(String(this.step).padStart(2, "0"));
		return true;
	};
	private subStep = () => {
		this.step = Math.floor(this.step / 10);
		this.stepText.text(String(this.step).padStart(2, "0"));
	};
	private resetStep = () => {
		this.step = 0;
		this.stepText.text(String(this.step).padStart(2, "0"));
	};
	private vote = () => {
		if(this.step <= 0) return false;
		db.ref(PATH + 'vote/' + this.uid).update({name: this.userName, step: this.step, time: new Date()});
		this.step = 0;
		this.stepText.text(String(this.step).padStart(2, "0"));
		return true;
	};
	public toggle = () => {
		this.setRobotListener(!this.robotLayer.visible());
		this.setKeypadListener(!this.keypadLayer.visible());
		this.robotLayer.visible(!this.robotLayer.visible());
		this.keypadLayer.visible(!this.keypadLayer.visible());
	};
	public setRobotListener = (flag: boolean) => {
		if(!flag) return;
		window.document.onkeydown = (event) => {
			if(event.key === 'Backspace') {
				return false;
			}
		};
		window.document.onkeyup = (event) => {
			if(!this.keyAvailable) return false;
			this.keyAvailable = false;
			if(event.key === 'ArrowRight') {
				this.move(0);
			}
			if(event.key === 'ArrowDown') {
				this.move(1);
			}
			if(event.key === 'ArrowLeft') {
				this.move(2);
			}
			if(event.key === 'ArrowUp') {
				this.move(3);
			}
			if(event.key === 'r') {
				this.server.reset();
			}
			if(event.key === 'Backspace') {
				this.server.removeOnce();
			}
			if(event.key === '1') {
				this.select(0);
			}
			if(event.key === '2') {
				this.select(1);
			}
			if(event.key === '3') {
				this.select(2);
			}
			if(event.key === '4') {
				this.select(3);
			}
			if(event.key === 't') {
				this.toggle();
			}
			this.keyAvailable = true;
			return true;
		};
	};
	public setKeypadListener = (flag: boolean) => {
		if(!flag) return;
		window.document.onkeydown = (event) => {
			if(event.key === 'Backspace') {
				return false;
			}
		};
		window.document.onkeyup = (event) => {
			if('0' <= event.key && event.key <= '9') {
				this.addStep(Number(event.key));
			}
			if(event.key === 'Backspace') {
				this.subStep();
			}
			if(event.key === 'r') {
				this.resetStep();
			}
			if(event.key === 'Enter') {
				this.vote();
			}
			if(event.key === 't') {
				this.toggle();
			}
		};
	};
};
