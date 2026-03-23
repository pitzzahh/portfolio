import { page } from 'vitest/browser';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Footer from './footer.svelte';

/**
 * Minimal mock shape used in tests.
 * Only the methods we use in these specs are declared so svelte-check
 * can validate usages without importing generic vitest types.
 * @typedef {{ mockClear?: () => void; mockReset?: () => void; mock?: unknown[] }} VitestMockLike
 */

/*
 * Mock the data module so tests are deterministic.
 * Keep the factory hoist-safe by creating values inside the factory.
 */
vi.mock('$lib/data.js', () => {
	return {
		personalInfo: {
			name: 'Test User',
			email: 'mailto:test@example.com'
		}
	};
});

/*
 * Mock the lenis module. Expose the mock on globalThis safely so tests can access it
 * at runtime without relying on module-initialization order.
 */
/** @returns {{ scrollTo: VitestMock }} */
vi.mock('$lib/lenis.svelte.js', () => {
	const scrollToMock = vi.fn();
	// Expose the mock for assertions in tests without relying on TypeScript-style casts.
	// Use Object.defineProperty to set a predictable, writable property on globalThis.
	Object.defineProperty(globalThis, '__scrollToMock', {
		value: scrollToMock,
		writable: true,
		configurable: true
	});
	return {
		scrollTo: scrollToMock
	};
});

describe('Footer.svelte', () => {
	beforeEach(() => {
		// Retrieve the exposed mock and reset it between tests.
		/** @type {{ __scrollToMock?: VitestMockLike }} */
		const g = /** @type {{ __scrollToMock?: VitestMockLike }} */ (globalThis);
		const scrollToMock = g.__scrollToMock;
		if (scrollToMock && typeof scrollToMock.mockReset === 'function') scrollToMock.mockReset();
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
		/** @type {{ __scrollToMock?: VitestMockLike }} */
		const g2 = /** @type {{ __scrollToMock?: VitestMockLike }} */ (globalThis);
		const scrollToMock = g2.__scrollToMock;
		expect(scrollToMock).toHaveBeenCalledTimes(1);
		expect(scrollToMock).toHaveBeenCalledWith('#top', { duration: 1.6 });
	});
});
