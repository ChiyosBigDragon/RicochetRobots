export default function Sleep(time) {
	return new Promise((res, _rej) => {
		// debug
		// window.setTimeout(res, 10);
		window.setTimeout(res, time);
	});
};