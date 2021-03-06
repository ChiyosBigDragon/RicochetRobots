export class CreateRobot {
	private layer;
	private robotLayer;
	private backLayer;
	constructor(public id: number, private color: string, private WIDTH, private HEIGHT, private stage) {
		this.layer = stage.layer();
		// 背景
		this.backLayer = this.layer.rect(-180, -80, 360, 360);
		this.backLayer.stroke("#D500F9");
		this.backLayer.strokeThickness(20);
		// ロボット本体
		this.robotLayer = this.layer.layer();
		const colorLayer = this.robotLayer.layer();
		const bb = colorLayer.layer();
		bb.attr("stroke-width", "14.4");
		bb.ellipse(0, 41, 91, 84).fill(color).attr("stroke", "#FFF");
		bb.rect(-91, 20, 182, 182).round(22).fill(color).attr("stroke", "#FFF");
		const aa = colorLayer.layer();
		aa.attr("stroke-width", "7.2");
		aa.rect(14, -86, 13, 86).attr("transform", "rotate(29)").round(6.5).fill(color).attr("stroke", "#FFF");
		aa.rect(-143, 41, 48, 133).round(24).fill(color).attr("stroke", "#FFF");
		aa.rect(-58, 138, 48, 133).round(24).fill(color).attr("stroke", "#FFF");
		aa.scale(-1, 1);
		const a = colorLayer.layer();
		a.attr("stroke-width", "7.2");
		a.rect(14, -86, 13, 86).attr("transform", "rotate(29)").round(6.5).fill(color).attr("stroke", "#FFF");
		a.rect(-143, 41, 48, 133).round(24).fill(color).attr("stroke", "#FFF");
		a.rect(-58, 138, 48, 133).round(24).fill(color).attr("stroke", "#FFF");
		const b = colorLayer.layer();
		b.attr("stroke-width", "0.0");
		b.ellipse(0, 41, 91, 84).fill(color).attr("stroke", "#FFF");
		b.rect(-91, 20, 182, 182).round(22).fill(color).attr("stroke", "#FFF");
		const c = colorLayer.layer();
		c.attr("stroke-width", "7.2");
		c.path().attr("d", "m-95 44.5h190").attr("stroke", "#FFF");
		c.circle(-42, 0, 4).attr("stroke", "#FFF");
		c.circle(42, 0, 4).attr("stroke", "#FFF");
		// ID
		const textLayer = this.layer.text();
		textLayer.text(id.toString());
		textLayer.fontSize(180);
		textLayer.setPosition(-55, 10);
		textLayer.color("black");
		// 設定
		this.setHeight(HEIGHT);
		this.select(false);
	};
	public setHeight = (HEIGHT: number) => {
		const ratio = HEIGHT / this.layer.getHeight();
		this.layer.scale(ratio, ratio, this.WIDTH / 2, this.HEIGHT / 2);
	};
	public boardSetPosition = (x: number, y: number) => {
		this.layer.setPosition(x * this.WIDTH, y * this.HEIGHT);
	};
	public setPosition = (x: number, y: number) => {
		this.layer.setPosition(x, y);
	};
	public select = (flag: boolean) => {
		this.backLayer.visible(flag);
	};
	public setClickListener = (func) => {
		this.layer.listen('click', (_e) => {
			func();
		});
	};
};

