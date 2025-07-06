import { defineConfig } from 'vite';

export default defineConfig({
	appType: 'custom',
	css: {
		postcss: './postcss.config.js',
	},
	server: {
		port: 5173,
		watch: {
			usePolling: true,
			interval: 100,
		},
		fs: {
			strict: false,
		},
	},
	build: {
		outDir: 'dist',
	},
});
