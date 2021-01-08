const d = document;
const $form = d.getElementById('form');
export function getUrl() {
	$form.addEventListener('submit', (e) => {
		e.preventDefault();
		const url = $form.input.value;
		console.log(url);
		// return url;
	});
	return 'hola';
}
