export default class Dice {
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
