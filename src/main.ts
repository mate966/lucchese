import './styles/main.scss';

import Site from './ts/Site';

window.addEventListener('load', () => {
	const site = new Site();
	site.init();
});
