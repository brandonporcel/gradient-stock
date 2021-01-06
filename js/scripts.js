const d = document;
const $canvas = d.getElementById('canvas');
const $ctx = $canvas.getContext('2d');
const $rangeInput = d.getElementById('range-input');
const images = [];

const getImages = () => {
	for (let i = 1; i <= 36; i += 1) {
		const number = `0${i}`.slice(-2);
		const url = `https://stockx-360.imgix.net/Air-Jordan-1-Mid-Banned-2020/Images/Air-Jordan-1-Mid-Banned-2020/Lv2/img${number}.jpg?auto=format,compress&q=90&updated_at=1606326136&w=1000`;
		const eachImage = new Image();
		eachImage.src = url;
		// meter un alt con banderas
		// images.push(eachImage);
		images[i] = eachImage;
		if (i === 1) {
			$ctx.drawImage(images[i], 0, 0, $canvas.width, $canvas.height);
		}
	}
};

$rangeInput.addEventListener('input', () => {
	$ctx.drawImage(
		images[$rangeInput.value],
		0,
		0,
		$canvas.width,
		$canvas.height
	);
});
d.addEventListener('DOMContentLoaded', getImages);
