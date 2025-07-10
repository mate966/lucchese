import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function updateAssets() {
	const publicDir = path.join(__dirname, '..', 'public');
	const dataFile = path.join(__dirname, '..', 'src', 'data', 'index.json');
	
	const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
	
	const cssFiles = fs.readdirSync(path.join(publicDir, 'css')).filter(file => file.endsWith('.css'));
	const jsFiles = fs.readdirSync(path.join(publicDir, 'js')).filter(file => file.endsWith('.js'));
	
	if (cssFiles.length > 0 && jsFiles.length > 0) {
		data.cssFile = cssFiles[0];
		data.jsFile = jsFiles[0];
		
		fs.writeFileSync(dataFile, JSON.stringify(data, null, '\t'));
	} else {
		console.error('❌ Nie znaleziono plików CSS lub JS w public/');
	}
}

updateAssets(); 