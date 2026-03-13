import { page } from 'vitest/browser';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Nav from './nav.svelte';

// Create a mock before importing the component so the component uses the mocked implementation
vi.mock('$lib/lenis.svelte.js', () => {
	const scrollToMock = vi.fn();
	// expose the mock to tests via globalThis so tests can assert calls
	// @ts-ignore
	globalThis.__scrollToMock = scrollToMock;
	return {
		scrollTo: scrollToMock
	};
});

describe('Nav.svelte', () => {
	let scrollToMock: any;

	beforeEach(() => {
		// retrieve the mock at runtime to avoid reading globals during module initialization
		scrollToMock = (globalThis as any).__scrollToMock;
		if (scrollToMock && scrollToMock.mockClear) scrollToMock.mockClear();
	});

	it('renders monogram and desktop links', async () => {
		render(Nav, { scrollY: 0 });

		// Monogram link (use label to avoid ambiguity with footer text)
		await expect.element(page.getByLabelText('Back to top')).toBeInTheDocument();

		// Desktop navigation links (select by role to avoid duplicate text nodes)
		await expect.element(page.getByRole('link', { name: 'Exp' })).toBeInTheDocument();
		await expect.element(page.getByRole('link', { name: 'Projects' })).toBeInTheDocument();
		await expect.element(page.getByRole('link', { name: 'About' })).toBeInTheDocument();
		await expect.element(page.getByRole('link', { name: 'Contact' })).toBeInTheDocument();
	});

	it('toggles mobile menu when hamburger is clicked', async () => {
		render(Nav, { scrollY: 0 });

		// Initially the hamburger should indicate "Open menu"
		const hamburger = page.getByLabelText('Open menu');
		await expect.element(hamburger).toBeInTheDocument();
		await expect.element(hamburger).toHaveAttribute('aria-expanded', 'false');

		// Click to open
		await hamburger.click();

		// After clicking, aria-label should change to "Close menu" and expanded become true
		await expect.element(page.getByLabelText('Close menu')).toBeInTheDocument();
		await expect
			.element(page.getByLabelText('Close menu'))
			.toHaveAttribute('aria-expanded', 'true');

		// Click again to close
		await page.getByLabelText('Close menu').click();
		await expect
			.element(page.getByLabelText('Open menu'))
			.toHaveAttribute('aria-expanded', 'false');
	});

	it('calls scrollTo with correct href when nav links are clicked (mobile link)', async () => {
		render(Nav, { scrollY: 0 });

		// Open the mobile menu and click a mobile nav item to trigger the sheet path (more reliable)
		await page.getByLabelText('Open menu').click();

		// Click the About mobile link (sheet link) which should call the same go() -> scrollTo
		await page.getByRole('link', { name: 'About' }).click();

		// Component's go() should call scrollTo with the href and expected options
		expect(scrollToMock).toHaveBeenCalled();
		// Check the last call's first argument is the about anchor
		expect(scrollToMock.mock.calls.slice(-1)[0][0]).toBe('#about');
		// Check an options object (with offset and duration) was passed as second argument
		expect(typeof scrollToMock.mock.calls.slice(-1)[0][1]).toBe('object');
		expect(scrollToMock.mock.calls.slice(-1)[0][1]).toHaveProperty('duration');
		expect(scrollToMock.mock.calls.slice(-1)[0][1]).toHaveProperty('offset');
	});

	it('mobile sheet contains navigation items when opened', async () => {
		render(Nav, { scrollY: 0 });

		// Open mobile menu
		await page.getByLabelText('Open menu').click();

		// The dialog (sheet) should contain the mobile links with their labels
		await expect.element(page.getByRole('dialog', { name: 'Navigation' })).toBeInTheDocument();
		await expect.element(page.getByRole('link', { name: 'Exp' })).toBeInTheDocument();
		await expect.element(page.getByRole('link', { name: 'Projects' })).toBeInTheDocument();
		await expect.element(page.getByRole('link', { name: 'About' })).toBeInTheDocument();
		await expect.element(page.getByRole('link', { name: 'Contact' })).toBeInTheDocument();

		// Clicking a mobile link should also call scrollTo
		await page.getByRole('link', { name: 'About' }).click();
		expect(scrollToMock).toHaveBeenCalled();
		expect(scrollToMock.mock.calls.slice(-1)[0][0]).toBe('#about');
	});
});
