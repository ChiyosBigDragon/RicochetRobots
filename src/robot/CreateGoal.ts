export class CreateGoal {
	private layer;
	private backLayer;
	private textLayer;
	constructor(private WIDTH, private HEIGHT, private stage) {
		this.backLayer = stage.layer().rect(0, 0, WIDTH, HEIGHT);
		this.backLayer.fill("red");
		this.layer = stage.layer();
		this.layer.zIndex(0);
		const colorLayer = this.layer.layer();
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
		this.textLayer = this.layer.text();
		this.textLayer.zIndex(1);
		this.textLayer.text((0).toString());
		this.textLayer.fontSize(180);
		this.textLayer.setPosition(-55, 10);
		this.textLayer.color("black");
		this.setHeight(HEIGHT);
	};
	public setHeight = (HEIGHT: number) => {
		const ratio = HEIGHT / this.layer.getHeight() * 0.95;
		this.layer.scale(ratio, ratio, this.WIDTH / 2, this.HEIGHT / 2);
	};
	public setPosition = (x: number, y: number) => {
		const marginX = (this.WIDTH - this.layer.getWidth()) / 2;
		const marginY = (this.HEIGHT - this.layer.getHeight()) / 2 * 0.8;
		this.layer.setPosition(marginX + x * this.WIDTH, marginY + y * this.HEIGHT);
		this.backLayer.setPosition(x * this.WIDTH, y * this.HEIGHT);
	};
	public changeColor = (id: number, color: string) => {
		this.textLayer.text(id.toString());
		this.backLayer.fill(color);
	};
};

