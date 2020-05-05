export class DrawGrid {
	private PANEL_WIDTH: number;
	private PLAYER_NUM: number;
	private PLAYER_NAME: string[];
	private panel: any[];
	private text: any[];
	constructor(private PANEL_NUM: number, private GRID_WIDTH: number, private GRID_HEIGHT: number, private stage) {
		stage.height(GRID_HEIGHT);
		this.PANEL_WIDTH = GRID_WIDTH / (PANEL_NUM + 2);
		this.panel = new Array(PANEL_NUM + 2);
		this.text = new Array(PANEL_NUM + 2);
		for(let i = 0; i <= PANEL_NUM + 1; ++i) {
			this.panel[i] = stage.layer();
			this.panel[i].rect(0, 0, this.PANEL_WIDTH, this.GRID_HEIGHT).stroke("1, white").fill("lightgray");
			this.panel[i].setPosition(this.PANEL_WIDTH * i, 0);
			if(1 <= i && i <= PANEL_NUM) {
				const txt = this.panel[i].text(0, 0);
				txt.text(i.toString());
				txt.y(this.GRID_HEIGHT - parseInt(txt.fontSize()) * 1.25);
				txt.x(parseInt(txt.fontSize()) * 0.25);
				// txt.direction('rtl');
				// txt.width(this.panel[i].getWidth());
				// txt.height(this.panel[i].getHeight());
				// blueText.style({fontStyle: 'italic', fontSize: '15px', color: '#2196F3'});
				// blueText.text('Simple text');
			}
		}
	}
	public nameChange = (PLAYER_NAME: string[]) => {
		this.PLAYER_NUM = PLAYER_NAME.length;
		this.PLAYER_NAME = PLAYER_NAME;
	};
	private drawPanel = (name: string, x: number, move: number) => {
		// this.context.font = "32px Oxanium";
		const str = (move > 0 ? '+' : '') + move.toString();
		this.text[x].color(move > 0 ? 'red' : 'blue');
		this.text[x].text((move > 0 ? '+' : '') + move.toString());
		// this.context.fillText(str, x * this.WIDTH + 0.25 * this.WIDTH, this.GROUND + this.HEIGHT);
		// this.context.fillText(name, x * this.WIDTH + 0.25 * this.WIDTH, this.GROUND + this.HEIGHT * 2, this.WIDTH);
	};
	public draw = (json: {x: number[], move: number[]}) => {
		// Panel
		for(let i = 0; i < this.PLAYER_NUM; ++i) {
			const move = json.move[i];
			if(move != null) {
				this.drawPanel(this.PLAYER_NAME[i], json.x[i], move);
			}
		}
	};
};



// export class DrawGrid {
// 	private canvas: HTMLCanvasElement;
// 	private context: CanvasRenderingContext2D;
// 	private WIDTH: number;
// 	private PLAYER_NUM: number;
// 	private PLAYER_NAME: string[];
// 	constructor(private GRID_NUM: number, public GROUND: number, private HEIGHT: number, _canvas: string) {
// 		this.canvas = <HTMLCanvasElement> document.getElementById(_canvas);
// 		this.context = this.canvas.getContext('2d');
// 		this.WIDTH = this.canvas.width / (GRID_NUM + 2);
// 	}
// 	public nameChange = (PLAYER_NAME: string[]) => {
// 		this.PLAYER_NUM = PLAYER_NAME.length;
// 		this.PLAYER_NAME = PLAYER_NAME;
// 	};
// 	private drawPanel = (name: string, x: number, move: number) => {
// 		this.context.font = "32px Oxanium";
// 		const str = (move > 0 ? '+' : '') + move.toString();
// 		this.context.fillStyle = (move > 0 ? 'red' : 'blue');
// 		this.context.fillText(str, x * this.WIDTH + 0.25 * this.WIDTH, this.GROUND + this.HEIGHT);
// 		this.context.fillText(name, x * this.WIDTH + 0.25 * this.WIDTH, this.GROUND + this.HEIGHT * 2, this.WIDTH);
// 	};
// 	private drawIndex = () => {
// 		this.context.font = "16px Oxanium";
// 		this.context.fillStyle = 'white';
// 		for(let x = 1; x <= this.GRID_NUM; ++x) {
// 			const str = x.toString();
// 			this.context.fillText(str, x * this.WIDTH, this.GROUND + this.HEIGHT);
// 		}
// 	};
// 	public draw = (json: {x: number[], move: number[]}) => {
// 		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
// 		// Grid
// 		this.context.fillStyle = 'black';
// 		this.context.fillStyle = '#95a5a6';
// 		this.context.fillRect(0, this.GROUND, this.canvas.width, this.HEIGHT);
// 		this.context.lineWidth = 1;
// 		this.context.strokeStyle = '#ffffff';
// 		for(let x = 1; x <= this.GRID_NUM + 1; ++x) {
// 			this.context.beginPath();
// 			this.context.moveTo(x * this.WIDTH, this.GROUND);
// 			this.context.lineTo(x * this.WIDTH, this.GROUND + this.HEIGHT);
// 			this.context.stroke();
// 		}
// 		// Index
// 		this.drawIndex();
// 		// Panel
// 		for(let i = 0; i < this.PLAYER_NUM; ++i) {
// 			const move = json.move[i];
// 			if(move != null) {
// 				this.drawPanel(this.PLAYER_NAME[i], json.x[i], move);
// 			}
// 		}
// 	};
// };



