import express from 'express';
import productsRouter from './products.js';
import recommendationsRouter from './recommendations.js';

const router = express.Router();

router.use('/products', productsRouter);
router.use('/recommendations', recommendationsRouter);

router.get('/health', (req, res) => {
	res.json({
		success: true,
		message: 'API is running',
		timestamp: new Date().toISOString(),
	});
});

export default router;
