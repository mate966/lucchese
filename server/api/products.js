import express from 'express';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function getProducts() {
	const data = readFileSync(join(__dirname, 'product.json'), 'utf8');
	return JSON.parse(data);
}

router.get('/', (req, res) => {
	const products = getProducts();
	res.json({
		success: true,
		data: products.map((product) => ({
			id: product.id,
			title: product.title,
			price: product.price,
			gallery: product.gallery.slice(0, 1),
			bestSeller: product.bestSeller,
			color: product.color,
			colors: product.colors,
			sizes: product.sizes,
			width: product.width,
			ToeHeel: product.ToeHeel,
		})),
	});
});

export default router;
