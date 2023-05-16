/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			animation: {
				click: 'click 0.3s ease-in-out'
			},
			keyframes: {
				click: {
					'0%, 100%': {
						transform: 'translateY(0px) scale(100%)',
						opacity: '100%'
					},
					'30%, 40%': {
						opacity: '80%'
					},
					'50%': {
						transform: 'translateY(-10px) scale(110%)',
					}
				}
			}
		}
	},
	plugins: []
};
