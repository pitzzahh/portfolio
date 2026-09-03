import { page } from 'vitest/browser';
import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Hero from './hero-section.svelte';

vi.mock('$lib/data.js', () => ({
	personalInfo: {
		name: 'Test Name',
		role: 'Tester',
		location: 'Testland',
		bio: 'This is a test bio.'
	}
}));

describe('Hero section', () => {
	it('renders name, display line, status pill and CTAs', async () => {
		render(Hero);

		await expect.element(page.getByRole('heading', { level: 1 })).toHaveTextContent('Test Name');
		await expect.element(page.getByText('Full-stack developer.')).toBeInTheDocument();
		await expect.element(page.getByText(/Available for work/)).toBeInTheDocument();
		await expect
			.element(page.getByRole('link', { name: 'Start a project' }))
			.toHaveAttribute('href', '#contact');
		await expect
			.element(page.getByRole('link', { name: /GitHub/ }))
			.toHaveAttribute('href', 'https://github.com/pitzzahh');
	});
});
