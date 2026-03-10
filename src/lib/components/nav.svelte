<script lang="ts">
	import { scrollTo } from '$lib/lenis.svelte.js';

	let { scrollY = 0 }: { scrollY?: number } = $props();

	const isScrolled = $derived(scrollY > 60);

	const links = [
		{ label: 'Work', href: '#work' },
		{ label: 'About', href: '#about' },
		{ label: 'Contact', href: '#contact' }
	];

	function go(e: MouseEvent, href: string) {
		e.preventDefault();
		scrollTo(href, { offset: -40, duration: 1.6 });
	}
</script>

<header class="nav" class:scrolled={isScrolled}>
	<a href="#top" class="monogram" onclick={(e) => go(e, '#top')} aria-label="Back to top">
		P.J.A.
	</a>

	<nav aria-label="Main navigation">
		<ul>
			{#each links as link (link.href)}
				<li>
					<a href={link.href} onclick={(e) => go(e, link.href)}>{link.label}</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>

<style>
	.nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 2rem 3rem;
		transition: padding 0.5s cubic-bezier(0.16, 1, 0.3, 1);
		mix-blend-mode: normal;
	}

	.nav.scrolled {
		padding: 1.25rem 3rem;
	}

	.monogram {
		font-size: 0.8rem;
		font-weight: 600;
		letter-spacing: 0.12em;
		color: var(--fg);
		text-decoration: none;
		opacity: 0.5;
		transition: opacity 0.2s;
	}

	.monogram:hover {
		opacity: 1;
	}

	ul {
		display: flex;
		align-items: center;
		gap: 2.5rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	li a {
		font-size: 0.8rem;
		font-weight: 500;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--fg);
		text-decoration: none;
		opacity: 0.45;
		transition: opacity 0.2s;
	}

	li a:hover {
		opacity: 1;
	}

	@media (max-width: 600px) {
		.nav {
			padding: 1.5rem 1.5rem;
		}

		.nav.scrolled {
			padding: 1rem 1.5rem;
		}

		ul {
			gap: 1.5rem;
		}
	}
</style>
