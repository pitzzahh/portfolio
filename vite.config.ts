import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import adapter from '@sveltejs/adapter-cloudflare';
import { sveltekit } from '@sveltejs/kit/vite';
import { sveltekitOG } from '@ethercorps/sveltekit-og/plugin';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
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
		}),
		sveltekitOG()
	],
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					browser: {
						enabled: true,
						provider: playwright(),
						instances: [{ browser: 'chromium', headless: true }]
					},
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**']
				}
			}
		]
	}
});
