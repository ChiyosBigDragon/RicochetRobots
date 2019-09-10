export default class Announce {
	private canvas: HTMLCanvasElement;
	private context: CanvasRenderingContext2D;
	constructor(/*private WIDTH: number, private HEIGHT: number,*/ _canvas: string) {
		this.canvas = <HTMLCanvasElement> document.getElementById(_canvas);
		this.context = this.canvas.getContext('2d');
	}
	public draw = (str: string) => {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.context.font = "64px Oxanium";
		this.context.fillStyle = 'black';
		this.context.lineWidth = 1;
		this.context.fillText(str, 0, 64);
	};
};
