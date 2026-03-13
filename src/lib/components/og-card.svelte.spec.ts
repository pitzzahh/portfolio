import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import OgCard from './og-card.svelte';

describe('OgCard.svelte', () => {
	it('renders title and subtitle and exposes an accessible aria-label on the image container', async () => {
		const props = {
			title: 'My Title',
			subtitle: 'Sub text'
		};

		render(OgCard, props);

		// The root card exposes role="img" with aria-label="{title} — {subtitle}"
		const img = page.getByRole('img', { name: `${props.title} — ${props.subtitle}` });
		await expect.element(img).toBeInTheDocument();

		// Title and subtitle should appear in the rendered output
		await expect.element(page.getByText(props.title)).toBeInTheDocument();
		await expect.element(page.getByText(props.subtitle)).toBeInTheDocument();

		// The branded heading (role=heading level=1) is present and should contain the contact label.
		// Use the accessible name filter to disambiguate from other level-1 headings (the H1 with the title).
		await expect
			.element(page.getByRole('heading', { name: /Contact/, level: 1 }))
			.toHaveTextContent(/Contact/);
	});
});
