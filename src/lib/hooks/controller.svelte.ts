import type Lenis from 'lenis';
import type { ProgressConfig, ParallaxConfig, StaggerConfig, ScrollState } from './types';

// ── Utilities ───────────────────────────────────────────────────────────────────

function clamp01(v: number): number {
	return v < 0 ? 0 : v > 1 ? 1 : v;
}

/**
 * Two-sided progress: elements enter from bottom (progress 0→1) and exit at top (1→0).
 * - 0 when element is above OR below the viewport
 * - 1 when element is fully inside the "sweet spot"
 * - `enter`: fraction of vh from bottom where fade-in starts (default 0.18)
 * - `exit`: fraction of vh from top where fade-out starts (default 0.1)
 */
export function computeProgress(rect: DOMRect, state: ScrollState, cfg: ProgressConfig): number {
	const { vh } = state;
	const below = Math.max(0, rect.bottom - vh);
	const fromBottom = clamp01(1 - below / (cfg.enter * vh));
	const fromTop = rect.top <= 0 ? 0 : clamp01(rect.top / (cfg.exit * vh));
	return Math.min(fromBottom, fromTop);
}

// ── Binding types ───────────────────────────────────────────────────────────────

type Binding =
	| { el: HTMLElement; kind: 'progress'; config: ProgressConfig }
	| { el: HTMLElement; kind: 'parallax'; config: ParallaxConfig }
	| { el: HTMLElement; kind: 'stagger'; config: StaggerConfig }
	| { el: HTMLElement; kind: 'reveal'; config: { delay: number }; revealed: boolean };

// ── Controller ──────────────────────────────────────────────────────────────────

class ScrollController {
	#lenis: Lenis | null = null;
	#bindings: Map<symbol, Binding> = new Map();
	#raf = 0;
	#state: ScrollState = { y: 0, vh: 0, direction: 0, velocity: 0 };
	#prevY = 0;

	/**
	 * Initialise Lenis and start the RAF loop.
	 * Safe to call multiple times — only the first call does anything.
	 * Returns a cleanup function (intended as `$effect` teardown).
	 */
	init(options?: { lerp?: number }) {
		if (this.#lenis) return;

		let destroyed = false;

		import('lenis').then(({ default: LenisClass }) => {
			if (destroyed) return;

			const lenis = new LenisClass({
				lerp: options?.lerp ?? 0.08,
				smoothWheel: true,
				syncTouch: false
			});

			this.#lenis = lenis;

			this.#handleAnchors();

			const raf = (time: number) => {
				lenis.raf(time);
				this.#tick();
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
			this.#bindings.clear();
		};
	}

	scrollTo(target: string | number | HTMLElement, options?: Parameters<Lenis['scrollTo']>[1]) {
		this.#lenis?.scrollTo(target, options);
	}

	get lenis(): Lenis | null {
		return this.#lenis;
	}

	// ── Anchor delegation ───────────────────────────────────────────────────

	#anchorHandler = (e: MouseEvent) => {
		const anchor = (e.target as HTMLElement).closest('a[href^="#"]');
		if (!anchor || !this.#lenis) return;
		const href = anchor.getAttribute('href');
		if (!href || href === '#') return;
		const el = document.querySelector(href) as HTMLElement | null;
		if (el) {
			e.preventDefault();
			this.#lenis.scrollTo(el, { offset: -80 });
		}
	};

	#handleAnchors() {
		document.addEventListener('click', this.#anchorHandler);
	}

	// ── Binding API ─────────────────────────────────────────────────────────

	bind(el: HTMLElement, kind: Binding['kind'], config: Record<string, unknown> = {}): symbol {
		const id = Symbol();

		const defaults: Record<string, unknown> =
			kind === 'progress'
				? { enter: 0.18, exit: 0.1 }
				: kind === 'parallax'
					? { speed: 0.3 }
					: kind === 'stagger'
						? { spread: 0.7, count: undefined, enter: 0.18, exit: 0.1 }
						: kind === 'reveal'
							? { delay: 0 }
							: {};

		const binding: Binding = {
			el,
			kind,
			config: { ...defaults, ...config },
			...(kind === 'reveal' ? { revealed: false } : {})
		} as Binding;

		this.#bindings.set(id, binding);
		return id;
	}

	unbind(id: symbol) {
		this.#bindings.delete(id);
	}

	// ── RAF tick ────────────────────────────────────────────────────────────

	#tick() {
		const y = this.#lenis?.scroll ?? window.scrollY;
		const vh = window.innerHeight;

		this.#state = {
			y,
			vh,
			direction: y > this.#prevY ? 1 : y < this.#prevY ? -1 : 0,
			velocity: Math.abs(y - this.#prevY)
		};
		this.#prevY = y;

		for (const [, b] of this.#bindings) {
			if (!b.el.isConnected) continue;
			const rect = b.el.getBoundingClientRect();
			if (rect.bottom < -200 || rect.top > vh + 200) continue;

			switch (b.kind) {
				case 'progress':
					this.#applyProgress(b.el, rect, b.config);
					break;
				case 'parallax':
					this.#applyParallax(b.el, b.config);
					break;
				case 'stagger':
					this.#applyStagger(b);
					break;
				case 'reveal':
					this.#applyReveal(b, rect);
					break;
			}
		}
	}

	#applyProgress(el: HTMLElement, rect: DOMRect, cfg: ProgressConfig) {
		const p = computeProgress(rect, this.#state, cfg);
		el.style.setProperty('--sp', p.toFixed(3));
	}

	#applyParallax(el: HTMLElement, cfg: ParallaxConfig) {
		const scroll = this.#state.y;
		const startScroll = Number(el.dataset.ps);
		if (!startScroll) return;
		// Offset relative to mount position: 0 at mount, negative as scroll down.
		// speed < 1 means the element moves slower than normal scroll.
		const offset = (startScroll - scroll) * cfg.speed;
		el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
		el.style.willChange = 'transform';
	}

	#applyStagger(b: Binding & { kind: 'stagger' }) {
		const children = Array.from(b.el.children) as HTMLElement[];
		const total = b.config.count ?? children.length;
		const staggerPx = b.config.spread * this.#state.vh;

		for (let i = 0; i < Math.min(children.length, total); i++) {
			const childRect = children[i].getBoundingClientRect();
			const offset = (i * staggerPx) / total;
			const childCfg: ProgressConfig = {
				enter: b.config.enter ?? 0.18,
				exit: b.config.exit ?? 0.1
			};
			const shiftedEnter = childCfg.enter + offset / this.#state.vh;
			const p = computeProgress(childRect, this.#state, {
				enter: shiftedEnter,
				exit: childCfg.exit
			});
			children[i].style.setProperty('--sp', p.toFixed(3));
		}
	}

	#applyReveal(b: Binding & { kind: 'reveal' }, rect: DOMRect) {
		if (b.revealed) return;
		if (rect.top < this.#state.vh * 0.85) {
			b.revealed = true;
			setTimeout(() => b.el.classList.add('is-revealed'), b.config.delay);
		}
	}
}

/** Singleton scroll controller. */
export const sc = new ScrollController();

// ── Convenience wrappers ────────────────────────────────────────────────────────

export function initLenis(options?: { lerp?: number }) {
	return sc.init(options);
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
