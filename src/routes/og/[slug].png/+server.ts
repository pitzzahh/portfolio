import type { EntryGenerator, RequestHandler } from './$types';
import { ImageResponse } from '@ethercorps/sveltekit-og';
import { GoogleFont, resolveFonts } from '@ethercorps/sveltekit-og/fonts';
import OgCard from '$lib/components/og-card.svelte';
import { ogEntries, ogEntriesBySlug } from '$lib/og-entries';

export const prerender = true;

export const entries: EntryGenerator = () =>
	ogEntries.map((entry) => ({
		slug: entry.slug
	}));

export const GET: RequestHandler = async ({ params }) => {
	const entry = ogEntriesBySlug[params.slug];

	if (!entry) {
		return new Response(null, { status: 404 });
	}

	return new ImageResponse(
		OgCard,
		{
			width: 1200,
			height: 630,
			fonts: await resolveFonts([
				new GoogleFont('Inter', {
					weight: 400,
					name: 'Inter'
				})
			]),
			headers: {
				'Cache-Control': 'public, immutable, max-age=31536000'
			}
		},
		{
			title: entry.title,
			subtitle: entry.subtitle
		}
	);
};
