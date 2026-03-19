import { page } from 'vitest/browser';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Hero from './hero-section.svelte';

// Mocks must be set up before importing the component so the module imports are intercepted.
// Create the mock inside the factory (hoist-safe) and expose it via globalThis so tests can access it.
vi.mock('$lib/lenis.svelte.js', () => {
	const scrollToMock = vi.fn();
	// expose the mock for test assertions
	(globalThis as unknown as { __scrollToMock?: ReturnType<typeof vi.fn> }).__scrollToMock =
		scrollToMock;
	return { scrollTo: scrollToMock };
});

vi.mock('$lib/data.js', () => ({
	personalInfo: {
		name: 'Test Name',
		role: 'Tester',
		location: 'Testland',
		bio: 'This is a test bio.'
	}
}));

describe('Hero section', () => {
	let scrollToMock: ReturnType<typeof vi.fn> | undefined;
	beforeEach(() => {
		// Grab the mock exposed by the vi.mock factory above
		scrollToMock = (globalThis as unknown as { __scrollToMock?: ReturnType<typeof vi.fn> })
			.__scrollToMock;
		if (scrollToMock?.mockClear) scrollToMock.mockClear();
	});

	it('renders personal info and contact link', async () => {
		render(Hero);

		// Heading with name
		await expect.element(page.getByRole('heading', { level: 1 })).toHaveTextContent('Test Name');

		// Role and location combined in a paragraph
		await expect.element(page.getByText('Tester — Testland')).toBeInTheDocument();

		// Bio text
		await expect.element(page.getByText('This is a test bio.')).toBeInTheDocument();

		// Contact link exists with correct accessible name
		await expect.element(page.getByRole('link', { name: 'Contact me' })).toBeInTheDocument();
	});

	it('calls scrollTo with expected args when contact link is clicked', async () => {
		render(Hero);

		const contact = page.getByRole('link', { name: 'Contact me' });
		// Simulate click
		await contact.click();

		// Ensure the mocked scrollTo was called with the expected target and options
		expect(scrollToMock).toHaveBeenCalledWith('#contact', { offset: -40, duration: 1.6 });
	});
});
