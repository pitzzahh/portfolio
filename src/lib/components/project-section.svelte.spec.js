import { page } from 'vitest/browser';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ProjectSection from './project-section.svelte';

/**
 * @typedef {Object} Project
 * @property {string} title
 * @property {string} url
 * @property {string[]} tech
 * @property {string} description
 * @property {number} stars
 * @property {string} language
 */

/** @type {Project[]} */
const mockProjects = [
	{
		title: 'Project Alpha',
		url: 'https://example.com/alpha',
		tech: ['Svelte', 'TypeScript', 'Drizzle'],
		description: 'A demo project called Alpha.',
		stars: 3,
		language: 'Svelte'
	},
	{
		title: 'Project Beta',
		url: 'https://example.com/beta',
		tech: ['SvelteKit'],
		description: 'Another sample project called Beta.',
		stars: 0,
		language: 'TypeScript'
	}
];

vi.mock('$lib/data.js', () => ({
	projects: [
		{
			title: 'Project Alpha',
			url: 'https://example.com/alpha',
			tech: ['Svelte', 'TypeScript', 'Drizzle'],
			description: 'A demo project called Alpha.',
			stars: 3,
			language: 'Svelte'
		},
		{
			title: 'Project Beta',
			url: 'https://example.com/beta',
			tech: ['SvelteKit'],
			description: 'Another sample project called Beta.',
			stars: 0,
			language: 'TypeScript'
		}
	]
}));

describe('project-section.svelte', () => {
	it('renders section heading and selected-work count', async () => {
		render(ProjectSection);

		await expect
			.element(page.getByRole('heading', { level: 2 }))
			.toHaveTextContent('Selected work');
		await expect.element(page.getByText('( 02 )')).toBeInTheDocument();
	});

	it('renders each project with title, description, tech and correct link', async () => {
		render(ProjectSection);

		for (const proj of mockProjects) {
			const link = page.getByRole('link', { name: `View ${proj.title}` });
			await expect.element(link).toBeInTheDocument();
			await expect.element(link).toHaveAttribute('href', proj.url);

			await expect.element(page.getByText(proj.title)).toBeInTheDocument();
			await expect.element(page.getByText(proj.description)).toBeInTheDocument();
			await expect.element(page.getByText(proj.tech.join(' · '))).toBeInTheDocument();
		}

		// Star chip for starred projects, language fallback otherwise
		await expect.element(page.getByText('★ 3')).toBeInTheDocument();
		await expect.element(page.getByText('TypeScript', { exact: true })).toBeInTheDocument();
	});
});
