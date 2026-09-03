<script lang="ts">
	import { personalInfo } from '$lib/data.js';
	import { magnetic, reveal } from '$lib/hooks/actions.js';

	let heroInner: HTMLElement | undefined = $state();

	function onScroll() {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const y = window.scrollY;
		const vh = window.innerHeight;
		if (heroInner && y < vh * 1.2) {
			heroInner.style.transform = `translate3d(0,${(y * 0.22).toFixed(1)}px,0)`;
			heroInner.style.opacity = String(Math.max(0, 1 - y / (vh * 0.92)));
		}
	}
</script>

<svelte:window onscroll={onScroll} />

<section class="section hero" id="top">
	<div class="container hero-inner" bind:this={heroInner}>
		<p class="pill" use:reveal><span class="dot"></span>Available for work · Bicol, PH</p>
		<h1>
			<span class="mask"><span>{personalInfo.name}</span></span>
			<span class="mask"><span class="thin">Full-stack developer.</span></span>
		</h1>
		<div class="hero-sub">
			<div>
				<p use:reveal={80}>
					Since 2020 across Java, modern frontend stacks, and desktop tooling. Security,
					maintainability, clear APIs, shipped value.
				</p>
				<div class="hero-cta" use:reveal={120}>
					<a class="btn btn-primary" use:magnetic href="#contact">Start a project</a>
					<a
						class="btn btn-secondary"
						href="https://github.com/pitzzahh"
						target="_blank"
						rel="noopener">GitHub ↗</a
					>
				</div>
			</div>
			<div class="meta status" use:reveal={200}>
				<div class="num">CURRENT: POWERTRACKR</div>
				<div>SvelteKit · Cloudflare D1 · Drizzle</div>
				<div>BASED: Legazpi, Bicol · UTC+8</div>
			</div>
		</div>
		<div class="scrollline" use:reveal={280}>
			<span class="meta">SCROLL</span><span class="track"><i></i></span>
		</div>
	</div>
</section>

<style>
	.hero {
		min-height: 100svh;
		display: flex;
		align-items: flex-end;
		padding: 9rem 0 4.5rem;
		overflow: clip;
	}
	.hero-inner {
		position: relative;
		width: 100%;
	}
	.mask {
		overflow: hidden;
		display: block;
		padding-bottom: 0.09em;
		margin-bottom: -0.09em;
	}
	.mask > span {
		display: block;
		transform: translateY(115%);
		animation: rise 1s var(--ease-out) forwards;
	}
	.mask:nth-child(2) > span {
		animation-delay: 0.08s;
	}
	@keyframes rise {
		to {
			transform: translateY(0);
		}
	}
	.hero h1 {
		font-size: var(--fs-h1);
		line-height: 1.04;
		letter-spacing: -0.022em;
		margin: 22px 0 18px;
		font-weight: 700;
	}
	.hero h1 .thin {
		color: var(--muted);
		font-weight: 400;
		font-style: italic;
	}
	.hero-sub {
		display: grid;
		grid-template-columns: 1.2fr 1fr;
		gap: var(--gap-xl);
		align-items: end;
		margin-top: 8px;
	}
	.hero-sub p {
		margin: 0;
		color: var(--muted);
		font-size: clamp(15px, 1.6vw, 18px);
		line-height: 1.65;
		max-width: 52ch;
	}
	.status div + div {
		margin-top: 10px;
	}
	.hero-cta {
		display: flex;
		gap: var(--gap-sm);
		margin-top: 30px;
		flex-wrap: wrap;
	}
	.scrollline {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-top: 56px;
		color: var(--muted);
	}
	.scrollline .track {
		width: 72px;
		height: 1px;
		background: var(--border);
		position: relative;
		overflow: hidden;
	}
	.scrollline .track i {
		position: absolute;
		inset: 0;
		background: var(--fg);
		transform-origin: 0 50%;
		animation: cue 1.8s var(--ease-cue) infinite;
	}
	@keyframes cue {
		0% {
			transform: scaleX(0);
			transform-origin: 0 50%;
		}
		55% {
			transform: scaleX(1);
			transform-origin: 0 50%;
		}
		56% {
			transform-origin: 100% 50%;
		}
		100% {
			transform: scaleX(0);
			transform-origin: 100% 50%;
		}
	}
	@media (max-width: 920px) {
		.hero-sub {
			grid-template-columns: 1fr;
		}
		.hero {
			padding-top: 7rem;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.mask > span {
			transform: none;
			animation: none;
		}
	}
</style>
