export default class Dice {
	private used: (number | null)[];
	constructor(private CAMEL_NUM: number, private MOVE_NUM: number) {
		this.used = new Array(CAMEL_NUM);
		this.init();
	}
	public init = () => {
		for(let i = 0; i < this.CAMEL_NUM; ++i) {
			this.used[i] = null;
		}
	};
	public roll = () => {
		let color: number, move: number;
		while(true) {
			color = Math.floor(Math.random() * this.CAMEL_NUM);
			if(this.used[color]) continue;
			move = Math.floor(Math.random() * this.MOVE_NUM) + 1;
			this.used[color] = move;
			break;
		}
		let endFlg = false;
		{ // check
			let usedAll = true;
			for(let i = 0; i < this.CAMEL_NUM; ++i) {
				if(this.used[i] == null) usedAll = false;
			}
			if(usedAll) {
				endFlg = true;
				// this.init();
				// throw 'Every camel has already moved.';
			}
		}
		return {color: color, move: move, endFlg: endFlg};
	};
	public status = () => {
		return this.used;
	}
};