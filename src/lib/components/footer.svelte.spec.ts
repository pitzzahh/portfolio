import { page } from 'vitest/browser';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Footer from './footer.svelte';

// Mock the data and lenis modules before importing the component
// Use hoist-safe factories: create mocks inside the factory so vi.mock can be hoisted safely.
vi.mock('$lib/data.js', () => {
	return {
		personalInfo: {
			name: 'Test User',
			email: 'mailto:test@example.com'
		}
	};
});

vi.mock('$lib/lenis.svelte.js', () => {
	const scrollToMock = vi.fn();
	// expose the mock for test assertions
	(globalThis as unknown as { __scrollToMock?: ReturnType<typeof vi.fn> }).__scrollToMock =
		scrollToMock;
	return {
		scrollTo: scrollToMock
	};
});

describe('Footer.svelte', () => {
	beforeEach(() => {
		// retrieve the mock exposed by the vi.mock factory
		const scrollToMock = (globalThis as unknown as { __scrollToMock?: ReturnType<typeof vi.fn> })
			.__scrollToMock;
		if (scrollToMock && scrollToMock.mockReset) scrollToMock.mockReset();
	});

	it('renders monogram and copyright with name and current year', async () => {
		render(Footer);

		// Monogram should be present
		await expect.element(page.getByText('P.J.A.')).toBeInTheDocument();

		// Copyright text contains the mocked name and current year
		const year = new Date().getFullYear();
		await expect.element(page.getByText(new RegExp(`Test User.*${year}`))).toBeInTheDocument();
	});

	it('calls scrollTo with #top when "Back to top" is clicked', async () => {
		render(Footer);

		// Click the back-to-top link
		await page.getByRole('link', { name: 'Back to top' }).click();

		// Ensure the mocked scrollTo was called correctly
		const scrollToMock = (globalThis as unknown as { __scrollToMock?: ReturnType<typeof vi.fn> })
			.__scrollToMock;
		expect(scrollToMock).toHaveBeenCalledTimes(1);
		expect(scrollToMock).toHaveBeenCalledWith('#top', { duration: 1.6 });
	});
});
