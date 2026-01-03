// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		// ...他のパス
	],
	darkMode: 'class', // ここを 'class' に設定
	theme: {
		extend: {},
	},
	plugins: [],
};