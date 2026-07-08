import { page } from 'vitest/browser';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Nav from './nav.svelte';

/**
 * Minimal mock shape for typing in these specs.
 * @typedef {{ mockClear?: () => void; mockReset?: () => void; mock?: unknown[] }} VitestMockLike
 */

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

describe('Nav.svelte', () => {
	/** @type {any} scrollToMock */
	let scrollToMock;

	beforeEach(() => {
		// @ts-expect-error - globalThis.__scrollToMock is intentionally set by the mock factory
		scrollToMock = globalThis.__scrollToMock;

		if (scrollToMock && typeof scrollToMock.mockClear === 'function') {
			scrollToMock.mockClear();
		}
	});

	it('renders monogram and desktop links', async () => {
		render(Nav, { scrollY: 0 });

		await expect.element(page.getByLabelText('Back to top')).toBeInTheDocument();
		await expect.element(page.getByRole('link', { name: 'Exp' })).toBeInTheDocument();
		await expect.element(page.getByRole('link', { name: 'Projects' })).toBeInTheDocument();
		await expect.element(page.getByRole('link', { name: 'About' })).toBeInTheDocument();
		await expect.element(page.getByRole('link', { name: 'Contact' })).toBeInTheDocument();
	});

	it('toggles mobile menu when hamburger is clicked', async () => {
		render(Nav, { scrollY: 0 });

		const hamburger = page.getByLabelText('Open menu');
		await expect.element(hamburger).toBeInTheDocument();
		await expect.element(hamburger).toHaveAttribute('aria-expanded', 'false');

		await hamburger.click();

		await expect.element(page.getByLabelText('Close menu')).toBeInTheDocument();
		await expect
			.element(page.getByLabelText('Close menu'))
			.toHaveAttribute('aria-expanded', 'true');

		await page.getByLabelText('Close menu').click();
		await expect
			.element(page.getByLabelText('Open menu'))
			.toHaveAttribute('aria-expanded', 'false');
	});

	it('calls scrollTo with correct href when nav links are clicked (mobile link)', async () => {
		render(Nav, { scrollY: 0 });

		await page.getByLabelText('Open menu').click();
		await page.getByRole('link', { name: 'About' }).click();

		expect(scrollToMock).toHaveBeenCalled();

		const lastCall = scrollToMock.mock.calls.slice(-1)[0];
		expect(lastCall[0]).toBe('#about');
		expect(typeof lastCall[1]).toBe('object');
		expect(lastCall[1]).toHaveProperty('duration');
		expect(lastCall[1]).toHaveProperty('offset');
	});

	it('mobile sheet contains navigation items when opened', async () => {
		render(Nav, { scrollY: 0 });

		await page.getByLabelText('Open menu').click();

		await expect.element(page.getByRole('dialog', { name: 'Navigation' })).toBeInTheDocument();
		await expect.element(page.getByRole('link', { name: 'Exp' })).toBeInTheDocument();
		await expect.element(page.getByRole('link', { name: 'Projects' })).toBeInTheDocument();
		await expect.element(page.getByRole('link', { name: 'About' })).toBeInTheDocument();
		await expect.element(page.getByRole('link', { name: 'Contact' })).toBeInTheDocument();

		await page.getByRole('link', { name: 'About' }).click();
		expect(scrollToMock).toHaveBeenCalled();

		const lastCall = scrollToMock.mock.calls.slice(-1)[0];
		expect(lastCall[0]).toBe('#about');
	});
});
