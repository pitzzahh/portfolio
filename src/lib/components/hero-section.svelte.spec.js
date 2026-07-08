/**
 * Minimal mock shape used in tests.
 * Only the methods we use are declared so svelte-check can validate usages
 * without importing vitest generic types.
 * @typedef {{ mockClear?: () => void; mockReset?: () => void; mock?: unknown[] }} VitestMockLike
 */

import { page } from 'vitest/browser';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Hero from './hero-section.svelte';

vi.mock('$lib/hooks/controller.svelte', () => {
	const scrollToMock = vi.fn();
	Object.defineProperty(globalThis, '__scrollToMock', {
		value: scrollToMock,
		writable: true,
		configurable: true
	});
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
	/** @type {VitestMockLike | undefined} */
	let scrollToMock;

	beforeEach(() => {
		/** @type {{ __scrollToMock?: VitestMockLike }} */
		const g = /** @type {{ __scrollToMock?: VitestMockLike }} */ (globalThis);
		scrollToMock = g.__scrollToMock;
		if (scrollToMock?.mockClear) scrollToMock.mockClear();
	});

	it('renders personal info and contact link', async () => {
		render(Hero);

		await expect.element(page.getByRole('heading', { level: 1 })).toHaveTextContent('Test Name');
		await expect.element(page.getByText('Tester — Testland')).toBeInTheDocument();
		await expect.element(page.getByText('This is a test bio.')).toBeInTheDocument();
		await expect.element(page.getByRole('link', { name: 'Contact me' })).toBeInTheDocument();
	});

	it('calls scrollTo with expected args when contact link is clicked', async () => {
		render(Hero);

		const contact = page.getByRole('link', { name: 'Contact me' });
		await contact.click();

		expect(scrollToMock).toHaveBeenCalledWith('#contact', { offset: -40, duration: 1.6 });
	});
});
