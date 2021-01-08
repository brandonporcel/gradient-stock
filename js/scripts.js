const d = document;
const $colorBtn = d.getElementById('add-color');
const $otherShoeForm = d.getElementById('other-shoe-form');

const $canvas = d.getElementById('canvas');
const $ctx = $canvas.getContext('2d');
const $rangeInput = d.getElementById('range-input');
let images = [];
const imagess = [];
const renderImages = (index) => {
	$ctx.drawImage(images[index], 0, 0, $canvas.width, $canvas.height);
};
const renderImagess = (index) => {
	$ctx.drawImage(imagess[index], 0, 0, $canvas.width, $canvas.height);
};

const handleRangeInput = () => {
	renderImages($rangeInput.value);
};
const handleRangeInputt = () => {
	renderImagess($rangeInput.value);
};

const getOtherShoe = (e) => {
	e.preventDefault();
	images = [];
	for (let i = 1; i <= 36; i += 1) {
		$ctx.clearRect(0, 0, $canvas.width, $canvas.height);
		const number = `0${i}`.slice(-2);
		const url = $otherShoeForm.urlInput.value;
		const newUrl = url.replace('img01', `img${number}`);
		const image = new Image();
		image.crossOrigin = 'anonymous';
		image.src = newUrl;
		imagess[i] = image;
		if (i === 1) {
			imagess[i].addEventListener('load', () => {
				renderImagess(i);
			});
		}
	}
};

const getColorPalette = () => {
	// Uint8ClampedArray depende del tamaño del canvas,cuando ma grande,mayou la cantidad
	// data: Uint8ClampedArray(1744896)
	// (canvas.width*canvas.height) *4(colores RGBA)
	const imageData = $ctx.getImageData(0, 0, $canvas.width, $canvas.height).data;
	// para no tener pixeles muy cercanos
	const iterations = 115;
	const colors = [];
	for (let i = 0; i < $canvas.width * $canvas.height; i += iterations) {
		const iteratorElement = i * 4;
		const colorRGB = imageData[iteratorElement];
		if (colorRGB !== 0) {
			if (colorRGB !== 255 && colorRGB < 220) {
				const red = imageData[iteratorElement];
				const green = imageData[iteratorElement + 1];
				const blue = imageData[iteratorElement + 2];
				colors.push({ red, green, blue });
			}
		}
	}
	return colors;
};
const setProperties = (colors) => {
	d.body.style.setProperty(
		'--primary',
		`rgb(${colors[50].red},${colors[50].green},${colors[50].blue})`
	);

	d.body.style.setProperty(
		'--secondary',
		`rgb(${colors[100].red},${colors[100].green},${colors[100].blue})`
	);
	d.body.style.setProperty(
		'--tertiary',
		`rgb(${colors[300].red},${colors[300].green},${colors[300].blue})`
	);
};
const getImages = () => {
	for (let i = 1; i <= 36; i += 1) {
		const number = `0${i}`.slice(-2);
		const url = `https://stockx-360.imgix.net/Air-Jordan-1-Mid-Banned-2020/Images/Air-Jordan-1-Mid-Banned-2020/Lv2/img${number}.jpg?auto=format,compress&q=90&updated_at=1606326136&w=1000`;
		const eachImage = new Image();
		eachImage.src = url;
		eachImage.crossOrigin = 'anonymous';
		images[i] = eachImage;
		if (i === 1) {
			images[1].addEventListener('load', () => {
				renderImages(i);
				const colors = getColorPalette();
				setProperties(colors);
			});
		}
	}
};

d.addEventListener('DOMContentLoaded', getImages);
$rangeInput.addEventListener('input', handleRangeInput);
$rangeInput.addEventListener('change', handleRangeInputt);
$otherShoeForm.addEventListener('submit', getOtherShoe);

$colorBtn.addEventListener('click', () => {
	d.querySelector('.gradient').classList.toggle('opacity-on');
	d.querySelector('.palette').classList.toggle('opacity-on');
	$colorBtn.classList.toggle('color-black');
});
