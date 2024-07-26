/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ["./shared/**/*.{html,js,ts,tsx}", "./app/**/*.{html,js,tsx,ts}"],
	darkMode: "class",
	// mode: 'jit',
	theme: {
		screens: {
			xs: "520px",
			sm: "640px",
			md: "768px",
			xmd: "900px",
			lg: "1024px",
			xl: "1280px",
		},
		extend: {
	
			fontFamily: {
				sans: ["Manrope", "sans-serif"],
				roboto: ["roboto", "sans-serif"],		
			},
			colors: {
deepGreen: "#008c1a",
deepGreenO: "rgba(0, 140, 26, 0.2)",
lightGreen: "#ebf5ed",
stripe: "rgba(246, 249, 252, 1)"
			},
		},
	},
	plugins: [],
};
