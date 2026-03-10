<script lang="ts">
	import { personalInfo } from '$lib/data.js';
	import { scrollTo } from '$lib/lenis.svelte.js';

	let mounted = $state(false);

	function goToWork(e: MouseEvent) {
		e.preventDefault();
		scrollTo('#work', { offset: -40, duration: 1.6 });
	}
</script>

<section
	class="hero"
	id="top"
	{@attach () => {
		mounted = true;
	}}
>
	<div class="hero-inner" class:visible={mounted}>
		<p class="availability">
			<span class="dot" aria-hidden="true"></span>
			Available for work
		</p>

		<h1 class="name">{personalInfo.name}</h1>

		<p class="role">{personalInfo.role} — {personalInfo.location}</p>

		<p class="bio">{personalInfo.bio}</p>

		<a href="#work" class="scroll-cue" onclick={goToWork} aria-label="View selected work">
			Selected work
			<span class="arrow" aria-hidden="true">↓</span>
		</a>
	</div>
</section>

<style>
	.hero {
		min-height: 100svh;
		display: flex;
		align-items: flex-end;
		padding: 0 3rem 5rem;
	}

	.hero-inner {
		max-width: 820px;
		opacity: 0;
		transform: translateY(24px);
		transition:
			opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s,
			transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s;
	}

	.hero-inner.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.availability {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.75rem;
		font-weight: 500;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--fg-muted);
		margin-bottom: 2.5rem;
	}

	.dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #4ade80;
		flex-shrink: 0;
		animation: pulse 2.5s ease-in-out infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.35;
		}
	}

	.name {
		font-size: clamp(3rem, 8vw, 6.5rem);
		font-weight: 500;
		letter-spacing: -0.035em;
		line-height: 1;
		color: var(--fg);
		margin: 0 0 1.5rem;
	}

	.role {
		font-size: clamp(0.9rem, 1.5vw, 1.05rem);
		color: var(--fg-muted);
		letter-spacing: 0.01em;
		margin: 0 0 2rem;
	}

	.bio {
		font-size: clamp(0.95rem, 1.5vw, 1.1rem);
		color: var(--fg-subtle);
		line-height: 1.75;
		max-width: 540px;
		margin: 0 0 3.5rem;
	}

	.scroll-cue {
		display: inline-flex;
		align-items: center;
		gap: 0.625rem;
		font-size: 0.8rem;
		font-weight: 500;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--fg-muted);
		text-decoration: none;
		transition:
			color 0.2s,
			gap 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.scroll-cue:hover {
		color: var(--fg);
	}

	.arrow {
		transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
		display: inline-block;
	}

	.scroll-cue:hover .arrow {
		transform: translateY(4px);
	}

	@media (max-width: 600px) {
		.hero {
			padding: 0 1.5rem 4rem;
		}
	}
</style>
