import type { Action } from 'svelte/action';

interface RevealOptions {
	threshold?: number;
	delay?: number;
	duration?: number;
	once?: boolean;
	direction?: 'up' | 'down' | 'left' | 'right' | 'none';
	distance?: number;
}

export const reveal: Action<HTMLElement, RevealOptions | undefined> = (node, options = {}) => {
	const {
		threshold = 0.15,
		delay = 0,
		duration = 700,
		once = true,
		direction = 'up',
		distance = 40
	} = options;

	const translateMap: Record<NonNullable<RevealOptions['direction']>, string> = {
		up: `translateY(${distance}px)`,
		down: `translateY(-${distance}px)`,
		left: `translateX(${distance}px)`,
		right: `translateX(-${distance}px)`,
		none: 'none'
	};

	const initialTransform = translateMap[direction];

	Object.assign(node.style, {
		opacity: '0',
		transform: initialTransform !== 'none' ? initialTransform : '',
		transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
		willChange: 'opacity, transform'
	});

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					Object.assign(node.style, {
						opacity: '1',
						transform: ''
					});

					if (once) {
						observer.unobserve(node);
					}
				} else if (!once) {
					Object.assign(node.style, {
						opacity: '0',
						transform: initialTransform !== 'none' ? initialTransform : ''
					});
				}
			}
		},
		{ threshold }
	);

	observer.observe(node);

	return {
		update(newOptions: RevealOptions = {}) {
			const newDelay = newOptions.delay ?? delay;
			const newDuration = newOptions.duration ?? duration;
			node.style.transition = `opacity ${newDuration}ms cubic-bezier(0.16, 1, 0.3, 1) ${newDelay}ms, transform ${newDuration}ms cubic-bezier(0.16, 1, 0.3, 1) ${newDelay}ms`;
		},
		destroy() {
			observer.disconnect();
		}
	};
};
