export class CreateGoal {
	private layer;
	private robotLayer;
	private backLayer;
	private textLayer;
	constructor(private WIDTH, private HEIGHT, private stage) {
		this.layer = stage.layer();
		// 背景
		this.backLayer = this.layer.rect(-180, -80, 360, 360);
		// ロボット本体
		this.robotLayer = this.layer.layer();
		const colorLayer = this.robotLayer.layer();
		const bb = colorLayer.layer();
		bb.attr("stroke-width", "14.4");
		bb.ellipse(0, 41, 91, 84).fill("white").attr("stroke", "#FFF");
		bb.rect(-91, 20, 182, 182).round(22).fill("white").attr("stroke", "#FFF");
		const aa = colorLayer.layer();
		aa.attr("stroke-width", "7.2");
		aa.rect(14, -86, 13, 86).attr("transform", "rotate(29)").round(6.5).fill("white").attr("stroke", "#FFF");
		aa.rect(-143, 41, 48, 133).round(24).fill("white").attr("stroke", "#FFF");
		aa.rect(-58, 138, 48, 133).round(24).fill("white").attr("stroke", "#FFF");
		aa.scale(-1, 1);
		const a = colorLayer.layer();
		a.attr("stroke-width", "7.2");
		a.rect(14, -86, 13, 86).attr("transform", "rotate(29)").round(6.5).fill("white").attr("stroke", "#FFF");
		a.rect(-143, 41, 48, 133).round(24).fill("white").attr("stroke", "#FFF");
		a.rect(-58, 138, 48, 133).round(24).fill("white").attr("stroke", "#FFF");
		const b = colorLayer.layer();
		b.attr("stroke-width", "0.0");
		b.ellipse(0, 41, 91, 84).fill("white").attr("stroke", "#FFF");
		b.rect(-91, 20, 182, 182).round(22).fill("white").attr("stroke", "#FFF");
		const c = colorLayer.layer();
		c.attr("stroke-width", "7.2");
		c.path().attr("d", "m-95 44.5h190").attr("stroke", "#FFF");
		c.circle(-42, 0, 4).attr("stroke", "#FFF");
		c.circle(42, 0, 4).attr("stroke", "#FFF");
		// ID
		this.textLayer = this.layer.text();
		this.textLayer.text(String(1));
		this.textLayer.fontSize(180);
		this.textLayer.setPosition(-55, 10);
		this.textLayer.color("black");
		this.setHeight(HEIGHT);
	};
	public setHeight = (HEIGHT: number) => {
		const ratio = HEIGHT / this.layer.getHeight();
		this.layer.scale(ratio, ratio, this.WIDTH / 2, this.HEIGHT / 2);
	};
	public setPosition = (x: number, y: number) => {
		this.layer.setPosition(x * this.WIDTH, y * this.HEIGHT);
	};
	public changeColor = (id: number, color: string) => {
		this.textLayer.text(String(id + 1));
		this.backLayer.fill(color);
	};
	public zIndex = (z: number) => {
		this.layer.zIndex(z);
	};
};

