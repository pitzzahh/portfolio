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
			mode: 'auto',
			directives: {
				'default-src': ['self'],
				'script-src': [
					'self',
					'https://static.cloudflareinsights.com',
					'sha256-/gBTEVH1xM958r1ilWt31OXGa+2nXq/ZjlfAritTxFw=',
					'sha256-kPSWMyT8srPWczKu2bUAYuDg5//aU6krNZENCc4Q1qE=',
					'sha256-hMZoJpYB5YIKjNJrBKWNOwa6S8c8R+iB6yT6zEVuxAw=',
					'sha256-568I+Ac5Tkn7gNuBB/lguXUJ+/KJOoZmZyp4oBdK5s0=',
					'sha256-j0NOzTlmmB41yoMGzQGK3ckVG7BP+Vywv0wQ/+V2b0U=',
					'sha256-K3NhF44yfVjkSmBo71LYj0M+saKbyU9EFvjkZiWdIFw='
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
