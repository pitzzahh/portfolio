import type Lenis from 'lenis';

class ScrollController {
	#lenis: Lenis | null = null;
	#raf = 0;
	#anchorHandler = (e: MouseEvent) => {
		const anchor = (e.target as HTMLElement).closest('a[href^="#"]');
		if (!anchor || !this.#lenis) return;
		const href = anchor.getAttribute('href');
		if (!href || href === '#') return;
		const el = document.querySelector(href);
		if (el) {
			e.preventDefault();
			this.#lenis.scrollTo(el as HTMLElement, { offset: -70, duration: 1.6 });
		}
	};

	/** Init Lenis (lerp 0.09 / 1.05 / 1.4). No-op on reduced motion or repeat calls. */
	init() {
		if (this.#lenis) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		let destroyed = false;
		import('lenis').then(({ default: LenisClass }) => {
			if (destroyed || this.#lenis) return;
			const lenis = new LenisClass({
				lerp: 0.09,
				smoothWheel: true,
				wheelMultiplier: 1.05,
				touchMultiplier: 1.4
			});
			this.#lenis = lenis;
			document.addEventListener('click', this.#anchorHandler);
			const raf = (time: number) => {
				lenis.raf(time);
				this.#raf = requestAnimationFrame(raf);
			};
			this.#raf = requestAnimationFrame(raf);
		});

		return () => {
			destroyed = true;
			document.removeEventListener('click', this.#anchorHandler);
			cancelAnimationFrame(this.#raf);
			this.#lenis?.destroy();
			this.#lenis = null;
		};
	}

	scrollTo(target: string | number | HTMLElement, options?: Parameters<Lenis['scrollTo']>[1]) {
		if (this.#lenis) {
			this.#lenis.scrollTo(target, { offset: -70, duration: 1.6, ...options });
			return;
		}
		if (typeof target === 'string') {
			const el = document.querySelector(target);
			if (el) {
				window.scrollTo({
					top: el.getBoundingClientRect().top + window.scrollY - 70,
					behavior: 'smooth'
				});
			}
		} else if (typeof target === 'number') {
			window.scrollTo({ top: target, behavior: 'smooth' });
		} else {
			window.scrollTo({
				top: target.getBoundingClientRect().top + window.scrollY - 70,
				behavior: 'smooth'
			});
		}
	}

	get lenis(): Lenis | null {
		return this.#lenis;
	}
}

/** Singleton scroll controller. */
export const sc = new ScrollController();

export function initLenis() {
	return sc.init();
}

export function scrollTo(
	target: string | number | HTMLElement,
	options?: Parameters<Lenis['scrollTo']>[1]
) {
	sc.scrollTo(target, options);
}

export function getLenis(): Lenis | null {
	return sc.lenis;
}
