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

				if (
					/^og\/.+\.(png|jpg|jpeg|webp|gif)$/i.test(String(path).replace(/^\/|\/$/g, '')) ||
					path.startsWith('/og/')
				) {
					console.warn('[prerender] Skipping OG image path:', path);
					return;
				}

				throw new Error(message || `Prerender failed for path: ${path}`);
			}
		},
		csp: {
			mode: 'auto'
		}
	}
};

export default config;
