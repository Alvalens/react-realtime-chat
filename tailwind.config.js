/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
	content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/daisyui/dist/**/*.js",
		"node_modules/react-daisyui/dist/**/*.js",
],
	theme: {
		extend: {},
	},
	plugins: [require('daisyui')],
};


