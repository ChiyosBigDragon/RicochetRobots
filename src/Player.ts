// export default class Player {
// 	constructor(private POINT_INIT: number, private USER_NUM: number, private GROUND: number, private HEIGHT: number, _canvas: string) {
// 		this.canvas = <HTMLCanvasElement> document.getElementById(_canvas);
// 		this.context = this.canvas.getContext('2d');
// 		this.WIDTH = this.canvas.width / GRID_NUM;
// 	}
// 	private drawPanel = (id: number, x: number, move: number) => {
// 		this.context.font = "32px Oxanium";
// 		const str = (move > 0 ? '+' : '') + move.toString();
// 		this.context.fillStyle = (move > 0 ? 'red' : 'blue');
// 		this.context.fillText(str, x * this.WIDTH, this.GROUND + this.HEIGHT);
// 	};
// 	public draw = (json) => {
// 		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
// 		// Grid
// 		this.context.fillStyle = 'black';
// 		this.context.fillStyle = '#95a5a6';
// 		this.context.fillRect(0, this.GROUND, this.canvas.width, this.HEIGHT);
// 		this.context.lineWidth = 1;
// 		this.context.strokeStyle = '#ffffff';
// 		for(let x = 1; x < this.GRID_NUM; ++x) {
// 			this.context.beginPath();
// 			this.context.moveTo(x * this.WIDTH, this.GROUND);
// 			this.context.lineTo(x * this.WIDTH, this.GROUND + this.HEIGHT);
// 			this.context.stroke();
// 		}
// 		// Panel
// 		for(let i = 0; i < this.USER_NUM; ++i) {
// 			const move = json.move[i];
// 			if(move != 0) {
// 				this.drawPanel(i, json.x[i], move);
// 			}
// 		}
// 	};
// };
