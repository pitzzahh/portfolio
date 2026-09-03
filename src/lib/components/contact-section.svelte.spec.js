import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ContactSection from './contact-section.svelte';

describe('ContactSection.svelte', () => {
	it('renders heading, CTA text and contact links', async () => {
		/**
		 * Give the imported `page` a local typed alias. Use `any` so svelte-check
		 * won't report mismatches when the runtime page type differs from the
		 * imported/declared type.
		 * @type {any}
		 */
		const p = /** @type {any} */ (page);

		render(ContactSection);

		// Heading
		await expect.element(p.getByRole('heading', { level: 2 })).toHaveTextContent('Get in touch');

		// CTA paragraph
		await expect
			.element(
				p.getByText(
					"Have a project in mind or just want to say hi? I'm always open to a conversation."
				)
			)
			.toBeInTheDocument();

		// Email CTA button uses a mailto: link
		await expect
			.element(p.getByRole('link', { name: /hello@peterjohnarao.com/ }))
			.toHaveAttribute('href', 'mailto:hello@peterjohnarao.com');

		// Serif text links open in a new tab
		await expect.element(p.getByText('GitHub')).toBeInTheDocument();
		await expect.element(p.getByText('GitRoll')).toBeInTheDocument();
		await expect.element(p.getByText('dev.to')).toBeInTheDocument();
		await expect
			.element(p.getByRole('link', { name: /GitHub/ }))
			.toHaveAttribute('target', '_blank');
		await expect
			.element(p.getByRole('link', { name: /GitRoll/ }))
			.toHaveAttribute('target', '_blank');
		await expect
			.element(p.getByRole('link', { name: /dev.to/ }))
			.toHaveAttribute('target', '_blank');
	});
});
