<script lang="ts">
	import { scrollTo } from '$lib/lenis.svelte.js';

	let { scrollY = 0 }: { scrollY?: number } = $props();
	const isScrolled = $derived(scrollY > 60);

	let menuOpen = $state(false);

	const links = [
		{ label: 'Exp', href: '#exp' },
		{ label: 'Projects', href: '#marquee' },
		{ label: 'About', href: '#about' },
		{ label: 'Contact', href: '#contact' }
	];

	function go(e: MouseEvent, href: string) {
		e.preventDefault();
		menuOpen = false;
		scrollTo(href, { offset: -40, duration: 1.6 });
	}
</script>

<header class="nav" class:scrolled={isScrolled}>
	<a href="#top" class="monogram" onclick={(e) => go(e, '#top')} aria-label="Back to top">
		P.J.A.
	</a>

	<!-- Desktop nav -->
	<nav class="desktop-nav" aria-label="Main navigation">
		<ul>
			{#each links as link (link.href)}
				<li>
					<a href={link.href} onclick={(e) => go(e, link.href)}>{link.label}</a>
				</li>
			{/each}
		</ul>
	</nav>

	<!-- Mobile hamburger -->
	<button
		class="hamburger"
		class:open={menuOpen}
		onclick={() => (menuOpen = !menuOpen)}
		aria-label={menuOpen ? 'Close menu' : 'Open menu'}
		aria-expanded={menuOpen}
	>
		<span></span>
		<span></span>
	</button>
</header>

<div class="sheet" class:open={menuOpen} role="dialog" aria-modal="true" aria-label="Navigation">
	<nav aria-label="Mobile navigation">
		<ul>
			{#each links as link, i (link.href)}
				<li style="--i: {i}">
					<a href={link.href} onclick={(e) => go(e, link.href)}>
						<span class="link-num">0{i + 1}</span>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<footer class="sheet-footer">
		<span>P.J.A. — Portfolio {new Date().getFullYear()}</span>
	</footer>
</div>

<style>
	/* ── Base nav ───────────────────────────────────── */
	.nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 2rem 3rem;
		transition: padding 0.5s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.nav.scrolled {
		padding: 1.25rem 3rem;
	}

	.monogram {
		font-size: 0.8rem;
		font-weight: 600;
		letter-spacing: 0.12em;
		color: var(--fg-muted);
		text-decoration: none;
		transition: color 0.2s;
		position: relative;
		z-index: 201;
	}
	.monogram:hover {
		color: var(--fg);
	}

	/* ── Desktop nav ────────────────────────────────── */
	.desktop-nav ul {
		display: flex;
		align-items: center;
		gap: 2.5rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.desktop-nav li a {
		font-size: 0.8rem;
		font-weight: 500;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--fg-muted);
		text-decoration: none;
		transition: color 0.2s;
	}
	.desktop-nav li a:hover {
		color: var(--fg);
	}

	/* ── Hamburger ──────────────────────────────────── */
	.hamburger {
		display: none;
		flex-direction: column;
		justify-content: center;
		gap: 6px;
		width: 2rem;
		height: 2rem;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		position: relative;
		z-index: 201;
	}
	.hamburger span {
		display: block;
		height: 1.5px;
		background: var(--fg-muted);
		border-radius: 2px;
		transform-origin: center;
		transition:
			transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
			opacity 0.3s ease,
			width 0.3s ease;
		width: 100%;
	}
	/* Morph into X */
	.hamburger.open span:nth-child(1) {
		transform: translateY(3.75px) rotate(45deg);
	}
	.hamburger.open span:nth-child(2) {
		transform: translateY(-3.75px) rotate(-45deg);
	}

	/* ── Sheet ──────────────────────────────────────── */
	.sheet {
		display: none;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 160;
		background: var(--bg, #0a0a0a);
		border-top: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 20px 20px 0 0;
		padding: 2.5rem 2rem 3rem;
		transform: translateY(100%);
		transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);

		/* Subtle noise/grain texture via box-shadow layering */
		box-shadow:
			0 -1px 0 rgba(255, 255, 255, 0.04),
			0 -40px 80px rgba(0, 0, 0, 0.6);
	}
	.sheet.open {
		transform: translateY(0);
	}

	.sheet nav ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.sheet nav li {
		border-bottom: 1px solid rgba(255, 255, 255, 0.05);
		overflow: hidden;
		/* Staggered slide-up for each item */
		transform: translateY(20px);
		opacity: 0;
		transition:
			transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
			opacity 0.4s ease;
		transition-delay: calc(var(--i) * 60ms + 100ms);
	}
	.sheet.open li {
		transform: translateY(0);
		opacity: 1;
	}

	.sheet nav li a {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1.1rem 0;
		font-size: 1.75rem;
		font-weight: 600;
		letter-spacing: -0.02em;
		color: var(--fg, #f0f0f0);
		text-decoration: none;
		transition:
			color 0.2s,
			gap 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.sheet nav li a:active {
		color: var(--fg-muted, #888);
	}
	/* Nudge gap on tap for tactile feel */
	.sheet nav li a:hover {
		gap: 1.4rem;
	}

	.link-num {
		font-size: 0.65rem;
		font-weight: 500;
		letter-spacing: 0.1em;
		color: var(--fg-muted, #666);
		font-variant-numeric: tabular-nums;
		margin-top: 4px; /* optical alignment with large text */
	}

	.sheet-footer {
		margin-top: 2rem;
		font-size: 0.7rem;
		letter-spacing: 0.08em;
		color: var(--fg-muted, #555);
		opacity: 0;
		transform: translateY(8px);
		transition:
			opacity 0.4s ease 0.4s,
			transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.4s;
	}
	.sheet.open .sheet-footer {
		opacity: 1;
		transform: translateY(0);
	}

	/* ── Mobile breakpoint ──────────────────────────── */
	@media (max-width: 600px) {
		.nav {
			padding: 1.5rem 1.5rem;
		}
		.nav.scrolled {
			padding: 1rem 1.5rem;
		}
		.desktop-nav {
			display: none;
		}
		.hamburger {
			display: flex;
		}

		.sheet {
			display: flex;
			flex-direction: column;
		}
	}
</style>
