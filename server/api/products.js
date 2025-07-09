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
			widths: product.widths,
			toeHeels: product.toeHeels,
		})),
	});
});

router.get('/:id', (req, res) => {
	const products = getProducts();
	const product = products.find((p) => p.id === req.params.id);

	if (!product) {
		return res.status(404).json({
			success: false,
			message: 'Product not found',
		});
	}

	res.json({
		success: true,
		data: product,
	});
});

export default router;
