import { page } from 'vitest/browser';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ProjectSection from './project-section.svelte';

const mockProjects = [
	{
		title: 'Project Alpha',
		url: 'https://example.com/alpha',
		tech: ['Svelte', 'TypeScript'],
		description: 'A demo project called Alpha.'
	},
	{
		title: 'Project Beta',
		url: 'https://example.com/beta',
		tech: ['SvelteKit'],
		description: 'Another sample project called Beta.'
	}
];

// Mock the data module the component imports so tests are deterministic
vi.mock('$lib/data.js', () => {
	return {
		projects: [
			{
				title: 'Project Alpha',
				url: 'https://example.com/alpha',
				tech: ['Svelte', 'TypeScript'],
				description: 'A demo project called Alpha.'
			},
			{
				title: 'Project Beta',
				url: 'https://example.com/beta',
				tech: ['SvelteKit'],
				description: 'Another sample project called Beta.'
			}
		]
	};
});

describe('project-section.svelte', () => {
	it('renders section heading and project count', async () => {
		render(ProjectSection);

		// heading level 2 contains the title
		await expect
			.element(page.getByRole('heading', { level: 2 }))
			.toHaveTextContent('Selected projects');

		// the section-index shows the number of projects: "( 2 )"
		// match the exact formatted text the component produces
		await expect.element(page.getByText('( 2 )')).toBeInTheDocument();
	});

	it('renders each project with title, description, tech and correct link', async () => {
		render(ProjectSection);

		for (const proj of mockProjects) {
			// The accessible link on each project has an aria-label "View {title} on GitHub"
			const link = page.getByRole('link', { name: `View ${proj.title} on GitHub` });
			await expect.element(link).toBeInTheDocument();
			await expect.element(link).toHaveAttribute('href', proj.url);

			// Title text should be present
			await expect.element(page.getByText(proj.title)).toBeInTheDocument();

			// Description should be rendered
			await expect.element(page.getByText(proj.description)).toBeInTheDocument();

			// Tech tags are rendered as comma separated text
			await expect.element(page.getByText(proj.tech.join(', '))).toBeInTheDocument();
		}
	});
});
