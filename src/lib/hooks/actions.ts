/** One-shot reveal: IO threshold 0.12, bottom rootMargin -6%. Reduced motion shows immediately. */
export function reveal(node: HTMLElement, delay: number = 0) {
	node.classList.add('rv');
	node.style.setProperty('--d', `${delay}ms`);
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		node.classList.add('in');
		return {};
	}
	const io = new IntersectionObserver(
		(entries) => {
			for (const en of entries) {
				if (en.isIntersecting) {
					en.target.classList.add('in');
					io.disconnect();
				}
			}
		},
		{ threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
	);
	io.observe(node);
	return { destroy: () => io.disconnect() };
}

/** Magnetic pull for primary CTAs: fine pointers only, resets on leave. */
export function magnetic(node: HTMLElement) {
	if (
		!window.matchMedia('(pointer: fine)').matches ||
		window.matchMedia('(prefers-reduced-motion: reduce)').matches
	) {
		return {};
	}
	const move = (e: MouseEvent) => {
		const b = node.getBoundingClientRect();
		const x = (e.clientX - b.left - b.width / 2) * 0.18;
		const y = (e.clientY - b.top - b.height / 2) * 0.28;
		node.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px)`;
	};
	const leave = () => (node.style.transform = '');
	node.addEventListener('mousemove', move);
	node.addEventListener('mouseleave', leave);
	return {
		destroy() {
			node.removeEventListener('mousemove', move);
			node.removeEventListener('mouseleave', leave);
		}
	};
}
