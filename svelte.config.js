import adapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		prerender: {
			handleHttpError: ({ path, message }) => {
				console.warn('[prerender] handleHttpError:', path, message);

				if (/^https?:\/\//i.test(path)) {
					console.warn('[prerender] Skipping absolute external URL:', path);
					return;
				}

				const trimmed = String(path).replace(/^\/|\/$/g, '');
				const firstSegment = trimmed.split('/')[0] || '';

				if (firstSegment.includes('.') && !firstSegment.includes(' ')) {
					console.warn('[prerender] Skipping domain-like link (external reference):', firstSegment);
					return;
				}

				if (/^og\/.+\.(png|jpg|jpeg|webp|gif)$/i.test(trimmed) || path.startsWith('/og/')) {
					console.warn('[prerender] Skipping OG image path:', path);
					return;
				}

				throw new Error(message || `Prerender failed for path: ${path}`);
			}
		},
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
