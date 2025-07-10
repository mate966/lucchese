import { defineConfig } from 'vite';
import copyImages from './build/vite-plugins/copyImages';

const outputConfig = {
	entryFileNames: 'js/[name]-[hash].js',
	chunkFileNames: 'js/[name]-[hash].js',
	assetFileNames: ({ name }) => {
		if (/\.(jpe?g|png)$/i.test(name ?? '')) {
			return 'assets/images/[name][extname]';
		}
		if (/\.css$/.test(name ?? '')) {
			return 'css/[name]-[hash][extname]';
		}
		return '[name]-[hash][extname]';
	},
};

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
		outDir: 'public',
		sourcemap: false,
		rollupOptions: {
			output: outputConfig,
		},
	},
	plugins: [copyImages()],
});
