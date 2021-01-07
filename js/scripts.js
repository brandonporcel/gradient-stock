const d = document;
// const $colorBtn = d.getElementById('add-color');
// let checkColor = false;
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
		`rgb(${colors[0].red},${colors[0].green},${colors[0].blue})`
	);
	d.body.style.setProperty('--secondary', 'black');
	d.body.style.setProperty('--tertiary', 'red');
};
const getImages = () => {
	for (let i = 1; i <= 36; i += 1) {
		const number = `0${i}`.slice(-2);
		// const url = `https://stockx-360.imgix.net/Air-Jordan-1-Mid-Banned-2020/Images/Air-Jordan-1-Mid-Banned-2020/Lv2/img${number}.jpg?auto=format,compress&q=90&updated_at=1606326136&w=1000`;
		const url = `https://stockx-360.imgix.net/Converse-One-Star-Ox-Tyler-The-Creator-Golf-Le-Fleur-Purple-Green/Images/Converse-One-Star-Ox-Tyler-The-Creator-Golf-Le-Fleur-Purple-Green/Lv2/img${number}.jpg?auto=format,compress&q=90&updated_at=1603481985&w=1000`;
		const eachImage = new Image();
		eachImage.src = url;
		eachImage.crossOrigin = 'anonymous';
		images[i] = eachImage;
		if (i === 1) {
			renderImages(i);
			const colors = getColorPalette();
			setProperties(colors);
		}
	}
};

d.addEventListener('DOMContentLoaded', getImages);
$rangeInput.addEventListener('input', handleRangeInput);
// $colorBtn.addEventListener('click', addingColor);
