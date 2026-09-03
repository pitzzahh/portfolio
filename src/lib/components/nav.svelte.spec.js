import { page } from 'vitest/browser';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Nav from './nav.svelte';

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

	it('renders wordmark and DS section links', async () => {
		render(Nav);

		await expect.element(page.getByLabelText('Back to top')).toBeInTheDocument();
		await expect.element(page.getByText('Work', { exact: true })).toBeInTheDocument();
		await expect.element(page.getByText('Stack', { exact: true })).toBeInTheDocument();
		await expect.element(page.getByText('Exp', { exact: true })).toBeInTheDocument();
		await expect.element(page.getByText('About', { exact: true })).toBeInTheDocument();
	});

	it('renders a theme toggle', async () => {
		render(Nav);

		const toggle = page.getByRole('button', { name: /Switch to (light|dark) theme/ });
		await expect.element(toggle).toBeInTheDocument();
	});

	it('calls scrollTo with DS offset when the wordmark is clicked', async () => {
		render(Nav);

		await page.getByLabelText('Back to top').click();

		expect(scrollToMock).toHaveBeenCalledWith('#top', { offset: -70, duration: 1.6 });
	});
});
