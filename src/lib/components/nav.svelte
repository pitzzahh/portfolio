<script lang="ts">
	import { onMount } from 'svelte';
	import { scrollTo } from '$lib/hooks/controller.svelte';

	const links = [
		{ label: 'Work', href: '#work' },
		{ label: 'Stack', href: '#stack' },
		{ label: 'Exp', href: '#exp' },
		{ label: 'About', href: '#about' }
	];

	let progress = $state(0);
	let active = $state('');
	let theme = $state<'light' | 'dark'>('dark');

	function go(e: MouseEvent, href: string) {
		e.preventDefault();
		scrollTo(href, { offset: -70, duration: 1.6 });
	}

	function toggleTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';
		document.documentElement.setAttribute('data-theme', theme);
		try {
			localStorage.setItem('pja-theme', theme);
		} catch {
			// private mode: theme just won't persist
		}
	}

	onMount(() => {
		try {
			const saved = localStorage.getItem('pja-theme');
			if (saved === 'light' || saved === 'dark') theme = saved;
			else if (window.matchMedia('(prefers-color-scheme: light)').matches) theme = 'light';
		} catch {
			// private mode: fall back to default dark
		}
		document.documentElement.setAttribute('data-theme', theme);
		onScroll();
	});

	const ids = ['work', 'stack', 'exp', 'about'];
	function onScroll() {
		const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
		progress = window.scrollY / max;
		let cur = '';
		for (const id of ids) {
			const el = document.getElementById(id);
			if (el && window.scrollY + window.innerHeight * 0.4 >= el.offsetTop) cur = id;
		}
		active = cur;
	}
</script>

<svelte:window onscroll={onScroll} />

<div class="progress" aria-hidden="true">
	<i style:transform={`scaleX(${progress.toFixed(4)})`}></i>
</div>

<header class="topnav">
	<div class="container topnav-inner">
		<a href="#top" class="logo" onclick={(e) => go(e, '#top')} aria-label="Back to top">
			P.J.A<small>PITZZAHH</small>
		</a>
		<nav class="navlinks" aria-label="Sections">
			{#each links as link (link.href)}
				<a
					href={link.href}
					class:active={active === link.href.slice(1)}
					onclick={(e) => go(e, link.href)}>{link.label}</a
				>
			{/each}
		</nav>
		<button
			class="themebtn"
			type="button"
			onclick={toggleTheme}
			aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
		>
			<svg
				class="i-moon"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="1.6"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" /></svg
			>
			<svg
				class="i-sun"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="1.6"
				stroke-linecap="round"
				aria-hidden="true"
				><circle cx="12" cy="12" r="4" /><path
					d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.5 1.5M17.6 17.6l1.5 1.5M19.1 4.9l-1.5 1.5M6.4 17.6l-1.5 1.5"
				/></svg
			>
		</button>
	</div>
</header>

<style>
	.progress {
		position: fixed;
		inset: 0 0 auto 0;
		height: 2px;
		z-index: 60;
	}
	.progress i {
		display: block;
		height: 100%;
		background: var(--fg);
		transform-origin: 0 50%;
	}
	.topnav {
		position: fixed;
		inset: 0 0 auto 0;
		z-index: 50;
		background: var(--nav-veil);
		backdrop-filter: blur(14px) saturate(130%);
		-webkit-backdrop-filter: blur(14px) saturate(130%);
		border-bottom: 1px solid var(--border);
	}
	.topnav-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-block: 13px;
	}
	.logo {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 16px;
		letter-spacing: -0.01em;
	}
	.logo small {
		font-family: var(--font-mono);
		font-weight: 400;
		color: var(--muted);
		font-size: 11px;
		margin-left: 8px;
		letter-spacing: 0.06em;
	}
	.navlinks {
		display: flex;
		gap: 26px;
		align-items: center;
	}
	.navlinks a {
		font-size: 13px;
		font-weight: 500;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--muted);
		position: relative;
		padding: 4px 0;
	}
	.navlinks a:hover {
		color: var(--fg);
	}
	.navlinks a.active {
		color: var(--fg);
	}
	.navlinks a.active::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: -2px;
		height: 2px;
		background: var(--accent);
		border-radius: 2px;
	}
	.themebtn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		background: transparent;
		border: 1px solid var(--border);
		color: var(--fg);
		border-radius: var(--radius-pill);
		transition:
			border-color 0.15s ease,
			background 0.15s ease;
	}
	.themebtn:hover {
		border-color: var(--fg);
		background: var(--fg-soft);
	}
	.themebtn svg {
		width: 16px;
		height: 16px;
	}
	:global(html[data-theme='dark']) .i-sun {
		display: none;
	}
	:global(html[data-theme='light']) .i-moon {
		display: none;
	}
	@media (max-width: 920px) {
		.navlinks {
			display: none;
		}
	}
</style>
