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

vi.mock('$lib/data.js', () => {
	return {
		personalInfo: {
			name: 'Test User',
			email: 'mailto:test@example.com'
		}
	};
});

/** @returns {{ scrollTo: VitestMock }} */
vi.mock('$lib/hooks/controller.svelte', () => {
	const scrollToMock = vi.fn();
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
		/** @type {{ __scrollToMock?: VitestMockLike }} */
		const g = /** @type {{ __scrollToMock?: VitestMockLike }} */ (globalThis);
		const scrollToMock = g.__scrollToMock;
		if (scrollToMock && typeof scrollToMock.mockReset === 'function') scrollToMock.mockReset();
	});

	it('renders copyright with name and current year', async () => {
		render(Footer);

		const year = new Date().getFullYear();
		await expect.element(page.getByText(new RegExp(`${year}.*Test User`))).toBeInTheDocument();
	});

	it('calls scrollTo with #top when "Back to top" is clicked', async () => {
		render(Footer);

		await page.getByRole('link', { name: 'Back to top' }).click();

		/** @type {{ __scrollToMock?: VitestMockLike }} */
		const g2 = /** @type {{ __scrollToMock?: VitestMockLike }} */ (globalThis);
		const scrollToMock = g2.__scrollToMock;
		expect(scrollToMock).toHaveBeenCalledTimes(1);
		expect(scrollToMock).toHaveBeenCalledWith('#top', { duration: 1.6 });
	});
});
