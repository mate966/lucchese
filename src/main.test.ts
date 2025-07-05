import { describe, it, expect, beforeAll } from 'vitest';
import twig from 'twig';
import path from 'path';

describe('Main App with Twig Template', () => {
	let renderedHtml: string;

	beforeAll(async () => {
		const templatePath = path.join(
			process.cwd(),
			'src',
			'templates',
			'index.twig'
		);

		const testData = {
			title: 'Lucchese - Luxury Shoes',
			product: {
				name: 'Test Product',
				price: 99.99,
				description: 'Test description',
			},
			dev: true,
		};

		renderedHtml = await new Promise((resolve, reject) => {
			twig.renderFile(templatePath, testData, (err, html) => {
				if (err) {
					reject(err);
				} else {
					resolve(html);
				}
			});
		});
	});

	it('should render basic template structure', () => {
		document.body.innerHTML = renderedHtml;

		const container = document.querySelector('.container');
		expect(container).toBeTruthy();

		const productInfo = document.querySelector('.bg-white');
		expect(productInfo).toBeTruthy();
	});

	it('should include required assets', () => {
		document.body.innerHTML = renderedHtml;

		const script = document.querySelector('script[src="/src/main.ts"]');
		expect(script).toBeTruthy();

		const link = document.querySelector('link[href="/src/style.css"]');
		expect(link).toBeTruthy();
	});
});
