import { page } from 'vitest/browser';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Stack from './stack-section.svelte';

vi.mock('$lib/data.js', () => {
	return {
		skills: [
			{ name: 'TypeScript', category: 'language' },
			{ name: 'SvelteKit', category: 'framework' },
			{ name: 'Postgres', category: 'database' },
			{ name: 'Docker', category: 'tool' }
		]
	};
});

describe('StackSection component', () => {
	it('renders the Stack heading and feature groups with tags', async () => {
		render(Stack);

		await expect.element(page.getByRole('heading', { level: 2 })).toHaveTextContent('Stack');

		await expect.element(page.getByText('Languages')).toBeInTheDocument();
		await expect.element(page.getByText('Frameworks')).toBeInTheDocument();
		await expect.element(page.getByText('Data & infra')).toBeInTheDocument();

		await expect.element(page.getByText('TypeScript', { exact: true })).toBeInTheDocument();
		await expect.element(page.getByText('SvelteKit', { exact: true })).toBeInTheDocument();
		await expect.element(page.getByText('Postgres', { exact: true })).toBeInTheDocument();
	});
});
