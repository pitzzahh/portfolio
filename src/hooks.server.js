/**
 * SvelteKit handle hook that adds the Strict-Transport-Security header to all responses.
 *
 * @type {import('@sveltejs/kit').Handle}
 */
export const handle = async ({ event, resolve }) => {
	try {
		if (event.platform?.env?.RATE_LIMITER) {
			const { success } = await event.platform.env.RATE_LIMITER.limit({
				key: event.getClientAddress()
			});
			if (!success) {
				return new Response('429 Rate limit exceeded', { status: 429 });
			}
		}
	} catch (e) {
		// Skip rate limiting during prerendering or if bindings are unavailable
		console.warn(e);
	}

	event.setHeaders({
		'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload'
	});
	return resolve(event);
};
