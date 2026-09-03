import { page } from 'vitest/browser';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render } from 'vitest-browser-svelte';
import About from './about-section.svelte';

vi.mock('$lib/data.js', () => {
	return {
		personalInfo: {
			name: 'Peter John Arao',
			location: 'Testland',
			handle: 'testhandle',
			currentProject: 'TestProject',
			email: 'mailto:test@example.com'
		},
		projects: [{ title: 'a' }],
		experiences: [{ company: 'A' }, { company: 'B' }, { company: 'C' }, { company: 'D' }]
	};
});

describe('AboutSection component', () => {
	beforeEach(() => {
		render(About);
	});

	it('renders the section title and intro text with the personal name and current project', async () => {
		await expect.element(page.getByRole('heading', { level: 2 })).toHaveTextContent('About');

		await expect.element(page.getByText(/Peter John Arao/)).toBeInTheDocument();

		await expect.element(page.getByText('TestProject')).toBeInTheDocument();
	});

	it('renders stat rows derived from data', async () => {
		// Stat numerals sit behind the one-shot reveal (opacity 0 until scrolled into
		// view), so read them straight from the DOM instead of the visibility
		//-gated browser locators.
		const numerals = [...document.querySelectorAll('.stat b')].map((el) => el.textContent);
		expect(numerals).toContain('98+');
		expect(numerals).toContain('04');

		await expect.element(page.getByText('public repos on GitHub')).toBeInTheDocument();
		await expect.element(page.getByText('roles across product & internships')).toBeInTheDocument();
	});
});
