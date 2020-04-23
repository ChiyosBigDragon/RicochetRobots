import * as acgraph from 'acgraph';

export class DrawBoard {
	private GRID_WIDTH: number;
	private GRID_HEIGHT: number;
	private stage;
	private gridLayer;
	private wallLayer;
	private stepLayer;
	private stepText;
	constructor(private GRID_NUM_Y: number, private GRID_NUM_X: number, private container: HTMLElement) {
		this.stage = acgraph.create(container);
		this.GRID_WIDTH = container.clientWidth / GRID_NUM_X;
		this.GRID_HEIGHT = container.clientHeight / GRID_NUM_Y;
		this.gridLayer = this.stage.layer();
		this.wallLayer = this.stage.layer();
		this.stepLayer = this.stage.layer();
		this.grid();
		this.createStep();
	}
	private createStep = () => {
		this.stepLayer.zIndex(2);
		this.stepLayer.setPosition(this.GRID_WIDTH * (this.GRID_NUM_X / 2 - 1), this.GRID_HEIGHT * (this.GRID_NUM_Y / 2 - 1));
		this.stepLayer.rect(0, 0, this.GRID_WIDTH * 2, this.GRID_HEIGHT * 2).fill('#546E7A').stroke({color: 'red', thickness: 0});
		this.stepText = this.stepLayer.text(0, 0, "aaa");
		// const rect = this.stepLayer.rect(this.GRID_WIDTH * (this.GRID_NUM_X / 2 - 1), this.GRID_HEIGHT * (this.GRID_NUM_Y / 2 - 1), this.GRID_WIDTH * 2, this.GRID_HEIGHT * 2).fill('#546E7A').stroke({color: 'red', thickness: 0});
	};
	private grid = () => {
		this.gridLayer.remove();
		this.gridLayer = this.stage.layer();
		for(let x = 0; x <= this.GRID_NUM_X; ++x) {
			this.gridLayer.path().moveTo(x * this.GRID_WIDTH, 0).lineTo(x * this.GRID_WIDTH, this.GRID_NUM_Y * this.GRID_HEIGHT).stroke({color: '#95a5a6'});
		}
		for(let y = 0; y <= this.GRID_NUM_Y; ++y) {
			this.gridLayer.path().moveTo(0, y * this.GRID_HEIGHT).lineTo(this.GRID_NUM_X * this.GRID_WIDTH, y * this.GRID_HEIGHT).stroke({color: '#95a5a6'});
		}
	};
	public step = (num: number) => {
		this.stepText.text(num.toString().padStart(2, "0"));
		// context.fillText(cnt.toString().padStart(2, "0"), BOARD_SIZE / 2 - GRID_SIZE * 0.89, BOARD_SIZE / 2 + GRID_SIZE * 0.55, 72);
	};
	public wall = (wallX: object, wallY) => {
		this.wallLayer.remove();
		this.wallLayer = this.stage.layer();
		// 横
		for(let y = 0; y <= this.GRID_NUM_Y; ++y) {
			for(let x = 0; x < this.GRID_NUM_X; ++x) {
				if(!wallX[y][x]) continue;
				let beginX = x * this.GRID_WIDTH;
				let beginY = y * this.GRID_HEIGHT;
				this.gridLayer.path().moveTo(beginX, beginY).lineTo(beginX + this.GRID_WIDTH, beginY).stroke({color: '#546E7A'}, 6);
			}
		}
		// 縦
		for(let x = 0; x <= this.GRID_NUM_X; ++x) {
			for(let y = 0; y < this.GRID_NUM_Y; ++y) {
				if(!wallY[y][x]) continue;
				let beginX = x * this.GRID_WIDTH;
				let beginY = y * this.GRID_HEIGHT;
				this.gridLayer.path().moveTo(beginX, beginY).lineTo(beginX, beginY + this.GRID_HEIGHT).stroke({color: '#546E7A'}, 6);
			}
		}
	};
};
