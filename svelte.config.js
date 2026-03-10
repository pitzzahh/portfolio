import adapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		csp: {
			mode: 'auto',
			directives: {
				'default-src': ['self'],
				'script-src': ['self'],
				'worker-src': ['self', 'blob:'],
				'style-src': ['self', 'unsafe-inline', 'https://fonts.googleapis.com'],
				'img-src': ['self', 'data:'],
				'font-src': ['self', 'https://fonts.gstatic.com'],
				'connect-src': ['self']
			}
		}
	}
};

export default config;
