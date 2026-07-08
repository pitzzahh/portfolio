import type Lenis from 'lenis';

/**
 * Manages a single Lenis instance and its RAF loop.
 * Internal class — not exposed directly. Use the exported functions instead.
 */
class LenisDriver {
	#instance: Lenis | null = null;
	#rafId = 0;

	/**
	 * Start Lenis smooth scrolling.
	 * Safe to call multiple times — only the first call initialises.
	 * Returns a cleanup function that destroys the instance,
	 * intended to be used as an `$effect` teardown.
	 */
	init(options?: { lerp?: number }) {
		if (this.#instance) return;

		let destroyed = false;

		import('lenis').then(({ default: LenisClass }) => {
			if (destroyed) return;

			const lenis = new LenisClass({
				lerp: options?.lerp ?? 0.08,
				smoothWheel: true,
				syncTouch: false
			});

			this.#instance = lenis;

			const raf = (time: number) => {
				lenis.raf(time);
				this.#rafId = requestAnimationFrame(raf);
			};
			this.#rafId = requestAnimationFrame(raf);
		});

		return () => {
			destroyed = true;
			cancelAnimationFrame(this.#rafId);
			this.#instance?.destroy();
			this.#instance = null;
		};
	}

	get lenis(): Lenis | null {
		return this.#instance;
	}

	scrollTo(target: string | number | HTMLElement, options?: Parameters<Lenis['scrollTo']>[1]) {
		this.#instance?.scrollTo(target, options);
	}
}

const driver = new LenisDriver();

/**
 * Initialise Lenis smooth scrolling. Call inside `$effect` in the root layout:
 *
 * ```svelte
 * <script lang="ts">
 *   import { initLenis } from '$lib/lenis.svelte';
 *   $effect(() => initLenis());
 * </script>
 * ```
 *
 * The returned cleanup function is automatically registered by `$effect`
 * and runs when the component unmounts, preventing orphan instances.
 * Safe to call multiple times — only the first call initialises Lenis.
 */
export function initLenis(options?: { lerp?: number }) {
	return driver.init(options);
}

/**
 * Smooth-scroll to a target via the Lenis instance.
 * Safe to call before Lenis is initialised (no-op).
 */
export function scrollTo(
	target: string | number | HTMLElement,
	options?: Parameters<Lenis['scrollTo']>[1]
) {
	driver.scrollTo(target, options);
}

/**
 * Get the raw Lenis instance, if initialised.
 */
export function getLenis(): Lenis | null {
	return driver.lenis;
}
