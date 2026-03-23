import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import OgCard from './og-card.svelte';

/**
 * @typedef {Object} OgCardProps
 * @property {string} title
 * @property {string} subtitle
 */

/**
 * Render the OgCard component with typed props (via JSDoc).
 *
 * Using JSDoc typedefs gives us rich editor and tooling hints without using TypeScript.
 */

describe('OgCard.svelte', () => {
	it('renders title and subtitle and exposes an accessible aria-label on the image container', async () => {
		/** @type {OgCardProps} */
		const props = {
			title: 'My Title',
			subtitle: 'Sub text'
		};

		// Render the component with props
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
