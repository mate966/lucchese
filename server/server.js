import express from 'express';
import twig from 'twig';
import livereload from 'livereload';
import connectLivereload from 'connect-livereload';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

import apiRouter from './api/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 8000;
const isDev = process.env.NODE_ENV !== 'production';

process.on('uncaughtException', (err) => {
	if (err.message?.includes('ENOENT')) {
		console.error('Twig file not found:', err.message);
	} else {
		console.error('Uncaught Exception:', err.message);
	}
	if (isDev) process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
	console.error('Unhandled Rejection at:', promise, 'reason:', reason);
	if (isDev) process.exit(1);
});

twig.cache(false);

if (isDev) {
	const liveReloadServer = livereload.createServer({
		exts: ['html', 'css', 'js', 'ts', 'twig', 'json'],
		delay: 100,
		excludeList: ['.git', 'node_modules'],
	});
	liveReloadServer.watch([
		join(__dirname, '..', 'public'),
		join(__dirname, '..', 'src'),
		join(__dirname, '..', 'views'),
	]);

	app.use(connectLivereload());

	app.use((req, res, next) => {
		res.setHeader(
			'Content-Security-Policy',
			"default-src 'self' http://localhost:35729; script-src 'self' http://localhost:35729 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; font-src 'self' data:; connect-src 'self' ws://localhost:35729 ws://localhost:8000 ws://localhost:5173"
		);
		next();
	});

	app.use(['/src', '/@vite', '/@id', '/node_modules'], async (req, res) => {
		const targetUrl = `http://localhost:5173${req.originalUrl}`;
		const http = await import('http');
		const url = new URL(targetUrl);

		const options = {
			hostname: url.hostname,
			port: url.port,
			path: url.pathname + url.search,
			method: req.method,
			headers: req.headers,
		};

		const proxyReq = http.request(options, (proxyRes) => {
			res.writeHead(proxyRes.statusCode, proxyRes.headers);
			proxyRes.pipe(res);
		});

		proxyReq.on('error', (err) => {
			console.error('Proxy error:', err.message);
			res.status(500).send('Proxy error: ' + err.message);
		});

		req.pipe(proxyReq);
	});
}

app.use('/api', apiRouter);

app.use('/css', express.static(join(__dirname, '..', 'public', 'css')));
app.use('/js', express.static(join(__dirname, '..', 'public', 'js')));
app.use('/assets', express.static(join(__dirname, '..', 'src', 'assets')));

if (!isDev) {
	app.use('/src', express.static(join(__dirname, '..', 'src')));
	app.use(
		'/assets',
		express.static(join(__dirname, '..', 'public', 'assets'))
	);
	app.use(
		express.static(join(__dirname, '..', 'public'), {
			index: false,
		})
	);
}

app.get('/', (req, res) => {
	try {
		const pageData = JSON.parse(
			fs.readFileSync(
				join(__dirname, '..', 'src', 'data', 'index.json'),
				'utf8'
			)
		);

		const templateData = {
			...pageData,
			dev: isDev,
		};

		const mainTemplate = join(
			__dirname,
			'..',
			'views',
			'templates',
			'index.twig'
		);

		if (!fs.existsSync(mainTemplate)) {
			console.error('Main template not found:', mainTemplate);
			return res.status(500).send('Main template not found');
		}

		twig.renderFile(mainTemplate, templateData, (err, html) => {
			if (err) {
				console.error('Twig rendering error:', err.message);
				return res
					.status(500)
					.send(`Błąd renderowania: ${err.message}`);
			}
			res.send(html);
		});
	} catch (error) {
		console.error('Error loading page data:', error);
		res.status(500).send('Server error');
	}
});

if (isDev) {
	app.listen(PORT, () => {
		console.log(`Server running on http://localhost:${PORT}`);
	});
}

export default app;
