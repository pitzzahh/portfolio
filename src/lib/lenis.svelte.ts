import type Lenis from 'lenis';
import { onDestroy, onMount } from 'svelte';

let lenisInstance: Lenis | null = null;
let isInitialized = false;

export function getLenis(): Lenis | null {
	return lenisInstance;
}

export function useLenis(options?: { lerp?: number }) {
	let mounted = true;
	let cleanup: (() => void) | undefined;

	onMount(() => {
		if (isInitialized) return;
		isInitialized = true;

		import('lenis').then(({ default: LenisClass }) => {
			if (!mounted) {
				isInitialized = false;
				return;
			}

			const lenis = new LenisClass({
				lerp: options?.lerp ?? 0.08,
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

			cleanup = () => {
				cancelAnimationFrame(rafId);
				lenis.destroy();
				lenisInstance = null;
				isInitialized = false;
			};
		});
	});

	onDestroy(() => {
		mounted = false;
		cleanup?.();
	});
}

export function scrollTo(
	target: string | number | HTMLElement,
	options?: Parameters<Lenis['scrollTo']>[1]
) {
	lenisInstance?.scrollTo(target, options);
}
