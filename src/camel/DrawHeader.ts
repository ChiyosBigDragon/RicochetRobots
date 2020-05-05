export class DrawHeader {
	private container: any;
	private name: any;
	private point: any;
	private rank: any;
	constructor(private HEADER_WIDTH: number, private HEADER_HEIGHT: number, private stage) {
		stage.height(HEADER_HEIGHT);
		// stage.rect(0, 0, HEADER_WIDTH, HEADER_HEIGHT);
		// this.header = _layer;
		// const rec = this.header.rect(0, 0, HEADER_WIDTH, HEADER_HEIGHT);
		// // rec.visible(false);
		// this.container = this.header.layer();
		// this.container.attr("class", "header-container");
		// this.name = this.container.text().attr("class", "header-item");
		// this.name.text("aaa");
		// this.point = this.container.text().attr("class", "header-item");
		// this.point.text("bbb");
	}
	private createName = (container: any) => {
		const ret = container.layer();
		ret.attr("class", "header-item");
		return ret;
	};
	// public drawName = (str: string) => {
	// 	this.header.fontSize(this.HEADER_HEIGHT * 0.9);
	// };
	public draw = (str: string) => {
		// this.context.font = "64px Oxanium";
		// this.context.fillStyle = 'black';
		// this.context.lineWidth = 1;
		// this.context.fillText(str, 0, 64);
	};
};
