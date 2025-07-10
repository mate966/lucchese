import express from 'express';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function getRecommendations() {
	const data = readFileSync(join(__dirname, 'recommendations.json'), 'utf8');
	return JSON.parse(data);
}

router.get('/', (req, res) => {
	try {
		const recommendations = getRecommendations();
		res.json({
			success: true,
			data: recommendations,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Failed to fetch recommendations',
		});
	}
});

export default router;
