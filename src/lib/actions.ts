import type { Action } from 'svelte/action';
import { getLenis } from './lenis.svelte.js';

// ── Reveal ────────────────────────────────────────────────────────────────────

interface RevealOptions {
	threshold?: number;
	delay?: number;
	duration?: number;
	/** When true the element animates in once and stays. When false (default)
	 *  it resets as soon as it leaves the viewport — Lenis-site style. */
	once?: boolean;
	direction?: 'up' | 'down' | 'left' | 'right' | 'none';
	distance?: number;
}

export const reveal: Action<HTMLElement, RevealOptions | undefined> = (node, options = {}) => {
	const {
		threshold = 0.12,
		delay = 0,
		duration = 800,
		once = false,
		direction = 'up',
		distance = 48
	} = options;

	const translateMap: Record<NonNullable<RevealOptions['direction']>, string> = {
		up: `translateY(${distance}px)`,
		down: `translateY(-${distance}px)`,
		left: `translateX(${distance}px)`,
		right: `translateX(-${distance}px)`,
		none: 'none'
	};

	const initialTransform = translateMap[direction];
	const easing = 'cubic-bezier(0.16, 1, 0.3, 1)';

	function hide() {
		Object.assign(node.style, {
			opacity: '0',
			...(initialTransform !== 'none' && {
				transform: initialTransform
			}),
			transition: `opacity ${duration}ms ${easing} ${delay}ms, transform ${duration}ms ${easing} ${delay}ms`,
			willChange: 'opacity, transform'
		});
	}

	function show() {
		Object.assign(node.style, {
			opacity: '1',
			transform: '',
			// Keep transition so the in-animation is also smooth
			transition: `opacity ${duration}ms ${easing} ${delay}ms, transform ${duration}ms ${easing} ${delay}ms`
		});
	}

	// Start hidden
	hide();

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					show();
					if (once) observer.unobserve(node);
				} else if (!once) {
					// Only reset when scrolling *up* past the element (it leaves from the bottom).
					// entry.boundingClientRect.top > 0 means the element is below the viewport.
					if (entry.boundingClientRect.top > 0) {
						hide();
					}
				}
			}
		},
		{ threshold, rootMargin: '0px 0px -5% 0px' }
	);

	observer.observe(node);

	return {
		update(newOptions: RevealOptions = {}) {
			const d = newOptions.delay ?? delay;
			const dur = newOptions.duration ?? duration;
			node.style.transition = `opacity ${dur}ms ${easing} ${d}ms, transform ${dur}ms ${easing} ${d}ms`;
		},
		destroy() {
			observer.disconnect();
		}
	};
};

// ── Stagger ───────────────────────────────────────────────────────────────────
// Apply to a container — each direct child gets a reveal with increasing delay.

interface StaggerOptions extends Omit<RevealOptions, 'delay'> {
	/** Delay added between consecutive children (ms). Default 60. */
	step?: number;
	/** Delay before the first child (ms). Default 0. */
	initialDelay?: number;
}

export const stagger: Action<HTMLElement, StaggerOptions | undefined> = (node, options = {}) => {
	const { step = 60, initialDelay = 0, ...revealOpts } = options;

	// We keep a map of child → destroy callback so we can tear down cleanly.
	const children = new Map<HTMLElement, () => void>();

	function mountChildren() {
		const els = Array.from(node.children) as HTMLElement[];
		els.forEach((child, i) => {
			if (children.has(child)) return; // already mounted
			const instance = reveal(child, { ...revealOpts, delay: initialDelay + i * step });
			children.set(child, () => instance?.destroy?.());
		});
	}

	mountChildren();

	// Watch for dynamically added children
	const mo = new MutationObserver(mountChildren);
	mo.observe(node, { childList: true });

	return {
		destroy() {
			mo.disconnect();
			children.forEach((destroy) => destroy());
			children.clear();
		}
	};
};

// ── Scroll Progress ───────────────────────────────────────────────────────────
// Tracks how far an element has been scrolled through the viewport and exposes
// a [0, 1] CSS custom property --progress that you can use for parallax /
// clip-path / scale effects — exactly like the Lenis website.

interface ScrollProgressOptions {
	/** CSS custom property name to set on the node. Default: '--progress'. */
	property?: string;
	/** Clamp output to [0, 1]. Default true. */
	clamp?: boolean;
}

export const scrollProgress: Action<HTMLElement, ScrollProgressOptions | undefined> = (
	node,
	options = {}
) => {
	const { property = '--progress', clamp = true } = options;

	function compute() {
		const rect = node.getBoundingClientRect();
		const vh = window.innerHeight;

		// progress 0 → element bottom hits viewport bottom
		// progress 1 → element top hits viewport top
		const raw = 1 - rect.bottom / (vh + rect.height);
		const value = clamp ? Math.min(1, Math.max(0, raw)) : raw;

		node.style.setProperty(property, String(value.toFixed(4)));
	}

	// Try to subscribe to Lenis for perfectly synced updates
	let unsubLenis: (() => void) | null = null;

	function trySubscribeLenis() {
		const lenis = getLenis();
		if (!lenis) return;

		const handler = () => compute();
		lenis.on('scroll', handler);
		unsubLenis = () => lenis.off('scroll', handler);
	}

	// Lenis might not be ready yet — retry briefly
	let attempts = 0;
	const retry = setInterval(() => {
		attempts++;
		trySubscribeLenis();
		if (unsubLenis || attempts > 20) clearInterval(retry);
	}, 100);

	// Fallback to passive scroll listener when Lenis is not used
	function onScroll() {
		if (!unsubLenis) compute();
	}

	window.addEventListener('scroll', onScroll, { passive: true });
	compute(); // initial paint

	return {
		destroy() {
			clearInterval(retry);
			unsubLenis?.();
			window.removeEventListener('scroll', onScroll);
		}
	};
};

// ── Parallax ──────────────────────────────────────────────────────────────────
// Lightweight parallax using the same Lenis scroll hook.

interface ParallaxOptions {
	/** How many pixels to shift over the full scroll travel through the viewport.
	 *  Positive = slower than scroll (moves up less), negative = faster. Default 80. */
	speed?: number;
	/** Axis. Default 'y'. */
	axis?: 'x' | 'y';
}

export const parallax: Action<HTMLElement, ParallaxOptions | undefined> = (node, options = {}) => {
	const { speed = 80, axis = 'y' } = options;

	function compute() {
		const rect = node.getBoundingClientRect();
		const vh = window.innerHeight;

		// Centre of element relative to centre of viewport, normalised
		const centreOffset = (rect.top + rect.height / 2 - vh / 2) / vh;
		const shift = centreOffset * speed;

		node.style.transform =
			axis === 'y' ? `translateY(${shift.toFixed(2)}px)` : `translateX(${shift.toFixed(2)}px)`;
		node.style.willChange = 'transform';
	}

	let unsubLenis: (() => void) | null = null;

	function trySubscribeLenis() {
		const lenis = getLenis();
		if (!lenis) return;
		const handler = () => compute();
		lenis.on('scroll', handler);
		unsubLenis = () => lenis.off('scroll', handler);
	}

	let attempts = 0;
	const retry = setInterval(() => {
		attempts++;
		trySubscribeLenis();
		if (unsubLenis || attempts > 20) clearInterval(retry);
	}, 100);

	function onScroll() {
		if (!unsubLenis) compute();
	}

	window.addEventListener('scroll', onScroll, { passive: true });
	compute();

	return {
		destroy() {
			clearInterval(retry);
			unsubLenis?.();
			window.removeEventListener('scroll', onScroll);
		}
	};
};
