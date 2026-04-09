/**
 * SvelteKit handle hook that adds the Strict-Transport-Security header to all responses.
 *
 * @type {import('@sveltejs/kit').Handle}
 */
export const handle = async ({ event, resolve }) => {
	if (event.platform?.env?.RATE_LIMITER) {
		const { success } = await event.platform.env.RATE_LIMITER.limit({ key: event.url.pathname });
		if (!success) {
			return new Response('429 Rate limit exceeded for ' + event.url.pathname, { status: 429 });
		}
	}

	event.setHeaders({
		'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload'
	});
	return resolve(event);
};
