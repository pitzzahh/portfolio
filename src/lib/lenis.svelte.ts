import Lenis from 'lenis';
import { onMount } from 'svelte';

let lenisInstance: Lenis | null = null;

export function getLenis(): Lenis | null {
	return lenisInstance;
}

export function useLenis() {
	onMount(() => {
		const lenis = new Lenis({
			lerp: 0.08,
			smoothWheel: true,
			syncTouch: false
		});

		lenisInstance = lenis;

		let rafId: number;

		function raf(time: number) {
			lenis.raf(time);
			rafId = requestAnimationFrame(raf);
		}

		rafId = requestAnimationFrame(raf);

		return () => {
			cancelAnimationFrame(rafId);
			lenis.destroy();
			lenisInstance = null;
		};
	});
}

export function scrollTo(
	target: string | number | HTMLElement,
	options?: Parameters<Lenis['scrollTo']>[1]
) {
	lenisInstance?.scrollTo(target, options);
}
