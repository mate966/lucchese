/** @type {import('tailwindcss').Config} */
export default {
	content: ['./views/**/*.twig', './src/**/*.{js,ts,jsx,tsx}'],
	prefix: 'tw-',
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#0c2852',
				},
			},
			spacing: {
				'left-full': '-100%',
			},
		},
	},
	plugins: [],
};
