import { sc } from './controller.svelte';
import type { ProgressConfig, ParallaxConfig, StaggerConfig } from './types';

export function scrollProgress(node: HTMLElement, config?: Partial<ProgressConfig>) {
	const id = sc.bind(node, 'progress', config ?? {});
	return { destroy: () => sc.unbind(id) };
}

export function parallax(node: HTMLElement, config?: Partial<ParallaxConfig>) {
	const id = sc.bind(node, 'parallax', config ?? {});

	// Initialize transform synchronously to prevent layout shift.
	// Without this, the first RAF tick applies the parallax offset
	// *after* paint, causing a visible jump (CLS).
	const { speed = 0.3 } = config ?? {};
	const origin = node.getBoundingClientRect().top + window.scrollY;
	node.dataset.po = String(origin);
	node.style.transform = `translate3d(0, ${((window.scrollY - origin) * speed).toFixed(1)}px, 0)`;

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
