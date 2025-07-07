import { describe, it, expect, beforeAll } from 'vitest';
import twig from 'twig';
import path from 'path';

describe('Main App with Twig Template', () => {
	let renderedHtml: string;

	beforeAll(async () => {
		const templatePath = path.join(
			process.cwd(),
			'views',
			'templates',
			'index.twig'
		);

		const testData = {
			modules: [
				{ type: 'bar' },
				{ type: 'product' },
				{ type: 'accordion' },
			],
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

	it('should render modules', () => {
		document.body.innerHTML = renderedHtml;

		const modules = document.querySelectorAll('.module');
		expect(modules.length).toBeGreaterThanOrEqual(3);
	});
});
