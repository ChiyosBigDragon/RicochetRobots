export class DrawAnnounce {
	private announce: any;
	constructor(private HEIGHT: number, private container: HTMLDivElement, private docment: Document) {
		container.style.height = this.HEIGHT.toString() + "px";
	}
	public draw = (str: string) => {
		const textBox = this.docment.createElement("div");
		textBox.className = "announce-text";
		textBox.innerText = str;
		this.container.insertBefore(textBox, this.container.firstChild);
	};
};
