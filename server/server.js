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
	if (err.message && err.message.includes('ENOENT')) {
		console.error('Twig file not found:', err.message);
	} else {
		console.error('Uncaught Exception:', err.message);
	}
});

process.on('unhandledRejection', (reason, promise) => {
	console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

twig.cache(false);

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

if (isDev) {
	app.use(connectLivereload());

	app.use((req, res, next) => {
		res.setHeader(
			'Content-Security-Policy',
			"default-src 'self' http://localhost:35729; script-src 'self' http://localhost:35729 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; connect-src 'self' ws://localhost:35729 ws://localhost:8000 ws://localhost:5173"
		);
		next();
	});

	app.use(
		['/src', '/@vite', '/@id', '/node_modules'],
		async (req, res, next) => {
			let targetUrl;
			if (req.originalUrl.startsWith('/@vite/')) {
				targetUrl = `http://localhost:5173${req.originalUrl}`;
			} else if (req.originalUrl.startsWith('/node_modules/')) {
				targetUrl = `http://localhost:5173${req.originalUrl}`;
			} else {
				targetUrl = `http://localhost:5173/src${req.url}`;
			}

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
				res.status(500).send('Proxy error: ' + err.message);
			});

			req.pipe(proxyReq);
		}
	);
}

app.use(express.static(join(__dirname, '..', 'public')));

app.use('/api', apiRouter);

if (!isDev) {
	app.use('/src', express.static(join(__dirname, '..', 'src')));
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

		const renderTemplate = () => {
			return new Promise((resolve, reject) => {
				twig.renderFile(mainTemplate, templateData, (err, html) => {
					if (err) {
						reject(err);
					} else {
						resolve(html);
					}
				});
			});
		};

		renderTemplate()
			.then((html) => {
				res.send(html);
			})
			.catch((err) => {
				console.error('Twig rendering error:', err.message);
				res.status(500).send(`Błąd renderowania: ${err.message}`);
			});
	} catch (error) {
		res.status(500).send('Server error');
	}
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
