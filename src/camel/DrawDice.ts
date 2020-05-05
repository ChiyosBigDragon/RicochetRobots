// export class DrawCamel {
// 	private camel: any[];
// 	private CAMEL_WIDTH: number = 108;
// 	private CAMEL_HEIGHT: number = 49;
// 	private CAMEL_RATIO: number = 10;
// 	public CAMEL_GROUND: number;
// 	constructor(private CAMEL_NUM: number, private CAMEL_COLOR: string[], _CAMEL_WIDTH: number, private stage) {
// 		this.camel = new Array(CAMEL_NUM);
// 		this.CAMEL_RATIO = _CAMEL_WIDTH / this.CAMEL_WIDTH;
// 		this.CAMEL_WIDTH = this.CAMEL_WIDTH * this.CAMEL_RATIO;
// 		this.CAMEL_HEIGHT = this.CAMEL_HEIGHT * this.CAMEL_RATIO;
// 		for(let i = 0; i < this.CAMEL_NUM; ++i) {
// 			this.camel[i] = stage.layer();
// 			this.camel[i].path().attr("stroke-width", 0).attr("d", "M80,0h4v4h4v4h8v4h4v4h4v12h-4v4h-8v12h-4v4h-4v4h-4v4h-4v4h-4v8h-4v4h-8v-4h-4v-4h-4v-4h-4v-4h-8v4h-4v8h-4v4h-8v-4h-4v-4h-8v-4h-4v-8h-4v-4h-4v-24h4v-4h4v-4h4v-4h8v4h4v4h8v-8h4v-4h4v-4h8v4h4v4h4v4h4v4h8v-8h4v-4h4v-4h4zM92").fill("#000000");
// 			this.camel[i].path().stroke(CAMEL_COLOR[i]).attr("stroke-width", 0).attr("d", "M80,4h4v4h4v4h8v4h4v12h-8v4h-4v12h-4v4h-4v4h-4v4h-4v4h-4v8h-8v-4h-4v-4h-4v-4h-4v-4h-8v4h-4v4h-4v8h-8v-4h-4v-4h-8v-8h-4v-4h-4v-24h4v-4h4v-4h8v4h4v4h8v-4h4v-8h4v-4h8v4h4v4h4v4h4v4h8v-4h4v-8h4v-4h4z").fill(CAMEL_COLOR[i]);
// 			this.camel[i].scale(this.CAMEL_RATIO, this.CAMEL_RATIO);
// 			this.camel[i].setPosition(0, this.CAMEL_HEIGHT * i);
// 		}
// 	}
// 	private drawOnce = (id: number, x: number, y: number) => {
// 		this.camel[id].setPosition(x * this.CAMEL_WIDTH, y * this.CAMEL_HEIGHT);
// 	};
// 	public draw = (json: {x: number[], y: number[]}) => {
// 		for(let i = 0; i < this.CAMEL_NUM; ++i) {
// 			this.drawOnce(i, json.x[i], json.y[i]);
// 		}
// 	};
// };


// export class DrawDice {
// 	// private CAMEL_NUM: number, private CAMEL_COLOR: string[], _CAMEL_WIDTH: number, 
// 	constructor(private CAMEL_NUM: number = 5, private CAMEL_COLOR: string[], private WIDTH: number, private stage) {

// 	}
// 	private drawNumber = (id: number, move: number | null) => {
// 		this.context.font = "64px Oxanium";
// 		const str = (move == null ? '?' : move.toString());
// 		this.context.strokeStyle = 'black';
// 		this.context.strokeText(str, id * this.WIDTH + this.WIDTH * 0.2, this.WIDTH - this.WIDTH * 0.125);
// 		this.context.fillStyle = 'white';
// 		this.context.fillText(str, id * this.WIDTH + this.WIDTH * 0.2, this.WIDTH - this.WIDTH * 0.125);
// 	};
// 	private drawBase = () => {
// 		this.context.strokeStyle = '#95a5a6';
// 		this.context.lineWidth = 3;
// 		for(let id = 0; id < this.CAMEL_NUM; ++id) {
// 			this.context.fillStyle = this.CAMEL_COLOR[id];
// 			this.context.fillRect(id * this.WIDTH, 0, this.WIDTH, this.WIDTH);
// 			this.context.strokeRect(id * this.WIDTH, 0, this.WIDTH, this.WIDTH);
// 		}
// 	};
// 	public draw = (json: number[] | null) => {
// 		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
// 		// Base
// 		this.drawBase();
// 		// Number
// 		if(json == null) {
// 			json = new Array(this.CAMEL_NUM);
// 		}
// 		for(let id = 0; id < this.CAMEL_NUM; ++id) {
// 			this.drawNumber(id, json[id]);
// 		}
// 	};
// };


export class DrawDice {
	private canvas: HTMLCanvasElement;
	private context: CanvasRenderingContext2D;
	constructor(private CAMEL_NUM: number = 5, private CAMEL_COLOR: string[], private WIDTH: number, _canvas: string) {
		this.canvas = <HTMLCanvasElement> document.getElementById(_canvas);
		this.context = this.canvas.getContext('2d');
	}
	private drawNumber = (id: number, move: number | null) => {
		this.context.font = "64px Oxanium";
		const str = (move == null ? '?' : move.toString());
		this.context.strokeStyle = 'black';
		this.context.strokeText(str, id * this.WIDTH + this.WIDTH * 0.2, this.WIDTH - this.WIDTH * 0.125);
		this.context.fillStyle = 'white';
		this.context.fillText(str, id * this.WIDTH + this.WIDTH * 0.2, this.WIDTH - this.WIDTH * 0.125);
	};
	private drawBase = () => {
		this.context.strokeStyle = '#95a5a6';
		this.context.lineWidth = 3;
		for(let id = 0; id < this.CAMEL_NUM; ++id) {
			this.context.fillStyle = this.CAMEL_COLOR[id];
			this.context.fillRect(id * this.WIDTH, 0, this.WIDTH, this.WIDTH);
			this.context.strokeRect(id * this.WIDTH, 0, this.WIDTH, this.WIDTH);
		}
	};
	public draw = (json: number[] | null) => {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		// Base
		this.drawBase();
		// Number
		if(json == null) {
			json = new Array(this.CAMEL_NUM);
		}
		for(let id = 0; id < this.CAMEL_NUM; ++id) {
			this.drawNumber(id, json[id]);
		}
	};
};
