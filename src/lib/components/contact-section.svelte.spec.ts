import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ContactSection from './contact-section.svelte';

describe('ContactSection.svelte', () => {
	it('renders heading, CTA text and contact links', async () => {
		// Render the component (uses real `$lib/data` values for hrefs)
		render(ContactSection);

		// Heading
		await expect.element(page.getByRole('heading', { level: 2 })).toHaveTextContent('Contact');

		// CTA paragraph (full text from the component)
		await expect
			.element(
				page.getByText(
					"Have a project in mind or just want to say hi? I'm always open to a conversation."
				)
			)
			.toBeInTheDocument();

		// Static link labels present
		await expect.element(page.getByText('Email')).toBeInTheDocument();
		await expect.element(page.getByText('GitHub')).toBeInTheDocument();
		await expect.element(page.getByText('GitRoll')).toBeInTheDocument();

		// Ensure the contact links open in a new tab (component sets target="_blank")
		await expect
			.element(page.getByRole('link', { name: /Email/i }))
			.toHaveAttribute('target', '_blank');
		await expect
			.element(page.getByRole('link', { name: /GitHub/i }))
			.toHaveAttribute('target', '_blank');
		await expect
			.element(page.getByRole('link', { name: /GitRoll/i }))
			.toHaveAttribute('target', '_blank');
	});
});
