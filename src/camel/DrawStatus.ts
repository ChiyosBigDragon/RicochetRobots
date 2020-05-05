import * as numeral from 'numeral';
import {DrawGoods} from './DrawGoods';

export class DrawStatus {
	private _drawGoods;
	private status: HTMLDivElement[];
	private name: HTMLDivElement[];
	private point: HTMLDivElement[];
	private pointDiff: HTMLDivElement[];
	private goods: HTMLDivElement[];
	private preColor: number;
	private PLAYER_NUM: number;
	public PLAYER_NAME: string[];
	private NAME_WIDTH: number;
	// private const COLOR: string[] = ["#e74c3c", "#3498db", ];
	constructor(private HEIGHT: number, private WIDTH: number, private container: HTMLDivElement, private docment: Document) {}
	public init = (name: string[]) => {
		while(this.container.firstChild) this.container.removeChild(this.container.firstChild);
		this._drawGoods = new DrawGoods(this.container);
		this.PLAYER_NAME = name;
		this.PLAYER_NUM = name.length;
		this.createStatusPlayer();
		this.name = this.createStatusPlayerName();
		this.point = this.createStatusPlayerPoint();
		this.pointDiff = this.createStatusPlayerPoint();
		this.goods = this.createStatusPlayerGoods();
		this.drawName();
		this.drawGoods();
	};
	private createStatusPlayer = () => {
		this.status = new Array(this.PLAYER_NUM);
		for(let i = 0; i < this.PLAYER_NUM; ++i) {
			this.status[i] = this.docment.createElement("div");
			this.status[i].className = "status-player";
			this.status[i].style.height = this.HEIGHT.toString() + "px";
			this.status[i].style.width = this.WIDTH.toString() + "px";
			this.status[i].style.fontSize = (this.HEIGHT * 0.6).toString() + "px";
			this.NAME_WIDTH = this.HEIGHT * 0.6 * 6;
			const color = this.pickColor();
			this.status[i].style.borderColor = color[0];
			this.status[i].style.backgroundColor = color[1];
			this.container.appendChild(this.status[i]);
		}
	};
	private createStatusPlayerName = () => {
		const name = new Array(this.PLAYER_NUM);
		for(let i = 0; i < this.PLAYER_NUM; ++i) {
			name[i] = this.docment.createElement("div");
			name[i].className = "status-player-name";
			this.status[i].appendChild(name[i]);
		}
		return name;
	};
	private createStatusPlayerPoint = () => {
		const point = new Array(this.PLAYER_NUM);
		for(let i = 0; i < this.PLAYER_NUM; ++i) {
			point[i] = this.docment.createElement("div");
			point[i].className = "status-player-point";
			this.status[i].appendChild(point[i]);
		}
		return point;
	};
	private createStatusPlayerGoods = () => {
		const goods = new Array(this.PLAYER_NUM);
		for(let i = 0; i < this.PLAYER_NUM; ++i) {
			goods[i] = this.docment.createElement("div");
			goods[i].className = "status-player-goods-container";
			this.status[i].appendChild(goods[i]);
		}
		return goods;
	};
	private pickColor = () => {
		while(true) {
			const h = Math.random() * 360;
			if(Math.abs(h - this.preColor) < 40 || Math.abs(Math.min(h, this.preColor) + 360 - Math.max(h, this.preColor)) < 40) {
				continue;
			}
			this.preColor = h;
			return [`hsl(${h}, 80%, 60%)`, `hsla(${h}, 80%, 60%, 0.1)`];
		}
	}
	// public drawToken = (token: number) => {
		// 	this.context.clearRect(0, 0, this.HEIGHT, this.canvas.height);
		// 	this.context.beginPath();
		// 	this.context.arc(this.HEIGHT / 2, token * this.HEIGHT + this.HEIGHT / 2, this.HEIGHT / 2, 0, 2 * Math.PI, true);
		// 	this.context.fillStyle = 'red';
		// 	this.context.fill();
		// };
		// public drawRank = (rank: number[]) => {
			// 	this.context.clearRect(0, 0, this.HEIGHT, this.canvas.height);
			// 	for(let i = 0; i < this.PLAYER_NUM; ++i) {
				// 		this.context.fillStyle = 'black';
	// 		if(rank[i] == 1) this.context.fillStyle = 'gold';
	// 		if(rank[i] == 2) this.context.fillStyle = 'silver';
	// 		if(rank[i] == 3) this.context.fillStyle = 'chocolate';
	// 		this.context.fillText(numeral(rank[i]).format('0o'), 0, (i + 1) * this.HEIGHT, this.HEIGHT);
	// 	}
	// };
	public drawGoods = () => {
		for(let i = 0; i < this.PLAYER_NUM; ++i) {
			for(let j = 0; j < 2; ++j) {
				const div = this.docment.createElement("div");
				div.className = "status-player-goods";
				const goods = this._drawGoods.dice(this.HEIGHT, this.HEIGHT).domElement();
				div.appendChild(goods);
				this.goods[i].appendChild(div);
			}
		}
	};
	public drawPoint = (point: {val: number[], diff: number[] | null[]}) => {
		for(let i = 0; i < this.PLAYER_NUM; ++i) {
			let ret: string = "";
			ret += point.val[i].toString() + "pt";
			if(point.diff != null && point.diff[i] != null) {
				let diffStr = " -> ";
				point.val[i] += point.diff[i];
				diffStr += point.val[i].toString() + "pt";
				const op = point.diff[i] < 0  ? "-"
						 : point.diff[i] == 0 ? "±"
						 : "+";
				diffStr += `(${op}${point.diff[i]})`;
				this.pointDiff[i].innerText = diffStr;
				this.status[i].insertBefore(this.pointDiff[i], this.point[i].nextSibling);
			} else {
				this.pointDiff[i].remove();
			}
			this.point[i].innerText = ret;
		}
	};
	public drawName = () => {
		for(let i = 0; i < this.PLAYER_NUM; ++i) {
			this.name[i].innerText = this.PLAYER_NAME[i];
			this.name[i].style.width = (this.NAME_WIDTH).toString() + "px";
		}
	};
	public drawNameNow = (now: number | null) => {
		if(now == null) {
			for(let i = 0; i < this.PLAYER_NUM; ++i) {
				this.name[i].style.color = "rgba(0, 0, 0, 1.0)";
				this.name[i].style.fontWeight = "normal";
			}
		} else {
			for(let i = 0; i < this.PLAYER_NUM; ++i) {
				this.name[i].style.color = "rgba(0, 0, 0, 0.5)";
				this.name[i].style.fontWeight = "normal";
			}
			this.name[now].style.color = "rgba(0, 0, 0, 1.0)";
			this.name[now].style.fontWeight = "bold";
		}
	};
};
