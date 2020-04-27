// function KeyUpFunc(e) {
// 	const code = e.keyCode;
// 	// console.log(code);
// 	// ロボット選択(1 - 4)
// 	if(49 <= code && code <= 52) {
// 		change(code - 49);
// 	}
// 	// テンキー
// 	if(97 <= code && code <= 100) {
// 		change(code - 97);
// 	}
// 	// 移動
// 	// 右(→, D)
// 	if(code == 39 || code == 68) {
// 		commandAdd(0);
// 	}
// 	// 下(↓, S)
// 	if(code == 40 || code == 83) {
// 		commandAdd(1);
// 	}
// 	// 左(←, A)
// 	if(code == 37 || code == 65) {
// 		commandAdd(2);
// 	}
// 	// 上(↑, W)
// 	if(code == 38 || code == 87) {
// 		commandAdd(3);
// 	}
// 	// 送信(Enter)
// 	if(code == 13) {
// 		submit();
// 	}
// 	// 削除(5)
// 	if(code == 53 || code == 101) {
// 		countDecrement();
// 	}
// 	// ゴール変更(C)
// 	if(code == 67) {
// 		goalInit();
// 	}
// 	// リセット(R)
// 	if(code == 82) {
// 		commandReset();
// 	}
// }
// document.addEventListener("keyup", KeyUpFunc);