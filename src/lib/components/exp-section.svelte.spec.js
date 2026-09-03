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
	it('renders the sticky rail and the provided experience', async () => {
		render(ExpSection);

		// Sticky rail display line
		await expect.element(page.getByText('Four')).toBeInTheDocument();
		await expect.element(page.getByText('roles.')).toBeInTheDocument();

		// Role text should be rendered
		await expect.element(page.getByText('Engineer')).toBeInTheDocument();

		// Company name (the component links to the company when url is present)
		await expect.element(page.getByText('TestCo')).toBeInTheDocument();

		// Skills are rendered as a middle-dot-separated mono line
		await expect.element(page.getByText('JS · Svelte')).toBeInTheDocument();
	});
});
