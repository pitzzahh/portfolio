import { page } from 'vitest/browser';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render } from 'vitest-browser-svelte';
import About from './about-section.svelte';

// Mock the data and actions modules the component imports so the tests are deterministic
vi.mock('$lib/data.js', () => {
	return {
		personalInfo: {
			name: 'Peter John Arao',
			location: 'Testland',
			handle: 'testhandle',
			currentProject: 'TestProject',
			email: 'mailto:test@example.com'
		},
		skills: [
			{ name: 'TypeScript', category: 'language' },
			{ name: 'JavaScript', category: 'language' },
			{ name: 'Svelte', category: 'framework' },
			{ name: 'Vite', category: 'tool' },
			{ name: 'Postgres', category: 'database' }
		]
	};
});

describe('AboutSection component', () => {
	beforeEach(() => {
		// Ensure a fresh render for each test
		render(About);
	});

	it('renders the section title and intro text with the personal name and current project', async () => {
		// Section title is an <h2> with text "About"
		await expect.element(page.getByRole('heading', { level: 2 })).toHaveTextContent('About');

		// Intro paragraph should contain the mocked personal name
		await expect.element(page.getByText(/Peter John Arao/)).toBeInTheDocument();

		// The current project link text should be present
		await expect.element(page.getByText('TestProject')).toBeInTheDocument();
	});

	it('renders skill groups and skill items', async () => {
		// Check that the skill group labels are present
		await expect.element(page.getByText('Languages')).toBeInTheDocument();
		await expect.element(page.getByText('Frameworks')).toBeInTheDocument();
		await expect.element(page.getByText('Tools')).toBeInTheDocument();
		await expect.element(page.getByText('Data')).toBeInTheDocument();

		// Check that individual skills from mock data are rendered (use exact matching to avoid ambiguous matches)
		await expect.element(page.getByText('TypeScript', { exact: true })).toBeInTheDocument();
		await expect.element(page.getByText('Svelte', { exact: true })).toBeInTheDocument();
		await expect.element(page.getByText('Vite', { exact: true })).toBeInTheDocument();
		await expect.element(page.getByText('Postgres', { exact: true })).toBeInTheDocument();
	});
});
