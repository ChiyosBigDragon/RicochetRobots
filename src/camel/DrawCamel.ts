export class DrawCamel {
	private camel: any[];
	private background: any;
	private CAMEL_WIDTH: number = 108;
	public CAMEL_HEIGHT: number = 49;
	private CAMEL_RATIO: number = 10;
	constructor(private CAMEL_NUM: number, private CAMEL_COLOR: string[], _CAMEL_WIDTH: number, private stage) {
		// stage.rect(0, 0, stage.width(), stage.height());
		this.camel = new Array(CAMEL_NUM);
		this.CAMEL_RATIO = _CAMEL_WIDTH / this.CAMEL_WIDTH;
		this.CAMEL_WIDTH = this.CAMEL_WIDTH * this.CAMEL_RATIO;
		this.CAMEL_HEIGHT = this.CAMEL_HEIGHT * this.CAMEL_RATIO;
		for(let i = 0; i < this.CAMEL_NUM; ++i) {
			this.camel[i] = stage.layer();
			this.camel[i].path().attr("stroke-width", 0).attr("d", "M80,0h4v4h4v4h8v4h4v4h4v12h-4v4h-8v12h-4v4h-4v4h-4v4h-4v4h-4v8h-4v4h-8v-4h-4v-4h-4v-4h-4v-4h-8v4h-4v8h-4v4h-8v-4h-4v-4h-8v-4h-4v-8h-4v-4h-4v-24h4v-4h4v-4h4v-4h8v4h4v4h8v-8h4v-4h4v-4h8v4h4v4h4v4h4v4h8v-8h4v-4h4v-4h4zM92").fill("#000000");
			this.camel[i].path().stroke(CAMEL_COLOR[i]).attr("stroke-width", 0).attr("d", "M80,4h4v4h4v4h8v4h4v12h-8v4h-4v12h-4v4h-4v4h-4v4h-4v4h-4v8h-8v-4h-4v-4h-4v-4h-4v-4h-8v4h-4v4h-4v8h-8v-4h-4v-4h-8v-8h-4v-4h-4v-24h4v-4h4v-4h8v4h4v4h8v-4h4v-8h4v-4h8v4h4v4h4v4h4v4h8v-4h4v-8h4v-4h4z").fill(CAMEL_COLOR[i]);
			this.camel[i].scale(this.CAMEL_RATIO, this.CAMEL_RATIO);
			this.camel[i].setPosition(0, this.CAMEL_HEIGHT * i);
		}
	}
	private drawOnce = (id: number, x: number, y: number) => {
		this.camel[id].setPosition(x * this.CAMEL_WIDTH, (y - 1) * this.CAMEL_HEIGHT);
	};
	public draw = (json: {x: number[], y: number[]}) => {
		for(let i = 0; i < this.CAMEL_NUM; ++i) {
			this.drawOnce(i, json.x[i], json.y[i]);
		}
	};
};
