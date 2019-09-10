export default class Camels {
	private imageData: ImageData[];
	private canvas: HTMLCanvasElement[];
	private context: CanvasRenderingContext2D[];
	private CAMEL_HEIGHT: number;
	private CAMEL_MARGIN: number;
	public CAMEL_GROUND: number;
	constructor(private CAMEL_NUM: number, private CAMEL_COLOR: string[], private CAMEL_WIDTH: number, src: string, _canvas: string) {
		const img = new Image();
		img.src = src;
		img.onload = async () => {
			const ratio = CAMEL_WIDTH / img.width;
			this.CAMEL_HEIGHT = img.height * ratio;
			this.CAMEL_MARGIN = 24 * ratio;
			this.canvas = new Array(CAMEL_NUM);
			this.context = new Array(CAMEL_NUM);
			this.imageData = new Array(CAMEL_NUM);
			this.CAMEL_GROUND = (CAMEL_NUM + 1) * this.CAMEL_HEIGHT - CAMEL_NUM * this.CAMEL_MARGIN;
			for(let i = 0; i < CAMEL_NUM; ++i) {
				this.canvas[i] = <HTMLCanvasElement> await document.getElementById(_canvas + i.toString());
				this.context[i] = await this.canvas[i].getContext('2d');
			}
			await this.init(img);
		};
	}
	private init = (img) => {
		for(let i = 0; i < this.CAMEL_NUM; ++i) {
			((canvas, context) => {
				context.clearRect(0, 0, canvas.width, canvas.height);
				context.drawImage(img, 0, 0, this.CAMEL_WIDTH, this.CAMEL_HEIGHT);
				this.imageData[i] = context.getImageData(0, 0, this.CAMEL_WIDTH, this.CAMEL_HEIGHT + 4);
				context.clearRect(0, 0, canvas.width, canvas.height);
				// Color Change
				((imageData, color) => {
					const w = imageData.width;
					const h = imageData.height;
					const r = parseInt(color.substring(1, 3), 16);
					const g = parseInt(color.substring(3, 5), 16);
					const b = parseInt(color.substring(5, 7), 16);
					for(let j = 0; j < h; ++j) {
						for(let k = 0; k < w; ++k) {
							if(imageData.data[(j * w + k) * 4 + 0] < 5) continue;
							if(imageData.data[(j * w + k) * 4 + 1] < 5) continue;
							if(imageData.data[(j * w + k) * 4 + 2] < 5) continue;
							imageData.data[(j * w + k) * 4 + 0] = r;
							imageData.data[(j * w + k) * 4 + 1] = g;
							imageData.data[(j * w + k) * 4 + 2] = b;
						}
					}
				})(this.imageData[i], this.CAMEL_COLOR[i]);
			})(this.canvas[i], this.context[i]);
		}
	};
	private drawOnce = (id: number, x: number, y: number) => {
		this.context[id].clearRect(0, 0, this.canvas[id].width, this.canvas[id].height);
		this.context[id].putImageData(this.imageData[id], x * this.CAMEL_WIDTH, y * (this.CAMEL_HEIGHT - this.CAMEL_MARGIN));
	};
	public draw = (json: {x: number[], y: number[]}) => {
		for(let i = 0; i < this.CAMEL_NUM; ++i) {
			this.drawOnce(i, json.x[i], json.y[i]);
		}
	};
};