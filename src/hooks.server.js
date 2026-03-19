/**
 * SvelteKit handle hook that adds the Strict-Transport-Security header to all responses.
 *
 * @type {import('@sveltejs/kit').Handle}
 */
export const handle = ({ event, resolve }) => {
	event.setHeaders({
		'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload'
	});
	return resolve(event);
};
