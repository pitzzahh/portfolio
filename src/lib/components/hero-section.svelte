<script lang="ts">
	import { personalInfo } from '$lib/data.js';
	import { scrollTo } from '$lib/lenis.svelte.js';

	function gotoContact(e: MouseEvent) {
		e.preventDefault();
		scrollTo('#contact', { offset: -40, duration: 1.6 });
	}
</script>

<section class="hero" id="top">
	<div
		class="hero-inner"
		{@attach (e) => {
			e.style.opacity = '1';
			e.style.transform = 'translateY(0)';
		}}
	>
		<p class="availability">
			<span class="dot" aria-hidden="true"></span>
			Available for work
		</p>

		<h1 class="name">{personalInfo.name}</h1>

		<p class="role">{personalInfo.role} — {personalInfo.location}</p>

		<p class="bio">{personalInfo.bio}</p>

		<a href="#contact" class="scroll-cue" onclick={gotoContact} aria-label="Contact me">
			Contact
			<span class="arrow" aria-hidden="true">↓</span>
		</a>
	</div>
</section>

<style>
	.hero {
		min-height: 100svh;
		display: flex;
		align-items: flex-end;
		/* match project-section horizontal padding (desktop) */
		padding: 8rem 3rem;
	}

	.hero-inner {
		/* match other sections' inner container so content is horizontally centered and aligned */
		max-width: 960px;
		margin: 0 auto;
		padding-left: 0; /* ensure inner content aligns with other section inners (left edge) */
		opacity: 0;
		transform: translateY(24px);
		transition:
			opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s,
			transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s;
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
		/* removed max-width so bio aligns to the section inner edge like other sections */
		margin: 0 0 3.5rem;
		word-break: break-word;
		width: 100%;
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

	@media (max-width: 768px) {
		.hero {
			/* match project-section breakpoint and horizontal padding */
			padding: 6rem 1.5rem;
			/* start content near the top so longer bios don't push everything down */
			align-items: flex-end;
			/* constrain the hero to the viewport height and allow internal scrolling when needed */
			max-height: 100svh;
			overflow: auto;
		}
		.hero-inner {
			max-width: 100%;
			margin: 0 auto;
			text-align: left;
			padding-top: 1.25rem;
		}
		.bio {
			max-width: 100%;
			margin: 0 0 1.25rem;
			/* slightly smaller, tighter type for mobile to reduce vertical space */
			font-size: 0.92rem;
			line-height: 1.4;
			/* allow the full bio to appear (no truncation) */
			display: block;
			overflow: visible;
			-webkit-box-orient: initial;
		}
	}
</style>
