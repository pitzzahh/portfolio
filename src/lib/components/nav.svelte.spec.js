import { page } from 'vitest/browser';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Nav from './nav.svelte';

/**
 * Minimal mock shape for typing in these specs.
 * We only declare the methods used by the tests so the JSDoc types are precise.
 * @typedef {{ mockClear?: () => void; mockReset?: () => void; mock?: unknown[] }} VitestMockLike
 */

/**
 * Create a mock before importing or rendering the component so the component uses the mocked implementation.
 * The mock factory exposes the mock function via `globalThis.__scrollToMock` for assertions in tests.
 */
vi.mock('$lib/lenis.svelte.js', () => {
	// Create the mock function using vitest's vi.fn()
	const scrollToMock = vi.fn();

	// Expose the mock to tests via globalThis in a hoist-safe manner.
	// Define the property explicitly so svelte-check can reason about typed access.
	Object.defineProperty(globalThis, '__scrollToMock', {
		value: scrollToMock,
		writable: true,
		configurable: true
	});

	// Return the mocked module shape the component expects.
	return {
		scrollTo: scrollToMock
	};
});

describe('Nav.svelte', () => {
	/**
	 * @type {any} scrollToMock - the mock function exposed by the vi.mock factory above.
	 * We use `any` here because JSDoc's finer-grained types for vitest mocks are not required.
	 */
	let scrollToMock;

	beforeEach(() => {
		// retrieve the mock at runtime to avoid reading globals during module initialization
		// (this prevents reading a possibly undefined value during module load)
		// Use a small wrapper so linters don't complain about unknown global properties.
		// @ts-expect-error - globalThis.__scrollToMock is intentionally set by the mock factory
		scrollToMock = globalThis.__scrollToMock;

		// Reset/clear the mock between tests if the mock supports it
		if (scrollToMock && typeof scrollToMock.mockClear === 'function') {
			scrollToMock.mockClear();
		}
	});

	it('renders monogram and desktop links', async () => {
		// Render the component with props; Nav expects a `scrollY` prop in the original tests
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
		// We assert that the mock was called and inspect the last call arguments.
		expect(scrollToMock).toHaveBeenCalled();

		// Check the last call's first argument is the about anchor
		const lastCall = scrollToMock.mock.calls.slice(-1)[0];
		expect(lastCall[0]).toBe('#about');

		// Check an options object (with offset and duration) was passed as second argument
		expect(typeof lastCall[1]).toBe('object');
		expect(lastCall[1]).toHaveProperty('duration');
		expect(lastCall[1]).toHaveProperty('offset');
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

		// Verify the call target anchor
		const lastCall = scrollToMock.mock.calls.slice(-1)[0];
		expect(lastCall[0]).toBe('#about');
	});
});
