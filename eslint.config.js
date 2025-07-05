import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default [
	js.configs.recommended,
	...tseslint.configs.recommended,
	...tseslint.configs.stylistic,
	prettier,
	{
		ignores: ['dist/**', 'node_modules/**', 'build/**', 'eslint.config.js'],
		files: ['**/*.ts', '**/*.tsx'],
		languageOptions: {
			parserOptions: {
				project: './tsconfig.json',
				sourceType: 'module',
				ecmaVersion: 'latest',
			},
		},
		rules: {
			'no-console': 'warn',
			'no-debugger': 'error',
			'no-unused-vars': 'warn',
			eqeqeq: ['error', 'always'],
			curly: 'error',
			semi: ['error', 'always'],
			quotes: ['error', 'single'],
			'prettier/prettier': 'off',
		},
	},
	{
		files: ['**/*.js', '**/*.mjs'],
		languageOptions: {
			sourceType: 'module',
			ecmaVersion: 'latest',
		},
		rules: {
			'no-console': 'warn',
			'no-debugger': 'error',
			'no-unused-vars': 'warn',
			eqeqeq: ['error', 'always'],
			curly: 'error',
			semi: ['error', 'always'],
			quotes: ['error', 'single'],
			'prettier/prettier': 'off',
		},
	},
];
