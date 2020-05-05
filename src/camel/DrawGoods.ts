import * as acgraph from 'acgraph';

export class DrawGoods {
	constructor(private container) {}
	public dice = (width: number, height: number) => {
		const WIDTH = 100;
		const HEIGHT = 100;
		const ratio = Math.min(width / WIDTH, height / HEIGHT);
		const dice = acgraph.create(this.container);
		const diceRect = dice.rect(0, 0, 100, 100);
		dice.circle(50, 50, 20, 20).fill("red");
		let dom = dice.domElement();
		const unwrap = target => {
			while(target.firstChild) {
				target.parentNode.insertBefore(target.firstChild, target);
			}
			target.remove();
		};
		unwrap(dom.parentNode);
		dom.setAttribute("viewBox", "0 0 100 100");
		dice.listen("mouseover", () => {
			diceRect.fill("yellow");
		});
		dice.listen("mouseout", () => {
			diceRect.fill("white");
		});
		return dice;
	};
};

