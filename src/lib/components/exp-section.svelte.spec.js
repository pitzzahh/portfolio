import { describe, it, expect, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-svelte';

/**
 * Experience model used by the component.
 * @typedef {Object} Experience
 * @property {string} company
 * @property {string} role
 * @property {string} start
 * @property {string} end
 * @property {string} type
 * @property {string} location
 * @property {string} url
 * @property {string[]} skills
 */

/*
 * Mock the data module BEFORE importing the Svelte component so the component
 * picks up deterministic test data at import-time.
 *
 * Inlined the mock data into the factory to avoid top-level variables that
 * cause issues when `vi.mock` is hoisted.
 */
vi.mock('$lib/data.js', () => {
	return {
		experiences: [
			{
				company: 'TestCo',
				role: 'Engineer',
				start: '2020-01-01',
				end: '2021-06-01',
				type: 'Full-time',
				location: 'Remote',
				url: 'https://example.com',
				skills: ['JS', 'Svelte']
			}
		]
	};
});

import ExpSection from './exp-section.svelte';

describe('exp-section.svelte', () => {
	it('renders the section header and the provided experience', async () => {
		// Render the component
		render(ExpSection);

		// Section title (h2)
		await expect.element(page.getByRole('heading', { level: 2 })).toHaveTextContent('Experience');

		// The section index shows the number of experiences. Our mock has 1.
		await expect.element(page.getByText(/\(1\)/)).toBeInTheDocument();

		// Role text should be rendered
		await expect.element(page.getByText('Engineer')).toBeInTheDocument();

		// Company name (the component links to the company when url is present)
		await expect.element(page.getByText('TestCo')).toBeInTheDocument();

		// Skills are rendered as a comma-separated list when present
		await expect.element(page.getByText('JS, Svelte')).toBeInTheDocument();
	});
});
