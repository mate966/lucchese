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
				neutrals: {
					10: '#fafafa',
					40: '#d9d9d9',
					80: '#4d4d4d',
				},
			},
			spacing: {
				'left-full': '-100%',
			},
			fontSize: {
				'heading-28': ['28px', '34px'],
				lg: ['18px', '25px'],
				md: ['14px', '24px'],
				sm: ['12px', '16px'],
			},
			lineHeight: {
				md: '18px',
				lg: '20px',
			},
			letterSpacing: {
				light: '0.311px',
				wide: '2px',
			},
			fontFamily: {
				sans: ['FuturaPT', 'Arial', 'sans-serif'],
				futura: ['FuturaPT', 'Arial', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