// export default class Grid {
// 	private canvas: HTMLCanvasElement;
// 	private context: CanvasRenderingContext2D;
// 	private WIDTH: number;
// 	private PLAYER_NUM: number;
// 	private PLAYER_NAME: string[];
// 	constructor(private GRID_NUM: number, public GROUND: number, private HEIGHT: number, _canvas: string) {
// 		this.canvas = <HTMLCanvasElement> document.getElementById(_canvas);
// 		this.context = this.canvas.getContext('2d');
// 		this.WIDTH = this.canvas.width / (GRID_NUM + 2);
// 	}
// 	public nameChange = (PLAYER_NAME: string[]) => {
// 		this.PLAYER_NUM = PLAYER_NAME.length;
// 		this.PLAYER_NAME = PLAYER_NAME;
// 	};
// 	private drawPanel = (name: string, x: number, move: number) => {
// 		this.context.font = "32px Oxanium";
// 		const str = (move > 0 ? '+' : '') + move.toString();
// 		this.context.fillStyle = (move > 0 ? 'red' : 'blue');
// 		this.context.fillText(str, x * this.WIDTH + 0.25 * this.WIDTH, this.GROUND + this.HEIGHT);
// 		this.context.fillText(name, x * this.WIDTH + 0.25 * this.WIDTH, this.GROUND + this.HEIGHT * 2, this.WIDTH);
// 	};
// 	private drawIndex = () => {
// 		this.context.font = "16px Oxanium";
// 		this.context.fillStyle = 'white';
// 		for(let x = 1; x <= this.GRID_NUM; ++x) {
// 			const str = x.toString();
// 			this.context.fillText(str, x * this.WIDTH, this.GROUND + this.HEIGHT);
// 		}
// 	};
// 	public draw = (json: {x: number[], move: number[]}) => {
// 		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
// 		// Grid
// 		this.context.fillStyle = 'black';
// 		this.context.fillStyle = '#95a5a6';
// 		this.context.fillRect(0, this.GROUND, this.canvas.width, this.HEIGHT);
// 		this.context.lineWidth = 1;
// 		this.context.strokeStyle = '#ffffff';
// 		for(let x = 1; x <= this.GRID_NUM + 1; ++x) {
// 			this.context.beginPath();
// 			this.context.moveTo(x * this.WIDTH, this.GROUND);
// 			this.context.lineTo(x * this.WIDTH, this.GROUND + this.HEIGHT);
// 			this.context.stroke();
// 		}
// 		// Index
// 		this.drawIndex();
// 		// Panel
// 		for(let i = 0; i < this.PLAYER_NUM; ++i) {
// 			const move = json.move[i];
// 			if(move != null) {
// 				this.drawPanel(this.PLAYER_NAME[i], json.x[i], move);
// 			}
// 		}
// 	};
// };
