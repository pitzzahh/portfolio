import { sequence } from '@sveltejs/kit/hooks';

/**
 * SvelteKit handle hook that adds the Strict-Transport-Security header to all responses.
 *
 * @type {import('@sveltejs/kit').Handle}
 */
const handleHSTS = async ({ event, resolve }) => {
	event.setHeaders({
		'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
	});
	return resolve(event);
};

export const handle = sequence(handleHSTS);
