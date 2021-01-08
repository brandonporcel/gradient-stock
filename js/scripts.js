const d = document;
const $colorBtn = d.getElementById('add-color');
const $otherShoeForm = d.getElementById('other-shoe-form');
const $canvas = d.getElementById('canvas');
const $ctx = $canvas.getContext('2d');
const $rangeInput = d.getElementById('range-input');
let images = [];
const otherImages = [];
let checkSubmit = false;
const renderImages = (index, img) => {
	$ctx.drawImage(img[index], 0, 0, $canvas.width, $canvas.height);
};
const handleRangeInput = () => {
	if (checkSubmit === false) {
		renderImages($rangeInput.value, images);
	} else {
		images = [];
		renderImages($rangeInput.value, otherImages);
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
const getImages = (url, imggg) => {
	for (let i = 1; i <= 36; i += 1) {
		const number = `0${i}`.slice(-2);
		const newUrl = url.replace('img01', `img${number}`);
		const eachImage = new Image();
		eachImage.src = newUrl;
		eachImage.crossOrigin = 'anonymous';
		imggg[i] = eachImage;
		if (i === 1) {
			imggg[1].addEventListener('load', () => {
				$otherShoeForm.urlInput.value = '';
				$otherShoeForm.urlInput.focus();
				renderImages(i, imggg);
				const colors = getColorPalette();
				setProperties(colors);
			});
		}
	}
};
const getOtherShoe = (e) => {
	checkSubmit = true;
	if (checkSubmit === true) {
		e.preventDefault();
		images = [];
		getImages($otherShoeForm.urlInput.value, otherImages);
	}
};

d.addEventListener(
	'DOMContentLoaded',
	getImages(
		'https://stockx-360.imgix.net/Air-Jordan-1-Mid-Banned-2020/Images/Air-Jordan-1-Mid-Banned-2020/Lv2/img01.jpg?auto=format,compress&q=90&updated_at=1606326136&w=1000',
		images
	)
);
$rangeInput.addEventListener('input', handleRangeInput);
$otherShoeForm.addEventListener('submit', getOtherShoe);

$colorBtn.addEventListener('click', () => {
	d.querySelector('.gradient').classList.toggle('opacity-on');
	d.querySelector('.palette').classList.toggle('opacity-on');
	$colorBtn.classList.toggle('color-black');
});
