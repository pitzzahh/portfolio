export interface ProgressConfig {
	/** Fraction of vh from bottom where elements start appearing. Default 0.18. */
	enter: number;
	/** Fraction of vh from top where elements start disappearing. Default 0.1. */
	exit: number;
}

export interface ParallaxConfig {
	/** Multiplier applied to scroll distance. 0.3 = moves 30% of scroll. */
	speed: number;
}

export interface StaggerConfig {
	/** Viewport fraction that controls the stagger spread. Default 0.7. */
	spread: number;
	/** Number of children to stagger. Default all. */
	count?: number;
	enter?: number;
	exit?: number;
}

export interface ScrollState {
	y: number;
	vh: number;
	direction: number;
	velocity: number;
}
