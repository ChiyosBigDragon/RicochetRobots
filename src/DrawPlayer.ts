import * as numeral from 'numeral';

export default class Player {
	private canvas: HTMLCanvasElement;
	private context: CanvasRenderingContext2D;
	private HEIGHT: number;
	private PLAYER_NUM: number;
	private NAME_LIMIT: number = 6;
	public PLAYER_NAME: string[];
	constructor(_canvas: string) {
		this.canvas = <HTMLCanvasElement> document.getElementById(_canvas);
		this.context = this.canvas.getContext('2d');
	}
	private init = (name: string[]) => {
		this.PLAYER_NAME = name;
		this.PLAYER_NUM = name.length;
		this.HEIGHT = this.canvas.height / this.PLAYER_NUM * 0.9;
	};
	public drawToken = (token: number) => {
		this.context.clearRect(0, 0, this.HEIGHT, this.canvas.height);
		this.context.beginPath();
		this.context.arc(this.HEIGHT / 2, token * this.HEIGHT + this.HEIGHT / 2, this.HEIGHT / 2, 0, 2 * Math.PI, true);
		this.context.fillStyle = 'red';
		this.context.fill();
	};
	public drawRank = (rank: number[]) => {
		this.context.clearRect(0, 0, this.HEIGHT, this.canvas.height);
		for(let i = 0; i < this.PLAYER_NUM; ++i) {
			this.context.fillStyle = 'black';
			if(rank[i] == 1) this.context.fillStyle = 'gold';
			if(rank[i] == 2) this.context.fillStyle = 'silver';
			if(rank[i] == 3) this.context.fillStyle = 'chocolate';
			this.context.fillText(numeral(rank[i]).format('0o'), 0, (i + 1) * this.HEIGHT, this.HEIGHT);
		}
	};
	public drawPoint = (point: number[]) => {
		this.context.clearRect(this.HEIGHT + this.HEIGHT * this.NAME_LIMIT, 0, this.canvas.width, this.canvas.height);
		this.context.lineWidth = 1;
		this.context.strokeStyle = '#ffffff';
		this.context.font = this.HEIGHT + 'px Oxanium';
		for(let i = 0; i < this.PLAYER_NUM; ++i) {
			this.context.fillStyle = 'black';
			this.context.fillText(point[i].toString() + 'pt', this.HEIGHT * 2 + this.HEIGHT * this.NAME_LIMIT, (i + 1) * this.HEIGHT);
		}
	};
	public drawName = (name: string[]) => {
		this.init(name);
		this.context.clearRect(this.HEIGHT, 0, this.HEIGHT * this.NAME_LIMIT, this.canvas.height);
		this.context.lineWidth = 1;
		this.context.strokeStyle = '#ffffff';
		this.context.font = this.HEIGHT + 'px Oxanium';
		for(let i = 0; i < this.PLAYER_NUM; ++i) {
			this.context.fillStyle = 'black';
			this.context.fillText(name[i], this.HEIGHT, (i + 1) * this.HEIGHT, this.HEIGHT * this.NAME_LIMIT);
		}
	};
	public drawPlayerNow = (playerNow: number) => {
		this.context.clearRect(this.HEIGHT, 0, this.HEIGHT * this.NAME_LIMIT, this.canvas.height);
		this.context.lineWidth = 1;
		this.context.strokeStyle = '#ffffff';
		this.context.font = this.HEIGHT + 'px Oxanium';
		for(let i = 0; i < this.PLAYER_NUM; ++i) {
			this.context.fillStyle = 'black';
			if(i == playerNow) this.context.fillStyle = 'red';
			this.context.fillText(this.PLAYER_NAME[i], this.HEIGHT, (i + 1) * this.HEIGHT, this.HEIGHT * this.NAME_LIMIT);
		}
	};
};
