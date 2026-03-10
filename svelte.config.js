import adapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		csp: {
			mode: 'auto',
			directives: {
				'default-src': ['self'],
				'script-src': [
					'self',
					'https://static.cloudflareinsights.com',
					'sha256-/gBTEVH1xM958r1ilWt31OXGa+2nXq/ZjlfAritTxFw=',
					'sha256-kPSWMyT8srPWczKu2bUAYuDg5//aU6krNZENCc4Q1qE='
				],
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
