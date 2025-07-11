import twig from 'twig';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

twig.cache(false);

try {
	const jsDir = join(__dirname, '..', 'public', 'js');
	const cssDir = join(__dirname, '..', 'public', 'css');
	
	const jsFiles = fs
		.readdirSync(jsDir)
		.filter((file) => file.endsWith('.js'));
	const mainJsFile = jsFiles.find((file) => file.startsWith('index-')) || jsFiles[0];

	const cssFiles = fs
		.readdirSync(cssDir)
		.filter((file) => file.endsWith('.css'));
	const mainCssFile = cssFiles.find((file) => file.startsWith('index-')) || cssFiles[0];

	if (!mainJsFile) {
		throw new Error('Built JS file not found');
	}

	if (!mainCssFile) {
		throw new Error('Built CSS file not found');
	}

	const indexData = JSON.parse(
		fs.readFileSync('./src/data/index.json', 'utf8')
	);

	const buildData = {
		...indexData,
		jsFile: mainJsFile,
		cssFile: mainCssFile,
		dev: false,
	};

	const mainTemplate = join(
		__dirname,
		'..',
		'views',
		'templates',
		'index.twig'
	);
	twig.renderFile(mainTemplate, buildData, (err, html) => {
		if (err) {
			process.exit(1);
		}

		const distPath = join(__dirname, '..', 'public', 'index.html');
		const htmlOut = html.replace(/src\/assets\/images\//g, '/assets/images/');
		fs.writeFileSync(distPath, htmlOut);
	});
} catch (error) {
	console.error('❌ Error during Twig build:', error);
	process.exit(1);
}
