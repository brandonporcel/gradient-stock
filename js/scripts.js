const d = document;
const $canvas = d.getElementById('canvas');
const $ctx = $canvas.getContext('2d');
const $rangeInput = d.getElementById('range-input');
const images = [];
const renderImages = (index) => {
	$ctx.drawImage(images[index], 0, 0, $canvas.width, $canvas.height);
};
const handleRangeInput = () => {
	renderImages($rangeInput.value);
};
const getImages = () => {
	for (let i = 1; i <= 36; i += 1) {
		const number = `0${i}`.slice(-2);
		const url = `https://stockx-360.imgix.net/Air-Jordan-1-Mid-Banned-2020/Images/Air-Jordan-1-Mid-Banned-2020/Lv2/img${number}.jpg?auto=format,compress&q=90&updated_at=1606326136&w=1000`;
		const eachImage = new Image();
		eachImage.src = url;
		images[i] = eachImage;
		if (i === 1) {
			renderImages(i);
		}
	}
};

$rangeInput.addEventListener('input', handleRangeInput);
d.addEventListener('DOMContentLoaded', getImages);
