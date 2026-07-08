import { sc } from './controller.svelte';
import type { ProgressConfig, ParallaxConfig, StaggerConfig } from './types';

export function scrollProgress(node: HTMLElement, config?: Partial<ProgressConfig>) {
	// Compute initial --sp based on current viewport position.
	// Prevents visible-to-invisible flash while waiting for the
	// controller's RAF loop to start (especially on mobile).
	const rect = node.getBoundingClientRect();
	const vh = window.innerHeight;
	const initiallyVisible = rect.top < vh && rect.bottom > 0;
	node.style.setProperty('--sp', initiallyVisible ? '1' : '0');

	const id = sc.bind(node, 'progress', config ?? {});
	return { destroy: () => sc.unbind(id) };
}

export function parallax(node: HTMLElement, config?: Partial<ParallaxConfig>) {
	const { speed = 0.3 } = config ?? {};

	// Store the scrollY at mount so the controller can compute
	// offsets relative to this starting position.
	// Initial transform is 0 — no layout shift on mount.
	node.dataset.ps = String(window.scrollY);
	node.style.willChange = 'transform';

	const id = sc.bind(node, 'parallax', { speed });
	return { destroy: () => sc.unbind(id) };
}

export function stagger(node: HTMLElement, config?: Partial<StaggerConfig>) {
	// Set initial --sp to 0 on all children to prevent visible-to-invisible
	// flash before the controller's RAF loop starts.
	for (const child of Array.from(node.children)) {
		(child as HTMLElement).style.setProperty('--sp', '0');
	}

	const id = sc.bind(node, 'stagger', config ?? {});
	return { destroy: () => sc.unbind(id) };
}

export function reveal(node: HTMLElement, delay?: number) {
	node.dataset.reveal = '';
	const id = sc.bind(node, 'reveal', { delay });
	return {
		destroy() {
			delete node.dataset.reveal;
			sc.unbind(id);
		}
	};
}
