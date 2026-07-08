import { sc } from './controller.svelte';
import type { ProgressConfig, ParallaxConfig, StaggerConfig } from './types';

export function scrollProgress(node: HTMLElement, config?: Partial<ProgressConfig>) {
	const id = sc.bind(node, 'progress', config ?? {});
	return { destroy: () => sc.unbind(id) };
}

export function parallax(node: HTMLElement, config?: Partial<ParallaxConfig>) {
	const { speed = 0.3 } = config ?? {};

	// Store the scrollY at mount so the controller can compute
	// offsets relative to this starting position. This guarantees
	// the initial transform is 0 — no layout shift on mount.
	node.dataset.ps = String(window.scrollY);
	node.style.willChange = 'transform';

	const id = sc.bind(node, 'parallax', { speed });
	return { destroy: () => sc.unbind(id) };
}

export function stagger(node: HTMLElement, config?: Partial<StaggerConfig>) {
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
