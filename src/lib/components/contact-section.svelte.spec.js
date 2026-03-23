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

		// Render the component (uses real `$lib/data` values for hrefs)
		render(ContactSection);

		// Heading
		await expect.element(p.getByRole('heading', { level: 2 })).toHaveTextContent('Contact');

		// CTA paragraph (full text from the component)
		await expect
			.element(
				p.getByText(
					"Have a project in mind or just want to say hi? I'm always open to a conversation."
				)
			)
			.toBeInTheDocument();

		// Static link labels present
		await expect.element(p.getByText('Email')).toBeInTheDocument();
		await expect.element(p.getByText('GitHub')).toBeInTheDocument();
		await expect.element(p.getByText('GitRoll')).toBeInTheDocument();

		// Ensure the contact links open in a new tab (component sets target="_blank")
		await expect
			.element(p.getByRole('link', { name: /Email/i }))
			.toHaveAttribute('target', '_blank');
		await expect
			.element(p.getByRole('link', { name: /GitHub/i }))
			.toHaveAttribute('target', '_blank');
		await expect
			.element(p.getByRole('link', { name: /GitRoll/i }))
			.toHaveAttribute('target', '_blank');
	});
});
